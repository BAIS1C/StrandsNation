import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const VALID_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

function filenameToLabel(filename: string): string {
  const stem = path.parse(filename).name;
  // Strip common prefixes
  let label = stem
    .replace(/^concept[-_]?/i, '')
    .replace(/^Gemini_Generated_Image_\w+/i, 'concept');
  // Replace separators with spaces, uppercase
  label = label.replace(/[-_]+/g, ' ').trim().toUpperCase();
  return label || 'CONCEPT';
}

export async function GET() {
  const conceptDir = path.join(process.cwd(), 'public', 'images', 'concept');

  try {
    const files = fs.readdirSync(conceptDir)
      .filter((f) => VALID_EXT.has(path.extname(f).toLowerCase()))
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

    const images = files.map((f) => ({
      src: `/images/concept/${f}`,
      label: filenameToLabel(f),
    }));

    return NextResponse.json(images, {
      headers: { 'Cache-Control': 'public, max-age=60, stale-while-revalidate=300' },
    });
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
