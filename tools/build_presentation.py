from pathlib import Path

from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.util import Inches, Pt


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "Mentoria_Compass_Mogger_Presentation.pptx"
LINKS = ROOT / "Mentoria_Compass_Mogger_Links.txt"


slides = [
    {
        "title": "Mentoria Compass",
        "subtitle": "Personalized EdTech hub for opportunities, async learning, AI roadmap and CV review",
        "bullets": [
            "Team: Mogger",
            "Captain: Shabdanov Askar / @LawDirr",
            "Product: https://mentoria-compass.vercel.app",
            "GitHub: https://github.com/askarshabdanov1-collab/Mentoria",
        ],
    },
    {
        "title": "Problem",
        "subtitle": "Mentoria is growing beyond Telegram and live calls",
        "bullets": [
            "Students miss live lessons because of school, exams, time zones and unstable schedules.",
            "Opportunities are scattered across sites, channels, chats and documents.",
            "Students do not know which programs fit their grade, interests and goals.",
            "Mentoria needs a scalable system for courses, recommendations and student retention.",
        ],
    },
    {
        "title": "Solution",
        "subtitle": "One platform for opportunities, courses and personal progress",
        "bullets": [
            "Registration and personal student cabinet with saved opportunities and course progress.",
            "Opportunity catalog with filters, search and profile match score.",
            "Async Mentoria courses with lessons, tasks and completion tracking.",
            "Admin panel for adding opportunities/courses without rebuilding the website.",
        ],
    },
    {
        "title": "AI Features",
        "subtitle": "AI-style analysis that works without external API keys",
        "bullets": [
            "Readiness score based on grade, interests, goals, deadlines, saved items and course progress.",
            "Strengths, risks and concrete next actions for each student.",
            "Weekly action plan for applications and learning.",
            "CV Review: upload/paste CV, find gaps, get improvements and rewrite weak bullets.",
        ],
    },
    {
        "title": "User Journey",
        "subtitle": "Designed for a 4-minute live demo",
        "bullets": [
            "Student registers, selects interests and goals.",
            "Compass recommends opportunities and courses with match scores.",
            "Student saves a program, completes a lesson and opens the cabinet.",
            "Student uploads CV and receives gaps plus improvement plan.",
            "Admin logs in and publishes a new opportunity through the backend.",
        ],
    },
    {
        "title": "Technical Architecture",
        "subtitle": "Full-stack product deployed on Vercel",
        "bullets": [
            "Frontend: React + Vite + responsive dashboard UI.",
            "Backend: Node serverless API on Vercel.",
            "Auth: registration, login, logout and bearer token sessions.",
            "Data: users, progress, saved opportunities, CV reviews, courses and admin content.",
            "Production URL and GitHub repository are connected.",
        ],
    },
    {
        "title": "Impact for Mentoria",
        "subtitle": "A scalable platform for students, mentors and partners",
        "bullets": [
            "Reduces dependence on Telegram and live-only learning.",
            "Improves student retention through progress, deadlines and personalized next steps.",
            "Makes Mentoria look more professional for schools, sponsors and partners.",
            "Creates a foundation for future integrations: Supabase/Postgres, Telegram reminders and mentor portal.",
        ],
    },
]


def add_textbox(slide, x, y, w, h, text, size=24, color=RGBColor(246, 248, 239), bold=False):
    box = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    frame = box.text_frame
    frame.clear()
    p = frame.paragraphs[0]
    p.text = text
    run = p.runs[0]
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.color.rgb = color
    return box


def add_bullets(slide, bullets):
    box = slide.shapes.add_textbox(Inches(0.75), Inches(2.35), Inches(11.4), Inches(4.3))
    frame = box.text_frame
    frame.clear()
    for idx, bullet in enumerate(bullets):
        p = frame.paragraphs[0] if idx == 0 else frame.add_paragraph()
        p.text = bullet
        p.level = 0
        p.space_after = Pt(8)
        p.font.size = Pt(19)
        p.font.color.rgb = RGBColor(230, 234, 218)


def add_accent(slide, prs, index):
    bg = slide.background.fill
    bg.solid()
    bg.fore_color.rgb = RGBColor(10, 12, 11)
    top = slide.shapes.add_shape(1, Inches(0), Inches(0), prs.slide_width, Inches(0.12))
    top.fill.solid()
    top.fill.fore_color.rgb = RGBColor(223, 255, 85)
    top.line.fill.background()
    badge = slide.shapes.add_shape(1, Inches(10.65), Inches(0.45), Inches(1.45), Inches(0.42))
    badge.fill.solid()
    badge.fill.fore_color.rgb = RGBColor(90, 215, 255)
    badge.line.fill.background()
    tf = badge.text_frame
    tf.text = f"{index:02d}"
    tf.paragraphs[0].alignment = PP_ALIGN.CENTER
    tf.paragraphs[0].runs[0].font.size = Pt(16)
    tf.paragraphs[0].runs[0].font.bold = True
    tf.paragraphs[0].runs[0].font.color.rgb = RGBColor(10, 12, 11)


def main():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank = prs.slide_layouts[6]

    for idx, item in enumerate(slides, start=1):
        slide = prs.slides.add_slide(blank)
        add_accent(slide, prs, idx)
        add_textbox(slide, 0.72, 0.62, 9.7, 0.55, "MENTORIA COMPASS", 14, RGBColor(223, 255, 85), True)
        add_textbox(slide, 0.7, 1.02, 11.0, 0.82, item["title"], 42, RGBColor(255, 254, 240), True)
        add_textbox(slide, 0.73, 1.82, 11.2, 0.45, item["subtitle"], 18, RGBColor(170, 184, 169), False)
        add_bullets(slide, item["bullets"])

    prs.save(OUT)
    LINKS.write_text(
        "Mentoria Compass / Team Mogger\n"
        "Captain: Shabdanov Askar (@LawDirr)\n\n"
        "Production product:\nhttps://mentoria-compass.vercel.app\n\n"
        "GitHub repository:\nhttps://github.com/askarshabdanov1-collab/Mentoria\n\n"
        "Demo accounts:\nStudent: amina@mentoria.demo / demo123\nAdmin: admin@mentoria.demo / admin123\n",
        encoding="utf-8",
    )
    print(OUT)
    print(LINKS)


if __name__ == "__main__":
    main()
