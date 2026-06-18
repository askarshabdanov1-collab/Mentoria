from pathlib import Path

from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.util import Inches, Pt


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "Mentoria_Compass_Mogger_Presentation.pptx"
LINKS = ROOT / "Mentoria_Compass_Mogger_Links.txt"

PRODUCT_URL = "https://mentoria-compass.vercel.app"
GITHUB_URL = "https://github.com/askarshabdanov1-collab/Mentoria"


slides = [
    {
        "label": "Project",
        "title": "Mentoria Compass",
        "subtitle": "Full-stack EdTech hub for opportunities, async learning, AI roadmap and CV review",
        "bullets": [
            "Team: Mogger",
            "Captain: Shabdanov Askar / @LawDirr",
            f"Production product: {PRODUCT_URL}",
            f"GitHub repository: {GITHUB_URL}",
            "Demo accounts: student amina@mentoria.demo / demo123, admin admin@mentoria.demo / admin123",
        ],
    },
    {
        "label": "Problem",
        "title": "Why Mentoria Needs a Platform",
        "subtitle": "Telegram and live calls are not enough when the organization grows",
        "bullets": [
            "Students miss live lessons because of school, exams, time zones, internet access and personal schedules.",
            "Opportunities are scattered across websites, Telegram channels, chats and documents.",
            "Students do not know which competitions, scholarships or programs match their grade, interests and goals.",
            "Mentoria admins need to add courses and opportunities without rebuilding the website or posting manually.",
            "Partners, schools and sponsors need to see a professional scalable product, not only a chat community.",
        ],
    },
    {
        "label": "Audience",
        "title": "Who the Product Is For",
        "subtitle": "Students in grades 8-11 preparing for growth beyond school",
        "bullets": [
            "Students from Kazakhstan and other countries who want academic and extracurricular opportunities.",
            "Students preparing for university admissions, IELTS/SAT, scholarships and international programs.",
            "Students interested in STEM, business, finance, social impact, programming, science and English.",
            "Mentoria admins and mentors who need one place to manage learning content and student progress.",
        ],
    },
    {
        "label": "Solution",
        "title": "What Mentoria Compass Does",
        "subtitle": "One product connecting discovery, learning, progress and applications",
        "bullets": [
            "Personal registration and student cabinet with saved opportunities, learning progress and deadlines.",
            "Opportunity catalog with search, filters and match score based on profile tags.",
            "Async courses with lessons, video placeholders, mini tasks and progress tracking.",
            "AI Analysis that produces readiness score, risks, strengths and a weekly action plan.",
            "Admin panel for publishing opportunities and courses through the backend API.",
        ],
    },
    {
        "label": "Journey",
        "title": "Main User Journey",
        "subtitle": "Designed to be shown clearly in a 4-minute demo",
        "bullets": [
            "Student logs in or registers and fills profile: grade, country, school, English level, interests and goals.",
            "Compass dashboard recommends opportunities and courses with profile match scores.",
            "Student saves an opportunity, sees deadline pressure and starts a relevant course.",
            "Student completes a lesson and the personal cabinet updates progress automatically.",
            "Student opens AI Analysis and gets next actions for applications and learning.",
            "Admin logs in and adds a new opportunity, which appears immediately in the catalog.",
        ],
    },
    {
        "label": "AI",
        "title": "AI Roadmap and Recommendations",
        "subtitle": "Practical analysis that works instantly without external API keys",
        "bullets": [
            "Readiness score is calculated from profile completeness, saved opportunities, course progress and deadline urgency.",
            "The system detects risks: missing saved opportunities, low progress, close deadlines and weak portfolio focus.",
            "Students receive concrete next actions, not generic advice.",
            "Weekly plan turns recommendations into daily tasks: choose opportunity, finish lesson, draft answer, ask mentor, submit.",
            "This helps Mentoria increase retention because students always know the next step.",
        ],
    },
    {
        "label": "CV Review",
        "title": "CV Review: Find Gaps and Improve",
        "subtitle": "Students can upload or paste a CV and receive application-focused feedback",
        "bullets": [
            "The platform checks whether the CV has contact details, education, projects, skills, awards and links.",
            "It detects weak evidence: no numbers, passive bullets, missing portfolio links and unclear achievements.",
            "Students get a CV readiness score and prioritized gaps to fix first.",
            "The tool suggests concrete improvements: stronger summary, quantified impact, project section and rewritten bullets.",
            "CV reviews are saved in the student account so progress can be revisited later.",
        ],
    },
    {
        "label": "Technology",
        "title": "Technical Architecture",
        "subtitle": "Full-stack app deployed to production",
        "bullets": [
            "Frontend: React + Vite dashboard with responsive navigation and product-style UI.",
            "Backend: Node API with auth, user profile, progress, saved items, admin content and CV analysis routes.",
            "Authentication: registration, login, logout and bearer-token sessions.",
            "Deployment: Vercel production app connected to GitHub repository.",
            "Current storage: JSON seed/serverless storage for hackathon delivery; next production step is Supabase/Neon Postgres.",
        ],
    },
    {
        "label": "Impact",
        "title": "Impact for Mentoria",
        "subtitle": "How the product helps Mentoria scale beyond manual Telegram workflows",
        "bullets": [
            "Scales async learning: students can study even when they cannot attend live lessons.",
            "Centralizes opportunities: courses, deadlines, recommendations and saved items are in one place.",
            "Improves retention: progress bars, deadlines, AI next steps and CV feedback keep students engaged.",
            "Improves professional image: Mentoria can show schools, sponsors and partners a real digital platform.",
            "Reduces admin load: admins add opportunities and courses through a panel instead of rebuilding or reposting.",
        ],
    },
    {
        "label": "Roadmap",
        "title": "What Comes Next",
        "subtitle": "Clear path from hackathon MVP to real Mentoria product",
        "bullets": [
            "Connect persistent production database: Supabase or Neon Postgres.",
            "Add Telegram/email reminders for saved opportunity deadlines.",
            "Add mentor portal for uploading lessons, checking assignments and leaving feedback.",
            "Add multilingual interface: Russian, English and Kazakh.",
            "Add certificates, leaderboard and advanced roadmap for grades 8, 9, 10 and 11.",
            "Add real AI integration for deeper CV and essay review when API keys are available.",
        ],
    },
]


