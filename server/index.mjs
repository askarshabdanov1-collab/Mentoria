import { createServer } from 'node:http'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pbkdf2Sync, randomBytes, timingSafeEqual } from 'node:crypto'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataFile = process.env.VERCEL ? join('/tmp', 'mentoria-compass-db.json') : join(__dirname, 'data', 'db.json')
const port = Number(process.env.API_PORT || 4174)

const starterOpportunities = [
  {
    id: 1,
    title: 'Central Asia STEM Research Sprint',
    category: 'STEM',
    direction: 'Science',
    grade: '9-11',
    format: 'Online',
    deadline: '2026-06-24',
    requirements: 'Essay, short research idea, English B1+',
    description: 'Two-week guided research challenge for students building their first academic project.',
    applyUrl: '#',
    tags: ['STEM', 'Science', 'Portfolio', 'Research'],
  },
  {
    id: 2,
    title: 'Teen Startup Pitch Cup',
    category: 'Business',
    direction: 'Business',
    grade: '8-11',
    format: 'Hybrid',
    deadline: '2026-07-02',
    requirements: 'Team of 2-4, 3-minute pitch deck',
    description: 'Startup competition for high-school founders with mentor feedback and partner judging.',
    applyUrl: '#',
    tags: ['Business', 'Finance', 'Portfolio'],
  },
  {
    id: 3,
    title: 'Global Essay Challenge',
    category: 'English',
    direction: 'University',
    grade: '9-11',
    format: 'Online',
    deadline: '2026-07-08',
    requirements: '650-word essay, English B2+',
    description: 'International writing contest that helps students practice admissions-style essays.',
    applyUrl: '#',
    tags: ['English', 'University', 'Study abroad'],
  },
  {
    id: 4,
    title: 'Kazakhstan Data Hack',
    category: 'Programming',
    direction: 'STEM',
    grade: '10-11',
    format: 'Offline',
    deadline: '2026-06-29',
    requirements: 'Python basics, laptop, GitHub profile',
    description: 'Weekend data challenge using public datasets, dashboards and mentor office hours.',
    applyUrl: '#',
    tags: ['Programming', 'STEM', 'Portfolio'],
  },
  {
    id: 5,
    title: 'Youth Climate Action Fellowship',
    category: 'Social Impact',
    direction: 'Social Impact',
    grade: '8-10',
    format: 'Online',
    deadline: '2026-07-15',
    requirements: 'Community idea, 1 recommendation',
    description: 'Project-based fellowship for students launching local environmental initiatives.',
    applyUrl: '#',
    tags: ['Social Impact', 'Portfolio'],
  },
  {
    id: 6,
    title: 'Finance Literacy Olympiad',
    category: 'Finance',
    direction: 'Business',
    grade: '9-11',
    format: 'Online',
    deadline: '2026-06-21',
    requirements: 'Algebra basics, online test',
    description: 'Competition covering budgeting, investing, macroeconomics and personal finance.',
    applyUrl: '#',
    tags: ['Finance', 'Business'],
  },
  {
    id: 7,
    title: 'BioLab Summer School',
    category: 'Science',
    direction: 'STEM',
    grade: '10-11',
    format: 'Hybrid',
    deadline: '2026-07-20',
    requirements: 'Biology grade 9+, motivation note',
    description: 'Mentored summer school with lab simulations, case studies and final poster defense.',
    applyUrl: '#',
    tags: ['Science', 'STEM', 'Research'],
  },
  {
    id: 8,
    title: 'Model UN Leadership Track',
    category: 'Leadership',
    direction: 'Social Impact',
    grade: '8-11',
    format: 'Offline',
    deadline: '2026-07-11',
    requirements: 'Interest in debate, English B1+',
    description: 'Public speaking and diplomacy track for students building leadership portfolios.',
    applyUrl: '#',
    tags: ['English', 'Social Impact', 'Portfolio'],
  },
  {
    id: 9,
    title: 'SAT Math Weekend Bootcamp',
    category: 'University',
    direction: 'University',
    grade: '10-11',
    format: 'Online',
    deadline: '2026-06-26',
    requirements: 'Diagnostic test, calculator',
    description: 'Focused bootcamp for algebra, problem solving and SAT-style timed practice.',
    applyUrl: '#',
    tags: ['University', 'Math', 'Study abroad'],
  },
]

