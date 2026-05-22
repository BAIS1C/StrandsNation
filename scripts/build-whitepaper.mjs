/**
 * build-whitepaper.mjs
 *
 * Reads V7 whitepaper markdown source files and generates
 * TypeScript chapter modules for the website.
 *
 * V7 structure (14 chapters):
 *   Ch1-3 : carried over from V6 source files unchanged (Reasons Why, Game, Maits)
 *   Ch4   : EveryWear (V7 rewrite of V6 Ch4)
 *   Ch5   : Context-Aware Tooling and Modularisation (NEW in V7)
 *   Ch6   : Project SON (NEW in V7)
 *   Ch7   : Layer U and the A.R.E. (V7 rewrite of V6 Ch5)
 *   Ch8-14: carried over from V6 source files (KREDS through Appendices), renumbered
 *
 * Source: src/data/whitepaper/source/Whitepaper V6 - Ch*.md + Whitepaper V7 - Ch*.md
 * Output: src/data/whitepaper/chapter-XX.ts + index.ts
 *
 * H1 headings in source files are normalised to V7 chapter numbering at build time.
 *
 * Run: node scripts/build-whitepaper.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { marked } from 'marked';

const SOURCE_DIR = join(process.cwd(), 'src/data/whitepaper/source');
const OUTPUT_DIR = join(process.cwd(), 'src/data/whitepaper');

const CHAPTER_META = {
  '01': { title: 'Strands: Reasons Why',                       part: 'PART I: THE THESIS' },
  '02': { title: 'Strands the Game',                           part: 'PART I: THE THESIS' },
  '03': { title: 'My Maits',                                   part: 'PART II: THE ECOSYSTEM' },
  '04': { title: 'EveryWear',                                  part: 'PART II: THE ECOSYSTEM' },
  '05': { title: 'Context-Aware Tooling and Modularisation',   part: 'PART II: THE ECOSYSTEM' },
  '06': { title: 'Project SON',                                part: 'PART II: THE ECOSYSTEM' },
  '07': { title: 'Layer U and the A.R.E.',                     part: 'PART II: THE ECOSYSTEM' },
  '08': { title: '$KREDS Tokenomics',                          part: 'PART III: THE CHAIN' },
  '09': { title: 'Strands Blockchain',                         part: 'PART III: THE CHAIN' },
  '10': { title: 'Governance, Privacy & Compliance',           part: 'PART IV: OPERATIONS' },
  '11': { title: 'Roadmap',                                    part: 'PART IV: OPERATIONS' },
  '12': { title: 'Team',                                       part: 'PART IV: OPERATIONS' },
  '13': { title: 'Legal & Regulatory Disclaimer',              part: 'PART V: APPENDICES' },
  '14': { title: 'Appendices',                                 part: 'PART V: APPENDICES' },
};

const FILE_MAP = {
  'Whitepaper V6 - Ch1 Strands Reasons Why.md':                          '01',
  'Whitepaper V6 - Ch2 Strands the Game.md':                             '02',
  'Whitepaper V6 - Ch3 My Maits.md':                                     '03',
  'Whitepaper V7 - Ch4 EveryWear.md':                                    '04',
  'Whitepaper V7 - Ch5 Context-Aware Tooling and Modularisation.md':     '05',
  'Whitepaper V7 - Ch6 Project SON.md':                                  '06',
  'Whitepaper V7 - Ch7 Layer U and the ARE.md':                          '07',
  'Whitepaper V6 - Ch6 KREDS Tokenomics.md':                             '08',
  'Whitepaper V6 - Ch7 Strands Blockchain.md':                           '09',
  'Whitepaper V6 - Ch8 Governance Privacy Compliance.md':                '10',
  'Whitepaper V6 - Ch9 Roadmap.md':                                      '11',
  'Whitepaper V6 - Ch10 Team.md':                                        '12',
  'Whitepaper V6 - Ch11 Legal.md':                                       '13',
  'Whitepaper V6 - Ch12 Appendices.md':                                  '14',
};

marked.setOptions({ gfm: true, breaks: false });

const chapters = [];

for (const [filename, chNum] of Object.entries(FILE_MAP)) {
  const sourcePath = join(SOURCE_DIR, filename);
  const meta = CHAPTER_META[chNum];

  console.log(`Processing Ch${chNum}: ${meta.title}`);

  let md = readFileSync(sourcePath, 'utf-8');

  const v7ChapterNum = parseInt(chNum, 10);
  md = md.replace(
    /^# Whitepaper V[67] - Chapter \d+: .*$/m,
    `# Whitepaper V7 - Chapter ${v7ChapterNum}: ${meta.title}`
  );

  md = md.replace(/## What This Chapter Does Not Cover[\s\S]*?(?=\n## |\n*$)/g, '');

  md = md.replaceAll('\u2014', ';');

  const html = marked.parse(md);

  const escapedHtml = html
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');

  const tsContent = `import type { WhitepaperChapter } from './index';

const chapter: WhitepaperChapter = {
  id: "${chNum}",
  title: "${meta.title.replace(/"/g, '\\"')}",
  part: "${meta.part}",
  html: \`${escapedHtml}\`,
};

export default chapter;
`;

  const outputPath = join(OUTPUT_DIR, `chapter-${chNum}.ts`);
  writeFileSync(outputPath, tsContent, 'utf-8');
  console.log(`  -> Written ${outputPath}`);

  chapters.push({ num: chNum, varName: `chapter${chNum}` });
}

const imports = chapters.map(c => `import ${c.varName} from './chapter-${c.num}';`).join('\n');
const arrayEntries = chapters.map(c => `  ${c.varName},`).join('\n');
const namedExports = chapters.map(c => `  ${c.varName},`).join('\n');

const indexContent = `/**
 * Whitepaper Chapters: Modularised Index (V7)
 *
 * Auto-generated by scripts/build-whitepaper.mjs
 */

export interface WhitepaperChapter {
  id: string;
  title: string;
  part: string;
  html: string;
}

${imports}

export const whitepaperChapters: WhitepaperChapter[] = [
${arrayEntries}
];

export {
${namedExports}
};
`;

writeFileSync(join(OUTPUT_DIR, 'index.ts'), indexContent, 'utf-8');
console.log(`\n✓ index.ts updated with ${chapters.length} chapters`);
console.log('Done.');
