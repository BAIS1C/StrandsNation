#!/usr/bin/env python3
"""
build-whitepaper-pdf.py

Reads V6 whitepaper markdown source files and generates a professionally
formatted PDF for download on the website.

Source: src/data/whitepaper/source/Whitepaper V6 - Ch*.md
Output: public/strands-whitepaper-v6.pdf

Run: python3 scripts/build-whitepaper-pdf.py
"""

import os
import re
import markdown
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm, cm
from reportlab.lib.colors import HexColor, white, black, Color
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY, TA_RIGHT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak,
    Table, TableStyle, KeepTogether, HRFlowable, ListFlowable, ListItem,
    NextPageTemplate, PageTemplate, Frame, BaseDocTemplate
)
from reportlab.pdfgen import canvas
from reportlab.lib.fonts import addMapping
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# ─── Configuration ───────────────────────────────────────────────────

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
LOGO_PATH = os.path.join(SCRIPT_DIR, 'strands-logo.png')
LOGO_SM_PATH = os.path.join(SCRIPT_DIR, 'strands-logo-sm.png')
SOURCE_DIR = os.path.join(PROJECT_ROOT, 'src', 'data', 'whitepaper', 'source')
OUTPUT_PATH = os.path.join(PROJECT_ROOT, 'public', 'strands-whitepaper-v6.pdf')

# Brand colors
CYAN = HexColor('#00C2FF')
PINK = HexColor('#F000B8')
DARK_BG = HexColor('#0A0A0F')
DARK_SURFACE = HexColor('#111118')
MID_GREY = HexColor('#888888')
LIGHT_GREY = HexColor('#CCCCCC')
BODY_TEXT = HexColor('#333333')
HEADING_TEXT = HexColor('#0A0A0F')

PAGE_W, PAGE_H = A4
MARGIN_LEFT = 25 * mm
MARGIN_RIGHT = 25 * mm
MARGIN_TOP = 25 * mm
MARGIN_BOTTOM = 25 * mm

# Chapter order and metadata
CHAPTERS = [
    ('Whitepaper V6 - Ch1 Strands Reasons Why.md',         '1',  'Strands: Reasons Why',              'PART I: THE THESIS'),
    ('Whitepaper V6 - Ch2 Strands the Game.md',            '2',  'Strands the Game',                  'PART I: THE THESIS'),
    ('Whitepaper V6 - Ch3 My Maits.md',                    '3',  'My Maits',                          'PART II: THE ECOSYSTEM'),
    ('Whitepaper V6 - Ch4 EveryWear.md',                   '4',  'EveryWear',                         'PART II: THE ECOSYSTEM'),
    ('Whitepaper V6 - Ch5 Layer U and the ARE.md',         '5',  'Layer U and the A.R.E.',            'PART II: THE ECOSYSTEM'),
    ('Whitepaper V6 - Ch6 KREDS Tokenomics.md',            '6',  '$KREDS Tokenomics',                 'PART III: THE CHAIN'),
    ('Whitepaper V6 - Ch7 Strands Blockchain.md',          '7',  'Strands Blockchain',                'PART III: THE CHAIN'),
    ('Whitepaper V6 - Ch8 Governance Privacy Compliance.md','8',  'Governance, Privacy & Compliance',  'PART IV: OPERATIONS'),
    ('Whitepaper V6 - Ch9 Roadmap.md',                     '9',  'Roadmap',                           'PART IV: OPERATIONS'),
    ('Whitepaper V6 - Ch10 Team.md',                       '10', 'Team',                              'PART IV: OPERATIONS'),
    ('Whitepaper V6 - Ch11 Legal.md',                      '11', 'Legal & Regulatory Disclaimer',     'PART V: APPENDICES'),
    ('Whitepaper V6 - Ch12 Appendices.md',                 '12', 'Appendices',                        'PART V: APPENDICES'),
]


# ─── Styles ──────────────────────────────────────────────────────────