const starterCourses = [
  {
    id: 101,
    title: 'Academic English for Opportunity Applications',
    level: 'Intermediate',
    subject: 'English',
    description: 'Essays, short answers and confident written communication for international programs.',
    tags: ['English', 'University', 'Study abroad'],
    accent: '#dfff55',
    lessons: [
      { title: 'Writing a 150-word motivation answer', task: 'Rewrite a weak motivation paragraph.' },
      { title: 'Turning activities into impact statements', task: 'Create 3 impact bullets.' },
      { title: 'Common grammar fixes for applications', task: 'Score 4/5 on the quiz.' },
    ],
  },
  {
    id: 102,
    title: 'University Roadmap Foundations',
    level: 'Beginner',
    subject: 'Admissions',
    description: 'A structured path from interests to portfolio, tests, essays and scholarship deadlines.',
    tags: ['University', 'Portfolio', 'Study abroad'],
    accent: '#5ad7ff',
    lessons: [
      { title: 'Choosing a direction without panic', task: 'Pick 2 academic tracks.' },
      { title: 'Building a portfolio calendar', task: 'Add 3 milestones to your plan.' },
      { title: 'Scholarships and proof of fit', task: 'Match 2 scholarships to your profile.' },
    ],
  },
  {
    id: 103,
    title: 'Intro to STEM Research',
    level: 'Advanced',
    subject: 'STEM',
    description: 'How to ask a research question, collect evidence and present findings as a student.',
    tags: ['STEM', 'Science', 'Research', 'Portfolio'],
    accent: '#ff9f6e',
    lessons: [
      { title: 'From curiosity to research question', task: 'Draft one testable question.' },
      { title: 'Reading sources without drowning', task: 'Summarize 2 sources.' },
      { title: 'Poster and demo-day story', task: 'Build a 5-slide poster outline.' },
    ],
  },
]

const defaultProfile = {
  name: 'Amina',
  grade: '10',
  country: 'Kazakhstan',
  school: 'NIS Astana',
  englishLevel: 'B2',
  interests: ['STEM', 'English', 'University'],
  goals: ['Study abroad', 'Portfolio'],
}

function hashPassword(password, salt = randomBytes(16).toString('hex')) {
  const hash = pbkdf2Sync(password, salt, 100000, 32, 'sha256').toString('hex')
  return `${salt}:${hash}`
}

function verifyPassword(password, stored) {
  const [salt, hash] = stored.split(':')
  const candidate = hashPassword(password, salt).split(':')[1]
  return timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(candidate, 'hex'))
}

function publicUser(user) {
  const { passwordHash, ...safeUser } = user
  return safeUser
}

function includesAny(text, words) {
  return words.some((word) => text.includes(word))
}

function sectionPresent(text, labels) {
  return labels.some((label) => new RegExp(`(^|\\n|\\r)\\s*${label}\\s*:?`, 'i').test(text))
}

