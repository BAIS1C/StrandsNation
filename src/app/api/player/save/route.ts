/**
 * POST /api/player/save
 * 
 * Stores player profile data in Vercel KV.
 * Called silently after quiz completion — player never sees this.
 * 
 * Body: {
 *   playerID: string,
 *   tgID: number,
 *   username: string,
 *   firstName: string,
 *   lastName?: string,
 *   phone: string,
 *   dob: string,        // YYYY-MM-DD
 *   mbti: { EI, SN, TF, JP },
 *   nkq: { speed, pattern, memory },
 *   choices: string[],   // choice IDs in order
 * }
 * 
 * SETUP: npm i @vercel/kv
 * Then add KV_REST_API_URL and KV_REST_API_TOKEN to Vercel env vars.
 * Create a KV store in Vercel Dashboard → Storage → KV → Create.
 */

import { NextRequest, NextResponse } from 'next/server';

// Dynamic import so it doesn't crash if @vercel/kv isn't installed yet
async function getKV() {
  try {
    const { kv } = await import('@vercel/kv');
    return kv;
  } catch {
    return null;
  }
}

interface PlayerProfile {
  playerID: string;
  tgID: number;
  username: string;
  firstName: string;
  lastName?: string;
  phone: string;
  dob: string;
  mbti: {
    EI: number;
    SN: number;
    TF: number;
    JP: number;
  };
  type: string; // e.g. "ENTP"
  nkq: {
    speed: number;
    pattern: number;
    memory: number;
  };
  choices: string[];
  completedAt: string;
  createdAt: string;
}

function deriveType(mbti: { EI: number; SN: number; TF: number; JP: number }): string {
  return (
    (mbti.EI > 0 ? 'E' : 'I') +
    (mbti.SN > 0 ? 'S' : 'N') +
    (mbti.TF > 0 ? 'T' : 'F') +
    (mbti.JP > 0 ? 'J' : 'P')
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields
    const { playerID, tgID, username, firstName, phone, dob, mbti, nkq, choices } = body;
    if (!playerID || !tgID || !phone || !dob || !mbti) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const profile: PlayerProfile = {
      playerID,
      tgID,
      username: username || '',
      firstName: firstName || '',
      lastName: body.lastName || '',
      phone,
      dob,
      mbti,
      type: deriveType(mbti),
      nkq: nkq || { speed: 0, pattern: 0, memory: 0 },
      choices: choices || [],
      completedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    const kv = await getKV();

    if (kv) {
      // Check if player exists (preserve createdAt)
      const existing = await kv.get<PlayerProfile>(`player:${playerID}`);
      if (existing?.createdAt) {
        profile.createdAt = existing.createdAt;
      }

      // Store by playerID
      await kv.set(`player:${playerID}`, profile);

      // Index by tgID for reverse lookups
      await kv.set(`tg:${tgID}`, playerID);

      // Index by phone for dedup
      await kv.set(`phone:${phone}`, playerID);

      console.log(`[PLAYER SAVE] ${profile.type} — ${firstName} (@${username}) — ${playerID}`);
    } else {
      // No KV available — log to console (dev mode)
      console.log('=== PLAYER PROFILE (no KV) ===');
      console.log(JSON.stringify(profile, null, 2));
    }

    return NextResponse.json({ ok: true, type: profile.type });
  } catch (err) {
    console.error('Player save error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