def get_styles():
    """Build custom paragraph styles for the whitepaper."""
    styles = {}

    styles['body'] = ParagraphStyle(
        'Body',
        fontName='Helvetica',
        fontSize=10,
        leading=15,
        textColor=BODY_TEXT,
        alignment=TA_JUSTIFY,
        spaceAfter=8,
        spaceBefore=2,
    )

    styles['h1'] = ParagraphStyle(
        'ChapterTitle',
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=28,
        textColor=HEADING_TEXT,
        spaceBefore=0,
        spaceAfter=16,
    )

    styles['h2'] = ParagraphStyle(
        'SectionHead',
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=19,
        textColor=HEADING_TEXT,
        spaceBefore=20,
        spaceAfter=8,
    )

    styles['h3'] = ParagraphStyle(
        'SubsectionHead',
        fontName='Helvetica-Bold',
        fontSize=11.5,
        leading=16,
        textColor=HEADING_TEXT,
        spaceBefore=14,
        spaceAfter=6,
    )

    styles['h4'] = ParagraphStyle(
        'SubSubHead',
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=HEADING_TEXT,
        spaceBefore=10,
        spaceAfter=4,
    )

    styles['bullet'] = ParagraphStyle(
        'Bullet',
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=BODY_TEXT,
        leftIndent=18,
        spaceBefore=2,
        spaceAfter=2,
        bulletIndent=6,
        alignment=TA_LEFT,
    )

    styles['bold_body'] = ParagraphStyle(
        'BoldBody',
        parent=styles['body'],
        fontName='Helvetica-Bold',
    )

    styles['toc_part'] = ParagraphStyle(
        'TOCPart',
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=14,
        textColor=CYAN,
        spaceBefore=14,
        spaceAfter=4,
        leftIndent=0,
    )

    styles['toc_entry'] = ParagraphStyle(
        'TOCEntry',
        fontName='Helvetica',
        fontSize=10,
        leading=16,
        textColor=BODY_TEXT,
        leftIndent=12,
        spaceAfter=2,
    )

    styles['cover_title'] = ParagraphStyle(
        'CoverTitle',
        fontName='Helvetica-Bold',
        fontSize=36,
        leading=42,
        textColor=white,
        alignment=TA_LEFT,
    )

    styles['cover_subtitle'] = ParagraphStyle(
        'CoverSubtitle',
        fontName='Helvetica',
        fontSize=14,
        leading=20,
        textColor=CYAN,
        alignment=TA_LEFT,
    )

    styles['cover_meta'] = ParagraphStyle(
        'CoverMeta',
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=HexColor('#999999'),
        alignment=TA_LEFT,
    )

    styles['part_title'] = ParagraphStyle(
        'PartTitle',
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=CYAN,
        spaceBefore=24,
        spaceAfter=8,
    )

    styles['chapter_num'] = ParagraphStyle(
        'ChapterNum',
        fontName='Helvetica',
        fontSize=11,
        leading=14,
        textColor=CYAN,
        spaceBefore=0,
        spaceAfter=4,
    )

    styles['hr'] = ParagraphStyle(
        'HR',
        fontSize=2,
        spaceBefore=12,
        spaceAfter=12,
    )

    return styles


# ─── Markdown Parser ─────────────────────────────────────────────────

