const fs = require('fs');
const path = require('path');
const mm = require('music-metadata');

(async () => {
  // UPDATED PATH — now points to your soundtrack subfolder
  const audioDir = path.join(__dirname, '../public/audio/soundtrack');
  const outputFile = path.join(__dirname, '../src/constants/playlist.ts');

  // Ensure folder exists (defensive)
  if (!fs.existsSync(audioDir)) {
    console.log(`Audio directory not found: ${audioDir}`);
    fs.mkdirSync(audioDir, { recursive: true });
  }

  // Get and sort files (numeric-aware for sequential order)
  let files = fs.readdirSync(audioDir)
    .filter(file => /\.(mp3|ogg|wav)$/i.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

  const entries = [];

  for (const file of files) {
    const filePath = path.join(audioDir, file);

    // Default fallback (cleaned filename — still works if no ID3)
    let title = file
      .replace(/\.[^.]+$/, '')                   // remove extension
      .replace(/^\d+[-_.\s]*/, '')               // strip leading numbers if any
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());

    let artist = 'SpacemanTheDJ';

    // Parse real ID3 tags (AIMP sets these perfectly)
    try {
      const metadata = await mm.parseFile(filePath, { skipCovers: true });
      if (metadata.common.title?.trim()) {
        title = metadata.common.title.trim();
      }
      if (metadata.common.artist?.trim()) {
        artist = metadata.common.artist.trim();
      } else if (metadata.common.albumartist?.trim()) {
        artist = metadata.common.albumartist.trim(); // fallback for some taggers
      }
    } catch (err) {
      console.log(`No ID3 tags readable for ${file} — using filename fallback`);
    }

    entries.push({
      src: `/audio/soundtrack/${file}`,  // UPDATED SRC PATH to match subfolder
      title,
      artist
    });
  }

  const content = `// AUTO-GENERATED — DO NOT EDIT MANUALLY
// Re-generated on every npm run dev or build
// Scanning public/audio/soundtrack/ with full ID3 support (AIMP tags FTW)

export const playlist = ${JSON.stringify(entries, null, 2)} as const;
`;

  fs.writeFileSync(outputFile, content);
  console.log(`Playlist generated: ${entries.length} tracks from public/audio/soundtrack/ (ID3 titles/artists loaded)`);
})();