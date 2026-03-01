/**
 * POST /api/auth/telegram
 * 
 * Validates TG Mini App initData (HMAC-SHA-256) and returns/creates playerID.
 * 
 * Body: { initData: string }
 * Returns: { playerID, tgID, firstName, username }
 * 
 * IMPORTANT: Set TG_BOT_TOKEN in your Vercel environment variables.
 */

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const BOT_TOKEN = process.env.TG_BOT_TOKEN || '8685415138:AAGmZQJD0oz2seOYcaJaJjk26KcE5lF6TBg';

/**
 * Validate Telegram Mini App initData.
 * 
 * The initData is a URL-encoded string. We:
 * 1. Parse it into key-value pairs
 * 2. Remove the `hash` field
 * 3. Sort remaining fields alphabetically
 * 4. Join with \n
 * 5. HMAC-SHA-256 with secret key = HMAC-SHA-256("WebAppData", bot_token)
 * 6. Compare hex digest to the hash field
 */
function validateInitData(initData: string): { valid: boolean; user?: any } {
  try {
    const params = new URLSearchParams(initData);
    const hash = params.get('hash');
    if (!hash) return { valid: false };

    // Build check string: sorted key=value pairs joined by \n, excluding hash
    const entries: [string, string][] = [];
    params.forEach((value, key) => {
      if (key !== 'hash') entries.push([key, value]);
    });
    entries.sort(([a], [b]) => a.localeCompare(b));
    const checkString = entries.map(([k, v]) => `${k}=${v}`).join('\n');

    // Secret key: HMAC-SHA-256 of "WebAppData" with bot token
    const secretKey = crypto
      .createHmac('sha256', 'WebAppData')
      .update(BOT_TOKEN)
      .digest();

    // Compute HMAC of the check string
    const computedHash = crypto
      .createHmac('sha256', secretKey)
      .update(checkString)
      .digest('hex');

    if (computedHash !== hash) return { valid: false };

    // Check auth_date is not too old (allow 24h for now)
    const authDate = parseInt(params.get('auth_date') || '0');
    const now = Math.floor(Date.now() / 1000);
    if (now - authDate > 86400) return { valid: false };

    // Parse user
    const userStr = params.get('user');
    const user = userStr ? JSON.parse(userStr) : null;

    return { valid: true, user };
  } catch {
    return { valid: false };
  }
}

/**
 * Generate a deterministic playerID from TG user ID.
 * In production, replace with DB lookup/create.
 */
function getOrCreatePlayerID(tgID: number): string {
  // Deterministic UUID-like ID from tgID + salt
  // In production: look up in Vercel KV / Supabase / etc.
  const hash = crypto
    .createHash('sha256')
    .update(`strands_player_${tgID}_${process.env.PLAYER_SALT || 'dev'}`)
    .digest('hex');
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-${hash.slice(12, 16)}-${hash.slice(16, 20)}-${hash.slice(20, 32)}`;
}

export async function POST(req: NextRequest) {
  try {
    const { initData } = await req.json();

    if (!initData) {
      return NextResponse.json({ error: 'Missing initData' }, { status: 400 });
    }

    if (!BOT_TOKEN) {
      console.error('TG_BOT_TOKEN not set in environment');
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
    }

    const result = validateInitData(initData);

    if (!result.valid || !result.user) {
      return NextResponse.json({ error: 'Invalid auth' }, { status: 401 });
    }

    const tgID = result.user.id;
    const playerID = getOrCreatePlayerID(tgID);

    // TODO: Store/update player record in Vercel KV
    // await kv.set(`player:${playerID}`, { tgID, ... });
    // await kv.set(`tg:${tgID}`, playerID);

    return NextResponse.json({
      playerID,
      tgID,
      firstName: result.user.first_name,
      username: result.user.username,
    });
  } catch (err) {
    console.error('Auth error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