def parse_markdown_to_flowables(md_text, styles):
    """Convert markdown text to ReportLab flowables."""
    flowables = []
    lines = md_text.split('\n')
    i = 0
    in_list = False
    list_items = []

    while i < len(lines):
        line = lines[i].rstrip()

        # Skip empty lines
        if not line:
            if in_list and list_items:
                for item in list_items:
                    flowables.append(item)
                list_items = []
                in_list = False
            i += 1
            continue

        # Horizontal rule
        if line.strip() in ('---', '***', '___'):
            if in_list and list_items:
                for item in list_items:
                    flowables.append(item)
                list_items = []
                in_list = False
            flowables.append(HRFlowable(
                width="100%",
                thickness=0.5,
                color=HexColor('#DDDDDD'),
                spaceBefore=10,
                spaceAfter=10,
            ))
            i += 1
            continue

        # Headers
        header_match = re.match(r'^(#{1,4})\s+(.*)', line)
        if header_match:
            if in_list and list_items:
                for item in list_items:
                    flowables.append(item)
                list_items = []
                in_list = False
            level = len(header_match.group(1))
            text = format_inline(header_match.group(2))
            style_key = f'h{level}'
            if style_key in styles:
                flowables.append(Paragraph(text, styles[style_key]))
            i += 1
            continue

        # Bullet points
        bullet_match = re.match(r'^[-*]\s+(.*)', line)
        if bullet_match:
            in_list = True
            text = format_inline(bullet_match.group(1))
            # Collect continuation lines
            while i + 1 < len(lines) and lines[i + 1].strip() and not re.match(r'^[-*]\s+', lines[i + 1]) and not re.match(r'^#{1,4}\s+', lines[i + 1]) and not lines[i + 1].strip() in ('---', '***', '___'):
                i += 1
                text += ' ' + format_inline(lines[i].strip())
            list_items.append(Paragraph(f'<bullet>&bull;</bullet> {text}', styles['bullet']))
            i += 1
            continue

        # Numbered list
        num_match = re.match(r'^\d+\.\s+(.*)', line)
        if num_match:
            in_list = True
            text = format_inline(num_match.group(1))
            list_items.append(Paragraph(f'<bullet>&bull;</bullet> {text}', styles['bullet']))
            i += 1
            continue

        # Table detection
        if '|' in line and i + 1 < len(lines) and '|' in lines[i + 1]:
            if in_list and list_items:
                for item in list_items:
                    flowables.append(item)
                list_items = []
                in_list = False
            table_lines = []
            while i < len(lines) and '|' in lines[i]:
                table_lines.append(lines[i])
                i += 1
            table_flowable = build_table(table_lines, styles)
            if table_flowable:
                flowables.append(Spacer(1, 6))
                flowables.append(table_flowable)
                flowables.append(Spacer(1, 6))
            continue

        # Regular paragraph — collect continuation lines
        if in_list and list_items:
            for item in list_items:
                flowables.append(item)
            list_items = []
            in_list = False

        para_text = format_inline(line)
        while i + 1 < len(lines) and lines[i + 1].strip() and not re.match(r'^[-*]\s+', lines[i + 1]) and not re.match(r'^\d+\.\s+', lines[i + 1]) and not re.match(r'^#{1,4}\s+', lines[i + 1]) and not lines[i + 1].strip() in ('---', '***', '___') and '|' not in lines[i + 1]:
            i += 1
            para_text += ' ' + format_inline(lines[i].strip())

        if para_text.strip():
            flowables.append(Paragraph(para_text, styles['body']))

        i += 1

    # Flush remaining list
    if list_items:
        for item in list_items:
            flowables.append(item)

    return flowables


def format_inline(text):
    """Convert markdown inline formatting to ReportLab XML markup."""
    # Escape XML entities first (but not already-escaped ones)
    text = text.replace('&', '&amp;')
    text = text.replace('<', '&lt;')
    text = text.replace('>', '&gt;')

    # Bold + italic
    text = re.sub(r'\*\*\*(.*?)\*\*\*', r'<b><i>\1</i></b>', text)
    # Bold
    text = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', text)
    # Italic
    text = re.sub(r'\*(.*?)\*', r'<i>\1</i>', text)
    # Inline code
    text = re.sub(r'`(.*?)`', r'<font face="Courier" size="9">\1</font>', text)
    # Links — just show text
    text = re.sub(r'\[(.*?)\]\(.*?\)', r'\1', text)
    # Replace any em dashes with semicolons/colons
    text = text.replace('\u2014', ';')
    text = text.replace(' -- ', '; ')
    text = text.replace('--', '; ')
    # Trademark
    text = text.replace('(TM)', '\u2122')

    return text


