#!/usr/bin/env python3
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

OUT = Path(__file__).resolve().parents[1] / "public" / "resume" / "resume.pdf"
OUT.parent.mkdir(parents=True, exist_ok=True)

LINKEDIN = "https://linkedin.com/in/iammaxwellwillis"
GITHUB = "https://github.com/AlxanderArt"
PORTFOLIO = "https://publication-portfolio.vercel.app"
PLANO_REVIEW = "https://plano-design-review.vercel.app"

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(
    name="Name",
    parent=styles["Title"],
    fontName="Helvetica-Bold",
    fontSize=18,
    leading=21,
    alignment=1,
    textColor=colors.HexColor("#111111"),
    spaceAfter=2,
))
styles.add(ParagraphStyle(
    name="Role",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=9.5,
    leading=11,
    alignment=1,
    textColor=colors.HexColor("#202020"),
    spaceAfter=3,
))
styles.add(ParagraphStyle(
    name="Contact",
    parent=styles["Normal"],
    fontSize=7.7,
    leading=9.2,
    alignment=1,
    textColor=colors.HexColor("#333333"),
    spaceAfter=7,
))
styles.add(ParagraphStyle(
    name="Section",
    parent=styles["Heading2"],
    fontName="Helvetica-Bold",
    fontSize=9.7,
    leading=11,
    textColor=colors.HexColor("#111111"),
    spaceBefore=5,
    spaceAfter=2,
    borderColor=colors.HexColor("#d9d9d9"),
    borderWidth=0,
))
styles.add(ParagraphStyle(
    name="Body",
    parent=styles["Normal"],
    fontSize=7.65,
    leading=9.25,
    textColor=colors.HexColor("#161616"),
    spaceAfter=3,
))
styles.add(ParagraphStyle(
    name="Small",
    parent=styles["Normal"],
    fontSize=7.2,
    leading=8.8,
    textColor=colors.HexColor("#161616"),
    spaceAfter=2,
))
styles.add(ParagraphStyle(
    name="ResumeBullet",
    parent=styles["Body"],
    leftIndent=10,
    firstLineIndent=-6,
    bulletIndent=0,
    spaceAfter=1.8,
))
styles.add(ParagraphStyle(
    name="ItemHead",
    parent=styles["Body"],
    fontName="Helvetica-Bold",
    spaceBefore=2,
    spaceAfter=1,
))


def P(text: str, style="Body"):
    return Paragraph(text, styles[style])


def bullet(text: str):
    return Paragraph("• " + text, styles["ResumeBullet"])


story = []
story.append(P("MAXWELL WILLIS", "Name"))
story.append(P("Publication Designer | Strategic Reports | Civic Publication Systems | AI-Assisted Workflows", "Role"))
story.append(P(
    f"Frisco / Plano / Dallas-Fort Worth, TX · (214) 986-4044 · iamaxwellwillis@gmail.com<br/>"
    f"<a href='{LINKEDIN}' color='blue'>LinkedIn</a> · "
    f"<a href='{GITHUB}' color='blue'>GitHub</a> · "
    f"<a href='{PORTFOLIO}' color='blue'>Publication Portfolio</a>",
    "Contact",
))

story.append(P("SUMMARY", "Section"))
story.append(P(
    "Publication-focused designer and AI-assisted workflow builder specializing in strategic reports, civic publication systems, data visualization, and interactive review work. Creates clear, stakeholder-ready publications and web-based review experiences that make complex public information easier to understand, evaluate, and approve."
))

story.append(P("FOCUS AREAS", "Section"))
focus = [
    [P("<b>Publication Design</b><br/>Editorial layout, report systems, page hierarchy, cover concepts, visual consistency, and stakeholder-ready presentation assets", "Small"),
     P("<b>Strategic Reports</b><br/>Long-form reports, executive-readable narratives, budget and research communication, structured findings, and visual storytelling", "Small")],
    [P("<b>Civic / Publication Systems</b><br/>Public-sector publication modernization, reusable design systems, accessibility-aware communication, and review-ready document workflows", "Small"),
     P("<b>Data Visualization & Interactive Review</b><br/>Charts, infographics, visual summaries, web-based review flows, selection persistence, and exportable decision records", "Small")],
    [P("<b>AI-Assisted Workflows</b><br/>AI-supported drafting, organization, quality checks, repeatable production tasks, content refinement, and faster review cycles", "Small"),
     P("<b>Portfolio Delivery</b><br/>Responsive publication portfolio pages, downloadable report assets, clickable references, and clear project documentation", "Small")],
]
table = Table(focus, colWidths=[3.55*inch, 3.55*inch], hAlign="LEFT")
table.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 0),
    ("RIGHTPADDING", (0, 0), (-1, -1), 8),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
]))
story.append(table)

story.append(P("SELECTED PUBLICATION / DESIGN WORK", "Section"))
story.append(P(f"City of Plano Budget & Research Publication Modernization — <a href='{PLANO_REVIEW}' color='blue'>Interactive Review App</a>", "ItemHead"))
story.append(bullet("Supported modernization of a public-facing budget and research publication system through publication design, structured review, and stakeholder-ready visual communication."))
story.append(bullet("Built a production design system for a 444-page civic publication, including reusable layouts, cover directions, chart components, iconography, and accessibility-aware information design."))
story.append(bullet("Designed and shipped a mobile-responsive interactive review app for stakeholder selection, saved preferences, and exportable design-decision records."))
story.append(bullet("Used AI-assisted drafting, organization, and quality-check workflows to improve consistency, speed, and review clarity across a large publication process."))

story.append(P("Publication Portfolio — Public-Facing Report & Visual Communication System", "ItemHead"))
story.append(bullet("Curated publication work into a responsive portfolio experience with downloadable reports, visual previews, and structured project storytelling."))
story.append(bullet("Focused on clarity, hierarchy, and executive readability for strategic forecasts, civic reports, CIP materials, data visuals, dashboards, and stakeholder-facing communication."))
story.append(bullet("Maintained clickable references and public-facing project links so viewers can move from résumé summary to supporting publication examples."))

story.append(P("PUBLICATION CAPABILITIES", "Section"))
story.append(P(
    "Publication design · Strategic report layout · Civic/publication systems · Data visualization · Infographic direction · Executive-readable summaries · Interactive review workflows · Stakeholder review support · AI-assisted drafting, organization, and quality checks · Responsive portfolio presentation · Clickable PDF and web references",
    "Small",
))

story.append(P("SELECTED TOOLS", "Section"))
story.append(P(
    "Adobe Illustrator · Photoshop · InDesign · Acrobat Pro · PowerPoint · Figma · HTML/CSS · React · Next.js · GitHub · Vercel · AI-assisted writing and review workflows",
    "Small",
))

story.append(P("EDUCATION", "Section"))
story.append(P("Baylor University — B.S., Health Sciences (Kinesiology) · Division I Track & Field Athlete", "Small"))

pdf = SimpleDocTemplate(str(OUT), pagesize=letter, rightMargin=0.48*inch, leftMargin=0.48*inch, topMargin=0.42*inch, bottomMargin=0.42*inch)
pdf.build(story)
print(OUT)
