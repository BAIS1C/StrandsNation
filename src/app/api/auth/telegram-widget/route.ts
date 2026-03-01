/**
 * POST /api/auth/telegram-widget
 * 
 * Validates TG Login Widget callback data.
 * 
 * The Login Widget sends: { id, first_name, last_name, username, photo_url, auth_date, hash }
 * Verification: HMAC-SHA-256 of sorted "key=value\n" string with SHA-256(bot_token) as key.
 * 
 * NOTE: This is DIFFERENT from Mini App initData validation.
 * Mini App uses HMAC("WebAppData", bot_token) as the secret.
 * Login Widget uses SHA-256(bot_token) as the secret.
 */

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const BOT_TOKEN = process.env.TG_BOT_TOKEN || '8685415138:AAGmZQJD0oz2seOYcaJaJjk26KcE5lF6TBg';

function validateWidgetData(data: Record<string, any>): boolean {
  try {
    const hash = data.hash;
    if (!hash) return false;

    // Build check string: sorted key=value pairs, excluding hash
    const entries = Object.entries(data)
      .filter(([key]) => key !== 'hash')
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, val]) => `${key}=${val}`)
      .join('\n');

    // Secret: SHA-256 of bot token (NOT HMAC — different from Mini App!)
    const secretKey = crypto.createHash('sha256').update(BOT_TOKEN).digest();

    // HMAC of check string
    const computedHash = crypto
      .createHmac('sha256', secretKey)
      .update(entries)
      .digest('hex');

    if (computedHash !== hash) return false;

    // Check freshness (24h)
    const authDate = parseInt(data.auth_date || '0');
    const now = Math.floor(Date.now() / 1000);
    return (now - authDate) < 86400;
  } catch {
    return false;
  }
}

function getOrCreatePlayerID(tgID: number): string {
  const hash = crypto
    .createHash('sha256')
    .update(`strands_player_${tgID}_${process.env.PLAYER_SALT || 'dev'}`)
    .digest('hex');
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-${hash.slice(12, 16)}-${hash.slice(16, 20)}-${hash.slice(20, 32)}`;
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data?.id || !data?.hash) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    if (!BOT_TOKEN) {
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
    }

    if (!validateWidgetData(data)) {
      return NextResponse.json({ error: 'Invalid auth' }, { status: 401 });
    }

    const playerID = getOrCreatePlayerID(data.id);

    return NextResponse.json({
      playerID,
      tgID: data.id,
      firstName: data.first_name,
      username: data.username,
    });
  } catch (err) {
    console.error('Widget auth error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