def build_table(table_lines, styles):
    """Convert markdown table lines to a ReportLab Table."""
    rows = []
    for line in table_lines:
        cells = [c.strip() for c in line.strip('|').split('|')]
        # Skip separator rows
        if all(re.match(r'^[-:]+$', c) for c in cells):
            continue
        rows.append(cells)

    if len(rows) < 2:
        return None

    # Build table data with Paragraphs
    table_data = []
    cell_style = ParagraphStyle('TableCell', fontName='Helvetica', fontSize=8.5, leading=11, textColor=BODY_TEXT)
    header_style = ParagraphStyle('TableHeader', fontName='Helvetica-Bold', fontSize=8.5, leading=11, textColor=HEADING_TEXT)

    for row_idx, row in enumerate(rows):
        style = header_style if row_idx == 0 else cell_style
        table_data.append([Paragraph(format_inline(cell), style) for cell in row])

    # Calculate column widths
    avail_width = PAGE_W - MARGIN_LEFT - MARGIN_RIGHT
    n_cols = len(table_data[0])
    col_width = avail_width / n_cols

    table = Table(table_data, colWidths=[col_width] * n_cols)
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), HexColor('#F0F4F8')),
        ('TEXTCOLOR', (0, 0), (-1, 0), HEADING_TEXT),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 8.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('GRID', (0, 0), (-1, -1), 0.5, HexColor('#DDDDDD')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, HexColor('#FAFAFA')]),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]))
    return table


# ─── Page Templates ──────────────────────────────────────────────────

class WhitepaperDocTemplate(BaseDocTemplate):
    """Custom doc template with cover page and body page templates."""

    def __init__(self, filename, **kwargs):
        BaseDocTemplate.__init__(self, filename, **kwargs)

        # Cover page frame with generous padding
        cover_frame = Frame(
            35 * mm, 25 * mm,
            PAGE_W - 70 * mm, PAGE_H - 50 * mm,
            id='cover',
            leftPadding=0, rightPadding=0,
            topPadding=0, bottomPadding=0
        )

        # Body frame with margins
        body_frame = Frame(
            MARGIN_LEFT, MARGIN_BOTTOM,
            PAGE_W - MARGIN_LEFT - MARGIN_RIGHT,
            PAGE_H - MARGIN_TOP - MARGIN_BOTTOM,
            id='body'
        )

        self.addPageTemplates([
            PageTemplate(id='Cover', frames=[cover_frame], onPage=self._draw_cover_bg),
            PageTemplate(id='Body', frames=[body_frame], onPage=self._draw_body_page),
        ])

    @staticmethod
    def _draw_gradient_bar(canvas_obj, x, y, width, height, color_l, color_r, steps=120):
        """Draw a horizontal gradient bar from color_l to color_r."""
        strip_w = width / steps
        r1, g1, b1 = color_l.red, color_l.green, color_l.blue
        r2, g2, b2 = color_r.red, color_r.green, color_r.blue
        for i in range(steps):
            t = i / (steps - 1)
            r = r1 + (r2 - r1) * t
            g = g1 + (g2 - g1) * t
            b = b1 + (b2 - b1) * t
            canvas_obj.setFillColor(Color(r, g, b))
            canvas_obj.rect(x + i * strip_w, y, strip_w + 0.5, height, fill=1, stroke=0)

    def _draw_cover_bg(self, canvas_obj, doc):
        """Draw cover page background."""
        canvas_obj.saveState()

        # Full dark background
        canvas_obj.setFillColor(DARK_BG)
        canvas_obj.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)

        # Cyan-to-pink gradient bar at top (matches website brand)
        self._draw_gradient_bar(
            canvas_obj, 0, PAGE_H - 5 * mm, PAGE_W, 5 * mm, CYAN, PINK
        )

        # Thin gradient bar at bottom (pink-to-cyan, reversed)
        self._draw_gradient_bar(
            canvas_obj, 0, 0, PAGE_W, 2 * mm, PINK, CYAN
        )

        # Logo centred near the top, below gradient bar
        if os.path.exists(LOGO_PATH):
            logo_w = 50 * mm
            logo_h = 50 * mm
            logo_x = (PAGE_W - logo_w) / 2
            logo_y = PAGE_H - 5 * mm - 8 * mm - logo_h
            canvas_obj.drawImage(
                LOGO_PATH, logo_x, logo_y, logo_w, logo_h,
                preserveAspectRatio=True, mask='auto'
            )

        # Subtle horizontal divider between upper and lower content blocks
        canvas_obj.setStrokeColor(CYAN)
        canvas_obj.setLineWidth(0.5)
        divider_y = PAGE_H * 0.36
        canvas_obj.line(40 * mm, divider_y, PAGE_W - 40 * mm, divider_y)

        canvas_obj.restoreState()

    def _draw_body_page(self, canvas_obj, doc):
        """Draw body page header/footer."""
        canvas_obj.saveState()

        # Header line
        canvas_obj.setStrokeColor(HexColor('#DDDDDD'))
        canvas_obj.setLineWidth(0.5)
        y_header = PAGE_H - 18 * mm
        canvas_obj.line(MARGIN_LEFT, y_header, PAGE_W - MARGIN_RIGHT, y_header)

        # Header text
        canvas_obj.setFont('Helvetica', 7.5)
        canvas_obj.setFillColor(MID_GREY)
        canvas_obj.drawString(MARGIN_LEFT, y_header + 3 * mm,
                             'STRANDS WHITEPAPER V6.0')
        canvas_obj.drawRightString(PAGE_W - MARGIN_RIGHT, y_header + 3 * mm,
                                  'PT META FIN TEK · CONFIDENTIAL')

        # Footer rule
        y_footer = 14 * mm
        canvas_obj.setStrokeColor(HexColor('#DDDDDD'))
        canvas_obj.line(MARGIN_LEFT, y_footer, PAGE_W - MARGIN_RIGHT, y_footer)

        # Footer: logo left, page number centre, URL right
        if os.path.exists(LOGO_SM_PATH):
            logo_s = 6 * mm
            canvas_obj.drawImage(
                LOGO_SM_PATH,
                MARGIN_LEFT, y_footer - 10 - 1,
                logo_s, logo_s,
                preserveAspectRatio=True, mask='auto'
            )

        canvas_obj.setFont('Helvetica', 8)
        canvas_obj.setFillColor(MID_GREY)
        canvas_obj.drawCentredString(PAGE_W / 2, y_footer - 10, str(doc.page))
        canvas_obj.setFont('Helvetica', 6.5)
        canvas_obj.drawRightString(PAGE_W - MARGIN_RIGHT, y_footer - 10,
                                  'strandsnation.xyz')

        # Gradient accent bar at bottom (cyan to pink)
        self._draw_gradient_bar(
            canvas_obj, 0, 0, PAGE_W, 1 * mm, CYAN, PINK, steps=80
        )

        canvas_obj.restoreState()