def add_textbox(slide, x, y, w, h, text, size=24, color=RGBColor(246, 248, 239), bold=False):
    box = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    frame = box.text_frame
    frame.clear()
    frame.word_wrap = True
    p = frame.paragraphs[0]
    p.text = text
    run = p.runs[0]
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.color.rgb = color
    return box


def add_bullets(slide, bullets):
    box = slide.shapes.add_textbox(Inches(0.75), Inches(2.35), Inches(11.45), Inches(4.62))
    frame = box.text_frame
    frame.clear()
    frame.word_wrap = True
    for idx, bullet in enumerate(bullets):
        p = frame.paragraphs[0] if idx == 0 else frame.add_paragraph()
        p.text = bullet
        p.level = 0
        p.space_after = Pt(7)
        p.font.size = Pt(17 if len(bullets) > 5 else 18)
        p.font.color.rgb = RGBColor(230, 234, 218)


def add_accent(slide, prs, index, label):
    bg = slide.background.fill
    bg.solid()
    bg.fore_color.rgb = RGBColor(10, 12, 11)

    top = slide.shapes.add_shape(1, Inches(0), Inches(0), prs.slide_width, Inches(0.12))
    top.fill.solid()
    top.fill.fore_color.rgb = RGBColor(223, 255, 85)
    top.line.fill.background()

    badge = slide.shapes.add_shape(1, Inches(10.35), Inches(0.42), Inches(2.1), Inches(0.48))
    badge.fill.solid()
    badge.fill.fore_color.rgb = RGBColor(90, 215, 255)
    badge.line.fill.background()
    tf = badge.text_frame
    tf.text = f"{index:02d} / {label}"
    tf.paragraphs[0].alignment = PP_ALIGN.CENTER
    tf.paragraphs[0].runs[0].font.size = Pt(13)
    tf.paragraphs[0].runs[0].font.bold = True
    tf.paragraphs[0].runs[0].font.color.rgb = RGBColor(10, 12, 11)

    footer = slide.shapes.add_textbox(Inches(0.75), Inches(7.05), Inches(11.7), Inches(0.25))
    footer.text_frame.text = f"{PRODUCT_URL}  |  {GITHUB_URL}"
    footer.text_frame.paragraphs[0].runs[0].font.size = Pt(8.5)
    footer.text_frame.paragraphs[0].runs[0].font.color.rgb = RGBColor(115, 132, 114)


def main():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank = prs.slide_layouts[6]

    for idx, item in enumerate(slides, start=1):
        slide = prs.slides.add_slide(blank)
        add_accent(slide, prs, idx, item["label"])
        add_textbox(slide, 0.72, 0.58, 9.5, 0.44, "MENTORIA COMPASS / TEAM MOGGER", 13, RGBColor(223, 255, 85), True)
        add_textbox(slide, 0.7, 0.98, 11.15, 0.82, item["title"], 38, RGBColor(255, 254, 240), True)
        add_textbox(slide, 0.73, 1.78, 11.2, 0.45, item["subtitle"], 17, RGBColor(170, 184, 169), False)
        add_bullets(slide, item["bullets"])

    prs.save(OUT)
    LINKS.write_text(
        "Mentoria Compass / Team Mogger\n"
        "Captain: Shabdanov Askar (@LawDirr)\n\n"
        f"Production product:\n{PRODUCT_URL}\n\n"
        f"GitHub repository:\n{GITHUB_URL}\n\n"
        "Demo accounts:\n"
        "Student: amina@mentoria.demo / demo123\n"
        "Admin: admin@mentoria.demo / admin123\n",
        encoding="utf-8",
    )
    print(OUT)
    print(LINKS)


if __name__ == "__main__":
    main()