function analyzeCvText(rawText, profile = {}) {
  const text = String(rawText || '').replace(/\s+/g, ' ').trim()
  const lower = text.toLowerCase()
  const lines = String(rawText || '').split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
  const wordCount = text ? text.split(/\s+/).length : 0
  const hasEmail = /[^\s@]+@[^\s@]+\.[^\s@]+/.test(text)
  const hasPhone = /(\+\d{1,3}[\s-]?)?(\(?\d{3}\)?[\s-]?)?\d{3}[\s-]?\d{2,4}[\s-]?\d{2,4}/.test(text)
  const hasLinks = /linkedin|github|portfolio|behance|kaggle|medium|https?:\/\//i.test(text)
  const hasNumbers = /\b\d+[%+]?\b/.test(text)
  const hasActionVerbs = includesAny(lower, [
    'led',
    'built',
    'created',
    'organized',
    'researched',
    'launched',
    'improved',
    'won',
    'разработ',
    'создал',
    'организ',
    'исслед',
    'побед',
    'улучш',
  ])
  const hasEducation = sectionPresent(rawText, ['education', 'образование', 'school', 'школа'])
  const hasExperience = sectionPresent(rawText, ['experience', 'опыт', 'projects', 'проекты', 'activities', 'активности'])
  const hasSkills = sectionPresent(rawText, ['skills', 'навыки', 'tools', 'technologies'])
  const hasAwards = sectionPresent(rawText, ['awards', 'honors', 'achievements', 'достижения', 'награды'])
  const hasEnglishSignal = includesAny(lower, ['ielts', 'toefl', 'sat', 'duolingo', 'b2', 'c1', 'english'])
  const goalHints = (profile.goals || []).join(', ') || 'selected opportunities'
  const interestHints = (profile.interests || []).join(', ') || 'academic interests'

  const checks = [
    [hasEmail, 8, 'Contact email is present.'],
    [hasPhone || hasLinks, 8, 'Contact channel beyond email is present.'],
    [hasEducation, 10, 'Education section is clear.'],
    [hasExperience, 14, 'Experience or project section is visible.'],
    [hasSkills, 10, 'Skills section is visible.'],
    [hasAwards, 10, 'Awards or achievements section is visible.'],
    [hasNumbers, 12, 'Impact is quantified with numbers.'],
    [hasActionVerbs, 10, 'Bullet points use action verbs.'],
    [hasLinks, 8, 'Portfolio/GitHub/LinkedIn links are included.'],
    [wordCount >= 180 && wordCount <= 650, 10, 'Length fits a student CV.'],
  ]

  const score = Math.min(98, checks.reduce((sum, [pass, points]) => sum + (pass ? points : 0), 0) + 10)
  const gaps = []
  const improvements = []

  if (!hasEmail) gaps.push('No clear email address. Add one professional email at the top.')
  if (!hasEducation) gaps.push('Education section is missing or hard to find.')
  if (!hasExperience) gaps.push('Projects, activities or experience are not clearly separated.')
  if (!hasSkills) gaps.push('Skills/tools section is missing, so judges cannot scan strengths quickly.')
  if (!hasAwards) gaps.push('Achievements are not highlighted as evidence of competitiveness.')
  if (!hasNumbers) gaps.push('Impact is not quantified. Add numbers, rankings, users, hours, scores or growth.')
  if (!hasActionVerbs) gaps.push('Bullets sound passive. Start them with strong action verbs.')
  if (!hasLinks) gaps.push('No portfolio, GitHub, LinkedIn or project link. Add proof where possible.')
  if (wordCount < 120) gaps.push('CV is too short. It needs more evidence and context.')
  if (wordCount > 750) gaps.push('CV is too long for a student application. Cut weak bullets.')

  improvements.push(`Rewrite the top summary for ${goalHints}: 1 sentence with grade, field and strongest proof.`)
  improvements.push(`Add 2-3 bullets that connect ${interestHints} to real projects, competitions or coursework.`)
  improvements.push('Convert every activity into this format: Action + what you built/did + measurable result.')
  improvements.push('Move the strongest achievement into the first half of the CV.')
  improvements.push('Add a small “Selected Projects” section with links, tools used and outcome.')
  if (!hasEnglishSignal) improvements.push('If applying internationally, add IELTS/TOEFL/SAT/English level evidence.')

  const rewriteExamples = lines
    .filter((line) => line.length > 35 && !/\d/.test(line))
    .slice(0, 3)
    .map((line) => ({
      before: line,
      after: `Improved version: ${line.replace(/\.$/, '')}; add measurable result, scope and tools used.`,
    }))

  return {
    id: `cv-${Date.now()}`,
    createdAt: new Date().toISOString(),
    score,
    wordCount,
    summary:
      score >= 80
        ? 'Strong CV foundation. The next gains come from sharper evidence, metrics and better positioning.'
        : score >= 55
          ? 'Good draft, but it needs clearer sections, measurable impact and stronger proof for opportunities.'
          : 'CV is not yet application-ready. Build structure first, then add evidence and measurable outcomes.',
    strengths: checks.filter(([pass]) => pass).map(([, , label]) => label),
    gaps: gaps.length ? gaps : ['No major structural gaps found. Improve wording and proof density next.'],
    improvements,
    rewriteExamples,
  }
}

function createSeedDb() {
  return {
    opportunities: starterOpportunities,
    courses: starterCourses,
    users: [
      {
        id: 'student-demo',
        email: 'amina@mentoria.demo',
        passwordHash: hashPassword('demo123'),
        role: 'student',
        profile: defaultProfile,
        saved: [3],
        progress: { 101: 1, 102: 0, 103: 0 },
        cvReviews: [],
        createdAt: '2026-06-18T00:00:00.000Z',
      },
      {
        id: 'admin-demo',
        email: 'admin@mentoria.demo',
        passwordHash: hashPassword('admin123'),
        role: 'admin',
        profile: { ...defaultProfile, name: 'Mentoria Admin', school: 'Mentoria HQ' },
        saved: [],
        progress: { 101: 0, 102: 0, 103: 0 },
        cvReviews: [],
        createdAt: '2026-06-18T00:00:00.000Z',
      },
    ],
    sessions: {},
  }
}