# ─── Build Document ──────────────────────────────────────────────────

def build_cover(styles):
    """Build cover page flowables."""
    flowables = []

    # Push content below the logo area (logo drawn by canvas, ~50mm)
    flowables.append(Spacer(1, 140))

    # Title
    title_style = ParagraphStyle(
        'CoverTitle', fontName='Helvetica-Bold', fontSize=42, leading=48,
        textColor=white, alignment=TA_CENTER,
    )
    flowables.append(Paragraph('STRANDS', title_style))
    flowables.append(Spacer(1, 14))

    # Subtitle
    subtitle_style = ParagraphStyle(
        'CoverSub2', fontName='Helvetica', fontSize=14, leading=21,
        textColor=LIGHT_GREY, alignment=TA_CENTER,
    )
    flowables.append(Paragraph(
        'A Decentralised Bulwark Against Techno-Feudalism<br/>'
        'and the Path to Equitable Income',
        subtitle_style
    ))

    flowables.append(Spacer(1, 40))

    # Version label
    ver_style = ParagraphStyle(
        'CoverVer', fontName='Helvetica-Bold', fontSize=13, leading=18,
        textColor=CYAN, alignment=TA_CENTER, spaceBefore=0, spaceAfter=16,
    )
    flowables.append(Paragraph('WHITEPAPER V6.0', ver_style))

    # Metadata block
    meta_style = ParagraphStyle(
        'CoverMetaC', fontName='Helvetica', fontSize=9.5, leading=15,
        textColor=HexColor('#999999'), alignment=TA_CENTER,
    )
    meta_lines = [
        'PT Meta Fin Tek  \u00b7  Metafintek.xyz',
        'March 2026',
        '12 Chapters  \u00b7  ~21,000 words',
        'Classification: Internal, Founder Review',
    ]
    for line in meta_lines:
        flowables.append(Paragraph(line, meta_style))
        flowables.append(Spacer(1, 2))

    flowables.append(Spacer(1, 55))

    # Tagline
    tagline_style = ParagraphStyle(
        'Tagline', fontName='Helvetica-Bold', fontSize=9.5, leading=14,
        textColor=CYAN, alignment=TA_CENTER,
    )
    flowables.append(Paragraph(
        'We are not Left. We are not Right. We are not the Centre. We are the Decentre.',
        tagline_style
    ))

    # Force next content to body template
    flowables.append(NextPageTemplate('Body'))
    flowables.append(PageBreak())

    return flowables


