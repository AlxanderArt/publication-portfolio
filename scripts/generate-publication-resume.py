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
HORIZONOPS = "https://horizonops-predictive-intelligence.vercel.app"
PYMATION = "https://github.com/AlxanderArt/Pymation"

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
story.append(P("Publication Designer | AI-Native Creative Technologist | QA Automation Engineer | CAD / 3D Specialist", "Role"))
story.append(P(
    f"Frisco / Plano / Dallas-Fort Worth, TX · (214) 986-4044 · iamaxwellwillis@gmail.com<br/>"
    f"<a href='{LINKEDIN}' color='blue'>LinkedIn</a> · "
    f"<a href='{GITHUB}' color='blue'>GitHub</a> · "
    f"<a href='{PORTFOLIO}' color='blue'>Publication Portfolio</a>",
    "Contact",
))

story.append(P("SUMMARY", "Section"))
story.append(P(
    "Multidisciplinary publication designer and AI-native technologist with experience transforming complex civic, business, and technical information into polished, accessible, stakeholder-ready publications and interactive review systems. Combines publication graphics, editorial layout, data visualization, React/Next.js, QA automation, AI-assisted workflows, Rhino/XNURBS CAD surface modeling, and 3D printing to support high-quality communication, decision-making, and production execution."
))

story.append(P("CORE STRENGTHS", "Section"))
skills = [
    [P("<b>Publication & Editorial</b><br/>Publication graphics, report/editorial layout, budget books, stakeholder review systems, presentation design, accessibility-aware information design", "Small"),
     P("<b>Data & Visual Systems</b><br/>Data visualization, chart systems, infographic design, icon libraries, visual hierarchy, design systems, cross-functional review workflows", "Small")],
    [P("<b>AI / Software / QA</b><br/>AI-assisted development, React, Next.js, TypeScript, Python, QA automation, API testing, Playwright, pytest, bug documentation", "Small"),
     P("<b>CAD / 3D / Fabrication</b><br/>Rhino 3D, XNURBS CAD surface modeling, 3D modeling, 3D printing, geometric problem-solving, design-to-production workflows", "Small")],
]
table = Table(skills, colWidths=[3.55*inch, 3.55*inch], hAlign="LEFT")
table.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 0),
    ("RIGHTPADDING", (0, 0), (-1, -1), 8),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
]))
story.append(table)

story.append(P("SELECTED PUBLICATION / DESIGN WORK", "Section"))
story.append(P(f"City of Plano Budget & Research Publication Modernization — <a href='{PLANO_REVIEW}' color='blue'>Interactive Review App</a>", "ItemHead"))
story.append(bullet("Contracted through Insight Global for the City of Plano, supporting modernization of a public-facing budget and research publication system."))
story.append(bullet("Built a production design system for a 444-page civic publication, including reusable layouts, chart/cover components, iconography, and accessibility-aware information design."))
story.append(bullet("Designed and shipped a mobile-responsive React/Next.js review app on Vercel for stakeholder selection, persistence, and JSON export of design decisions."))
story.append(bullet("Scripted repetitive production tasks to improve consistency, speed, and review quality across a large-scale publication workflow."))

story.append(P("Publication Portfolio — Public-Facing Report & Visual Communication System", "ItemHead"))
story.append(bullet("Curated publication work into a responsive portfolio experience with downloadable reports, visual previews, and structured project storytelling."))
story.append(bullet("Focused on clarity, hierarchy, and executive readability for long-form reports, strategic forecasts, CIP materials, dashboards, and stakeholder-facing communication."))

story.append(P("SELECTED TECHNICAL PROJECTS", "Section"))
story.append(P(f"Pymation QA Automation Portfolio — <a href='{PYMATION}' color='blue'>GitHub Repository</a>", "ItemHead"))
story.append(bullet("Built a QA automation portfolio with 18 test files and 260+ test cases across API, UI, AI/ML validation, Flask API, and CRUD workflows."))
story.append(bullet("Created test plans, bug reports, coverage documentation, screenshots, and CI/CD documentation for repeatable technical review."))

story.append(P(f"HorizonOps Predictive Intelligence Platform — <a href='{HORIZONOPS}' color='blue'>Live Prototype</a>", "ItemHead"))
story.append(bullet("Created a FastAPI/React operational intelligence prototype with telemetry APIs, machine health endpoints, prediction feedback loops, and dashboard workflows."))
story.append(bullet("Defined validation strategy across unit tests, API/data-pipeline integration tests, model validation, Playwright checks, and load testing."))

story.append(P("PROFESSIONAL EXPERIENCE", "Section"))
story.append(P("AlxanderArt — Independent AI Engineer & Creative Technologist · Dallas–Fort Worth, TX · Jan 2021 – Present", "ItemHead"))
story.append(bullet("Create publication, brand, web, automation, QA, and technical design systems for business, civic, and creative use cases."))
story.append(bullet("Translate stakeholder goals into polished visual systems, technical prototypes, documentation, AI-assisted workflows, and deployed web experiences."))
story.append(bullet("Apply Rhino 3D, XNURBS CAD surface modeling, 3D modeling, and 3D printing experience to prototyping, fabrication-aware design, and geometric problem-solving."))

story.append(P("Insight Global — Publication Designer / Interactive Review App Builder, City of Plano Contract · Plano, TX · Mar 2026 – Jun 2026", "ItemHead"))
story.append(bullet("Supported Budget and Research publication modernization from discovery through interactive review tooling and production design system delivery."))
story.append(bullet("Delivered high-quality stakeholder-facing assets while coordinating publication layout, visual consistency, and usability across a large document system."))

story.append(P("SW Consulting — IT Business Analyst · Remote / Dallas–Fort Worth, TX · 2018 – 2021", "ItemHead"))
story.append(bullet("Partnered with engineers and product owners in Agile/Scrum environments to gather requirements, manage backlogs, support QA, write acceptance criteria, assist UAT, and retest defects."))

story.append(P("TOOLS & TECHNOLOGIES", "Section"))
story.append(P(
    "Adobe Illustrator, Photoshop, InDesign, After Effects, Acrobat Pro · PowerPoint · Figma · HTML/CSS · React · Next.js · TypeScript · Python · Flask/FastAPI · Git/GitHub · Vercel · Playwright · pytest · Postman · Rhino 3D · XNURBS · Blender · 3D printing workflows",
    "Small",
))

story.append(P("EDUCATION & CERTIFICATION", "Section"))
story.append(P("Baylor University — B.S., Health Sciences (Kinesiology) · Division I Track & Field Athlete<br/>Careerist — QA Automation Engineer Certification, 2026", "Small"))

pdf = SimpleDocTemplate(str(OUT), pagesize=letter, rightMargin=0.48*inch, leftMargin=0.48*inch, topMargin=0.42*inch, bottomMargin=0.42*inch)
pdf.build(story)
print(OUT)
