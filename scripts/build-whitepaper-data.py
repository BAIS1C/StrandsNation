#!/usr/bin/env python3
"""Convert whitepaper markdown chapters → TypeScript data module."""

import markdown
import re
import os
import json

CHAPTERS = [
    ("STRANDS_Whitepaper_v6_Chapter_01_Executive_Summary.md", "01", "Executive Summary", "PART I: THE PROBLEM & THE THESIS"),
    ("STRANDS_Whitepaper_v6_Chapter_02_Telegram_Pivot.md", "02", "The Telegram Pivot", "PART I: THE PROBLEM & THE THESIS"),
    ("STRANDS_Whitepaper_v6_Chapter_03_Strands_Chain.md", "03", "Strands Chain", "PART II: THE TECHNOLOGY MODULES"),
    ("STRANDS_Whitepaper_v6_Chapter_04_Game_Engine_Foundation.md", "04", "Game Engine Foundation", "PART II: THE TECHNOLOGY MODULES"),
    ("STRANDS_Whitepaper_v6_Chapter_05_Memory_Sovereignty_Stack.md", "05", "Memory Sovereignty Stack", "PART II: THE TECHNOLOGY MODULES"),
    ("STRANDS_Whitepaper_v6_Chapter_06_Generative_Content_Stack.md", "06", "Generative Content Stack", "PART II: THE TECHNOLOGY MODULES"),
    ("STRANDS_Whitepaper_v6_Chapter_07_EveryWear_Browser.md", "07", "EveryWear Browser", "PART II: THE TECHNOLOGY MODULES"),
    ("STRANDS_Whitepaper_v6_Chapter_08_ARE.md", "08", "Attention Redistribution Engine", "PART II: THE TECHNOLOGY MODULES"),
    ("STRANDS_Whitepaper_v6_Chapter_09_Sensing_Spatial.md", "09", "Sensing & Spatial Intelligence", "PART II: THE TECHNOLOGY MODULES"),
    ("STRANDS_Whitepaper_v6_Chapter_10_Three_Economic_Layers.md", "10", "Three Economic Layers", "PART III: THE ECONOMICS"),
    ("STRANDS_Whitepaper_v6_Chapter_11_Game_Economics.md", "11", "Game Economics", "PART III: THE ECONOMICS"),
    ("STRANDS_Whitepaper_v6_Chapter_12_Layer_U.md", "12", "Layer U", "PART III: THE ECONOMICS"),
    ("STRANDS_Whitepaper_v6_Chapter_13_KREDS.md", "13", "$KREDS Protocol", "PART III: THE ECONOMICS"),
    ("STRANDS_Whitepaper_v6_Chapter_14_Open_Source_POC.md", "14", "Open-Source Proof-of-Concept", "PART IV: PROOF & DEPLOYMENT"),
    ("STRANDS_Whitepaper_v6_Chapter_15_Roadmap.md", "15", "Roadmap & Build Sequence", "PART IV: PROOF & DEPLOYMENT"),
    ("STRANDS_Whitepaper_v6_Chapter_16_Governance.md", "16", "Governance & Compliance", "PART IV: PROOF & DEPLOYMENT"),
    ("STRANDS_Whitepaper_v6_Chapter_17_Conclusion.md", "17", "Conclusion", ""),
    ("STRANDS_Whitepaper_v6_Appendices.md", "A", "Appendices", ""),
]

SRC = "/mnt/project"

def clean_md(text):
    text = re.sub(r'^#\s+STRANDS WHITEPAPER v6\.0\s*\n', '', text, flags=re.MULTILINE)
    text = re.sub(r'^##\s+PART\s+[IVX]+:.*\n', '', text, flags=re.MULTILINE)
    # Remove leading ---
    text = re.sub(r'^\s*---\s*\n', '', text, count=3)
    return text.strip()

def convert_chapter(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        raw = f.read()
    cleaned = clean_md(raw)
    html = markdown.markdown(cleaned, extensions=['tables', 'fenced_code', 'toc'])
    return html

entries = []
for filename, num, title, part in CHAPTERS:
    path = os.path.join(SRC, filename)
    if os.path.exists(path):
        content = convert_chapter(path)
        entries.append({
            "id": num,
            "title": title,
            "part": part,
            "html": content,
        })

# Build TypeScript
ts = "/* Auto-generated from whitepaper markdown chapters. Do not edit directly. */\n"
ts += "/* Regenerate with: python3 scripts/build-whitepaper-data.py */\n\n"
ts += "export interface WhitepaperChapter {\n"
ts += "  id: string;\n"
ts += "  title: string;\n"
ts += "  part: string;\n"
ts += "  html: string;\n"
ts += "}\n\n"
ts += f"export const chapters: WhitepaperChapter[] = {json.dumps(entries, ensure_ascii=False)};\n"

out = "/home/claude/patch/src/data/whitepaper-chapters.ts"
os.makedirs(os.path.dirname(out), exist_ok=True)
with open(out, 'w', encoding='utf-8') as f:
    f.write(ts)

print(f"✓ Generated {out}")
print(f"  {len(entries)} chapters, {os.path.getsize(out):,} bytes")