async function readDb() {
  await mkdir(dirname(dataFile), { recursive: true })
  if (!existsSync(dataFile)) {
    const seed = createSeedDb()
    await writeFile(dataFile, JSON.stringify(seed, null, 2))
    return seed
  }
  const db = JSON.parse(await readFile(dataFile, 'utf8'))
  db.users = db.users.map((user) => ({ cvReviews: [], ...user }))
  return db
}

async function writeDb(db) {
  await writeFile(dataFile, JSON.stringify(db, null, 2))
}

async function parseBody(req) {
  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  if (!chunks.length) return {}
  return JSON.parse(Buffer.concat(chunks).toString('utf8'))
}

function send(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,OPTIONS',
  })
  res.end(JSON.stringify(payload))
}

async function requireUser(req, db) {
  const auth = req.headers.authorization || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''
  const userId = db.sessions[token]
  const user = db.users.find((item) => item.id === userId)
  if (!user) return null
  return { token, user }
}

function routeKey(req, url) {
  return `${req.method} ${url.pathname}`
}

export async function handleRequest(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`)
  if (req.method === 'OPTIONS') return send(res, 204, {})

  try {
    const db = await readDb()
    const key = routeKey(req, url)

    if (key === 'GET /api/health') {
      return send(res, 200, { ok: true, service: 'Mentoria Compass API' })
    }

    if (key === 'GET /api/bootstrap') {
      return send(res, 200, { opportunities: db.opportunities, courses: db.courses })
    }

    if (key === 'POST /api/auth/login') {
      const body = await parseBody(req)
      const email = String(body.email || '').trim().toLowerCase()
      const user = db.users.find((item) => item.email === email)
      if (!user || !verifyPassword(String(body.password || ''), user.passwordHash)) {
        return send(res, 401, { message: 'Invalid email or password' })
      }
      const token = randomBytes(32).toString('hex')
      db.sessions[token] = user.id
      await writeDb(db)
      return send(res, 200, { token, user: publicUser(user), opportunities: db.opportunities, courses: db.courses })
    }

    if (key === 'POST /api/auth/register') {
      const body = await parseBody(req)
      const email = String(body.email || '').trim().toLowerCase()
      const password = String(body.password || '')
      if (!email || !String(body.name || '').trim() || password.length < 4) {
        return send(res, 400, { message: 'Name, email and password are required' })
      }
      if (db.users.some((item) => item.email === email)) {
        return send(res, 409, { message: 'Account already exists' })
      }
      const user = {
        id: `student-${Date.now()}`,
        email,
        passwordHash: hashPassword(password),
        role: 'student',
        profile: {
          ...defaultProfile,
          name: String(body.name).trim(),
          grade: String(body.grade || '10'),
          country: String(body.country || 'Kazakhstan'),
          school: '',
          interests: ['University'],
          goals: ['Study abroad'],
        },
        saved: [],
        progress: Object.fromEntries(db.courses.map((course) => [course.id, 0])),
        cvReviews: [],
        createdAt: new Date().toISOString(),
      }
      const token = randomBytes(32).toString('hex')
      db.users.push(user)
      db.sessions[token] = user.id
      await writeDb(db)
      return send(res, 201, { token, user: publicUser(user), opportunities: db.opportunities, courses: db.courses })
    }

    if (key === 'GET /api/me') {
      const auth = await requireUser(req, db)
      if (!auth) return send(res, 401, { message: 'Unauthorized' })
      return send(res, 200, { user: publicUser(auth.user), opportunities: db.opportunities, courses: db.courses })
    }

    if (key === 'POST /api/auth/logout') {
      const auth = await requireUser(req, db)
      if (auth) {
        delete db.sessions[auth.token]
        await writeDb(db)
      }
      return send(res, 200, { ok: true })
    }

    if (key === 'PATCH /api/me/profile') {
      const auth = await requireUser(req, db)
      if (!auth) return send(res, 401, { message: 'Unauthorized' })
      auth.user.profile = { ...auth.user.profile, ...(await parseBody(req)) }
      await writeDb(db)
      return send(res, 200, { user: publicUser(auth.user) })
    }

    if (key === 'PATCH /api/me/saved') {
      const auth = await requireUser(req, db)
      if (!auth) return send(res, 401, { message: 'Unauthorized' })
      const { opportunityId } = await parseBody(req)
      const id = Number(opportunityId)
      auth.user.saved = auth.user.saved.includes(id) ? auth.user.saved.filter((item) => item !== id) : [...auth.user.saved, id]
      await writeDb(db)
      return send(res, 200, { user: publicUser(auth.user) })
    }

    if (key === 'PATCH /api/me/progress') {
      const auth = await requireUser(req, db)
      if (!auth) return send(res, 401, { message: 'Unauthorized' })
      const { courseId, completedLessons } = await parseBody(req)
      auth.user.progress = { ...auth.user.progress, [Number(courseId)]: Number(completedLessons) }
      await writeDb(db)
      return send(res, 200, { user: publicUser(auth.user) })
    }

    if (key === 'POST /api/me/cv/analyze') {
      const auth = await requireUser(req, db)
      if (!auth) return send(res, 401, { message: 'Unauthorized' })
      const body = await parseBody(req)
      const cvText = String(body.cvText || '')
      if (cvText.trim().length < 80) {
        return send(res, 400, { message: 'CV text is too short for analysis' })
      }
      const review = {
        ...analyzeCvText(cvText, auth.user.profile),
        fileName: String(body.fileName || 'Pasted CV'),
      }
      auth.user.cvReviews = [review, ...(auth.user.cvReviews || [])].slice(0, 5)
      await writeDb(db)
      return send(res, 200, { user: publicUser(auth.user), review })
    }

    if (key === 'POST /api/admin/opportunities') {
      const auth = await requireUser(req, db)
      if (!auth || auth.user.role !== 'admin') return send(res, 403, { message: 'Admin access required' })
      const body = await parseBody(req)
      const opportunity = {
        id: Date.now(),
        title: String(body.title || '').trim(),
        category: String(body.category || 'STEM'),
        direction: String(body.direction || body.category || 'STEM'),
        grade: String(body.grade || '9-11'),
        format: String(body.format || 'Online'),
        deadline: String(body.deadline || '2026-07-30'),
        requirements: String(body.requirements || 'Motivation note'),
        description: String(body.description || '').trim(),
        applyUrl: String(body.applyUrl || '#'),
        tags: Array.from(new Set([body.category, body.direction, ...(body.tags || [])].filter(Boolean))),
      }
      if (!opportunity.title || !opportunity.description) {
        return send(res, 400, { message: 'Title and description are required' })
      }
      db.opportunities = [opportunity, ...db.opportunities]
      await writeDb(db)
      return send(res, 201, { opportunities: db.opportunities })
    }

    if (req.method === 'DELETE' && url.pathname.startsWith('/api/admin/opportunities/')) {
      const auth = await requireUser(req, db)
      if (!auth || auth.user.role !== 'admin') return send(res, 403, { message: 'Admin access required' })
      const id = Number(url.pathname.split('/').at(-1))
      db.opportunities = db.opportunities.filter((item) => item.id !== id)
      db.users = db.users.map((user) => ({ ...user, saved: user.saved.filter((savedId) => savedId !== id) }))
      await writeDb(db)
      return send(res, 200, { opportunities: db.opportunities })
    }

    if (key === 'POST /api/admin/courses') {
      const auth = await requireUser(req, db)
      if (!auth || auth.user.role !== 'admin') return send(res, 403, { message: 'Admin access required' })
      const course = {
        id: Date.now(),
        title: 'SAT / IELTS Strategy Lab',
        level: 'Intermediate',
        subject: 'University',
        description: 'New mentor-uploaded course for test planning, timing and weekly practice.',
        tags: ['University', 'Study abroad', 'English'],
        accent: '#b8a1ff',
        lessons: [
          { title: 'Diagnostic and target score', task: 'Set one target score.' },
          { title: 'Weekly practice system', task: 'Build a 4-week plan.' },
        ],
      }
      db.courses = [course, ...db.courses]
      db.users = db.users.map((user) => ({ ...user, progress: { ...user.progress, [course.id]: 0 } }))
      await writeDb(db)
      return send(res, 201, { courses: db.courses })
    }

    if (key === 'GET /api/admin/stats') {
      const auth = await requireUser(req, db)
      if (!auth || auth.user.role !== 'admin') return send(res, 403, { message: 'Admin access required' })
      return send(res, 200, {
        users: db.users.map(publicUser),
        totals: {
          users: db.users.length,
          opportunities: db.opportunities.length,
          courses: db.courses.length,
          saved: db.users.reduce((sum, user) => sum + user.saved.length, 0),
        },
      })
    }

    return send(res, 404, { message: 'Route not found' })
  } catch (error) {
    console.error(error)
    return send(res, 500, { message: 'Server error' })
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const server = createServer(handleRequest)
  server.listen(port, () => {
    console.log(`Mentoria Compass API running on http://127.0.0.1:${port}`)
  })
}