def build_toc(styles):
    """Build table of contents."""
    flowables = []

    toc_title = ParagraphStyle(
        'TOCTitle', fontName='Helvetica-Bold', fontSize=20, leading=26,
        textColor=HEADING_TEXT, spaceBefore=0, spaceAfter=20,
    )
    flowables.append(Paragraph('Table of Contents', toc_title))

    last_part = None
    for _, num, title, part in CHAPTERS:
        if part != last_part:
            flowables.append(Paragraph(part, styles['toc_part']))
            last_part = part
        flowables.append(Paragraph(
            f'<b>Chapter {num}</b>&nbsp;&nbsp;&nbsp;{title}',
            styles['toc_entry']
        ))

    flowables.append(Spacer(1, 20))
    flowables.append(HRFlowable(width="100%", thickness=0.5, color=HexColor('#DDDDDD'), spaceBefore=8, spaceAfter=8))
    flowables.append(PageBreak())

    return flowables


def build_chapters(styles):
    """Parse all chapter markdown files and build flowables."""
    flowables = []
    last_part = None

    for filename, num, title, part in CHAPTERS:
        filepath = os.path.join(SOURCE_DIR, filename)

        if not os.path.exists(filepath):
            print(f'  WARNING: {filename} not found, skipping')
            continue

        print(f'  Processing Chapter {num}: {title}')

        with open(filepath, 'r', encoding='utf-8') as f:
            md_text = f.read()

        # Strip the V6 chapter header (first H1); we render our own
        md_text = re.sub(r'^#\s+.*?\n', '', md_text, count=1)

        # Strip "What This Chapter Does Not Cover" sections entirely
        md_text = re.sub(
            r'##\s+What This Chapter Does Not Cover.*?(?=\n## |\Z)',
            '',
            md_text,
            flags=re.DOTALL
        )

        # Part divider
        if part != last_part:
            flowables.append(Paragraph(part, styles['part_title']))
            last_part = part

        # Chapter number label
        flowables.append(Paragraph(f'CHAPTER {num}', styles['chapter_num']))

        # Chapter title
        flowables.append(Paragraph(title, styles['h1']))

        # Chapter content
        chapter_flowables = parse_markdown_to_flowables(md_text, styles)
        flowables.extend(chapter_flowables)

        # Page break after each chapter
        flowables.append(PageBreak())

    return flowables


def main():
    print('Building Strands Whitepaper V6 PDF...')
    print(f'  Source: {SOURCE_DIR}')
    print(f'  Output: {OUTPUT_PATH}')

    styles = get_styles()

    # Build document
    doc = WhitepaperDocTemplate(
        OUTPUT_PATH,
        pagesize=A4,
        title='Strands Whitepaper V6.0',
        author='PT Meta Fin Tek',
        subject='A Decentralised Bulwark Against Techno-Feudalism',
        creator='Strands Nation',
    )

    story = []

    story.extend(build_cover(styles))
    story.extend(build_toc(styles))
    story.extend(build_chapters(styles))

    print('  Building PDF...')
    doc.build(story)

    file_size = os.path.getsize(OUTPUT_PATH)
    print(f'\n  PDF generated: {OUTPUT_PATH}')
    print(f'  Size: {file_size / 1024:.0f} KB')
    print('Done.')


if __name__ == '__main__':
    main()
