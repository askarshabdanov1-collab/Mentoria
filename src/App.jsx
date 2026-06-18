import { useEffect, useMemo, useState } from 'react'
import {
  Award,
  BarChart3,
  BookOpen,
  Brain,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Compass,
  Edit3,
  FileText,
  Filter,
  GraduationCap,
  LayoutDashboard,
  Lock,
  LogIn,
  LogOut,
  Mail,
  Plus,
  Save,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trash2,
  Upload,
  UserPlus,
  UserRound,
  Users,
} from 'lucide-react'
import './App.css'

const defaultProfile = {
  name: 'Amina',
  grade: '10',
  country: 'Kazakhstan',
  school: 'NIS Astana',
  englishLevel: 'B2',
  interests: ['STEM', 'English', 'University'],
  goals: ['Study abroad', 'Portfolio'],
}

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

const tabs = [
  ['dashboard', LayoutDashboard, 'Compass'],
  ['opportunities', Search, 'Opportunities'],
  ['courses', BookOpen, 'Courses'],
  ['ai', Brain, 'AI Analysis'],
  ['cv', FileText, 'CV Review'],
  ['profile', UserRound, 'Cabinet'],
  ['admin', ClipboardList, 'Admin'],
]

const categories = ['All', 'STEM', 'Business', 'English', 'Programming', 'Social Impact', 'Finance', 'Science', 'University']
const formats = ['All', 'Online', 'Hybrid', 'Offline']
const allInterests = ['STEM', 'Business', 'English', 'Programming', 'Finance', 'Science', 'Social Impact', 'University']
const allGoals = ['Study abroad', 'Portfolio', 'Olympiads', 'Scholarships', 'Career exploration']
const emptySaved = []
const emptyProgress = {}

function daysLeft(date) {
  const today = new Date('2026-06-18T00:00:00')
  const due = new Date(`${date}T00:00:00`)
  return Math.ceil((due - today) / 86400000)
}

function matchScore(item, profile) {
  const tags = item.tags || []
  const interestHits = profile.interests.filter((interest) => tags.includes(interest)).length
  const goalHits = profile.goals.filter((goal) => tags.includes(goal)).length
  const gradeHit = item.grade?.includes(profile.grade) ? 1 : 0
  const base = 36 + interestHits * 18 + goalHits * 14 + gradeHit * 12
  return Math.min(98, base)
}

function classNames(...values) {
  return values.filter(Boolean).join(' ')
}

async function apiRequest(path, { token, method = 'GET', body } = {}) {
  const response = await fetch(path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const payload = response.status === 204 ? {} : await response.json()
  if (!response.ok) throw new Error(payload.message || 'Request failed')
  return payload
}

function buildAiAnalysis({ profile, opportunities, courses, saved, progress }) {
  const rankedOpportunities = [...opportunities].sort((a, b) => matchScore(b, profile) - matchScore(a, profile))
  const rankedCourses = [...courses].sort((a, b) => matchScore(b, profile) - matchScore(a, profile))
  const savedOpportunities = opportunities.filter((item) => saved.includes(item.id))
  const closeDeadlines = rankedOpportunities.filter((item) => daysLeft(item.deadline) <= 10)
  const completedLessons = Object.values(progress).reduce((sum, value) => sum + value, 0)
  const totalLessons = courses.reduce((sum, course) => sum + course.lessons.length, 0)
  const learningPercent = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0
  const profileDepth = profile.interests.length * 5 + profile.goals.length * 5 + (profile.school ? 8 : 0) + (profile.englishLevel ? 8 : 0)
  const readiness = Math.min(98, 34 + profileDepth + savedOpportunities.length * 7 + Math.round(learningPercent * 0.35))
  const strongestTags = [...new Set(rankedOpportunities.slice(0, 4).flatMap((item) => item.tags))].slice(0, 5)

  const risks = []
  if (savedOpportunities.length === 0) risks.push('No saved opportunities yet, so the roadmap is not anchored to real deadlines.')
  if (closeDeadlines.length > 0) risks.push(`${closeDeadlines.length} strong matches have deadlines within 10 days.`)
  if (learningPercent < 35) risks.push('Course progress is still low; finish one lesson before applying.')
  if (!profile.goals.includes('Portfolio')) risks.push('Portfolio goal is not selected, but most competitive programs reward project evidence.')

  const strengths = [
    `${profile.grade} grade profile is a good timing window for ${profile.goals[0] || 'growth planning'}.`,
    `${strongestTags.slice(0, 3).join(', ')} opportunities match the current interest map.`,
    `${profile.englishLevel} English level is enough for essay contests and international programs.`,
  ]

  const nextActions = [
    `Save and prepare for ${rankedOpportunities[0]?.title || 'the top recommended opportunity'}.`,
    `Complete the next lesson in ${rankedCourses[0]?.title || 'the recommended course'}.`,
    closeDeadlines[0]
      ? `Start the application checklist for ${closeDeadlines[0].title}; deadline is in ${daysLeft(closeDeadlines[0].deadline)} days.`
      : 'Choose one opportunity with a July deadline and create a preparation checklist.',
    'Update the cabinet with one project, award or activity that proves your fit.',
  ]

  const weeklyPlan = [
    ['Mon', 'Pick one top opportunity and read requirements.'],
    ['Tue', `Finish lesson: ${rankedCourses[0]?.lessons[0]?.title || 'recommended course lesson'}.`],
    ['Wed', 'Draft a 150-word motivation answer.'],
    ['Thu', 'Ask a mentor for feedback or improve the application checklist.'],
    ['Fri', 'Submit or save the next milestone in the cabinet.'],
  ]

  return {
    readiness,
    learningPercent,
    strongestTags,
    risks: risks.length ? risks : ['No critical risk found. Keep progressing weekly.'],
    strengths,
    nextActions,
    weeklyPlan,
    topOpportunity: rankedOpportunities[0],
    topCourse: rankedCourses[0],
  }
}

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('mh-token') || '')
  const [currentUser, setCurrentUser] = useState(null)
  const [bootStatus, setBootStatus] = useState('loading')
  const [activeTab, setActiveTab] = useState('dashboard')
  const [authMode, setAuthMode] = useState('login')
  const [authError, setAuthError] = useState('')
  const [opportunities, setOpportunities] = useState(starterOpportunities)
  const [courses, setCourses] = useState(starterCourses)
  const [adminStats, setAdminStats] = useState(null)
  const [cvInput, setCvInput] = useState('')
  const [cvFileName, setCvFileName] = useState('')
  const [cvError, setCvError] = useState('')
  const [cvLoading, setCvLoading] = useState(false)
  const [filters, setFilters] = useState({ category: 'All', format: 'All', query: '' })
  const [newOpportunity, setNewOpportunity] = useState({
    title: '',
    category: 'STEM',
    direction: 'Science',
    grade: '9-11',
    format: 'Online',
    deadline: '2026-07-30',
    requirements: 'Motivation note',
    description: '',
    applyUrl: '#',
    tags: ['STEM'],
  })

  const profile = currentUser?.profile || defaultProfile
  const saved = currentUser?.saved ?? emptySaved
  const progress = currentUser?.progress ?? emptyProgress

  useEffect(() => {
    let cancelled = false
    async function boot() {
      try {
        const payload = token
          ? await apiRequest('/api/me', { token })
          : await apiRequest('/api/bootstrap')
        if (cancelled) return
        setCurrentUser(payload.user || null)
        setOpportunities(payload.opportunities || [])
        setCourses(payload.courses || [])
        if (payload.user?.role === 'admin') {
          const stats = await apiRequest('/api/admin/stats', { token })
          if (!cancelled) setAdminStats(stats)
        }
        setBootStatus('ready')
      } catch {
        if (cancelled) return
        localStorage.removeItem('mh-token')
        setToken('')
        const payload = await apiRequest('/api/bootstrap')
        if (cancelled) return
        setCurrentUser(null)
        setOpportunities(payload.opportunities || [])
        setCourses(payload.courses || [])
        setBootStatus('ready')
      }
    }
    boot()
    return () => {
      cancelled = true
    }
  }, [token])

  const refreshAdminStats = async (authToken = token) => {
    if (!authToken || currentUser?.role !== 'admin') return
    const stats = await apiRequest('/api/admin/stats', { token: authToken })
    setAdminStats(stats)
  }

  const switchTab = async (tabId) => {
    setActiveTab(tabId)
    if (tabId === 'admin' && currentUser?.role === 'admin') await refreshAdminStats()
  }

  const updateProfile = async (nextProfile) => {
    setCurrentUser({ ...currentUser, profile: nextProfile })
    const payload = await apiRequest('/api/me/profile', { token, method: 'PATCH', body: nextProfile })
    setCurrentUser(payload.user)
  }

  const signIn = async ({ email, password }) => {
    try {
      const payload = await apiRequest('/api/auth/login', { method: 'POST', body: { email, password } })
      setAuthError('')
      setToken(payload.token)
      localStorage.setItem('mh-token', payload.token)
      setCurrentUser(payload.user)
      setOpportunities(payload.opportunities || [])
      setCourses(payload.courses || [])
      if (payload.user.role === 'admin') {
        const stats = await apiRequest('/api/admin/stats', { token: payload.token })
        setAdminStats(stats)
      }
      setActiveTab('dashboard')
    } catch (error) {
      setAuthError(`${error.message}. Try amina@mentoria.demo / demo123.`)
    }
  }

  const register = async ({ name, email, password, grade, country }) => {
    try {
      const payload = await apiRequest('/api/auth/register', {
        method: 'POST',
        body: { name, email, password, grade, country },
      })
      setAuthError('')
      setToken(payload.token)
      localStorage.setItem('mh-token', payload.token)
      setCurrentUser(payload.user)
      setOpportunities(payload.opportunities || [])
      setCourses(payload.courses || [])
      setActiveTab('profile')
    } catch (error) {
      setAuthError(error.message)
    }
  }

  const signOut = async () => {
    if (token) await apiRequest('/api/auth/logout', { token, method: 'POST' }).catch(() => {})
    localStorage.removeItem('mh-token')
    setToken('')
    setCurrentUser(null)
    setAdminStats(null)
    setActiveTab('dashboard')
  }

  const toggleSaved = async (id) => {
    const optimisticSaved = saved.includes(id) ? saved.filter((savedId) => savedId !== id) : [...saved, id]
    setCurrentUser({ ...currentUser, saved: optimisticSaved })
    const payload = await apiRequest('/api/me/saved', { token, method: 'PATCH', body: { opportunityId: id } })
    setCurrentUser(payload.user)
  }

  const completeLesson = async (courseId, totalLessons) => {
    const current = progress[courseId] || 0
    const completedLessons = Math.min(totalLessons, current + 1)
    setCurrentUser({ ...currentUser, progress: { ...progress, [courseId]: completedLessons } })
    const payload = await apiRequest('/api/me/progress', { token, method: 'PATCH', body: { courseId, completedLessons } })
    setCurrentUser(payload.user)
  }

  const addOpportunity = async (event) => {
    event.preventDefault()
    if (!newOpportunity.title.trim()) return
    const payload = await apiRequest('/api/admin/opportunities', { token, method: 'POST', body: newOpportunity })
    setOpportunities(payload.opportunities)
    setNewOpportunity({ ...newOpportunity, title: '', description: '' })
    await refreshAdminStats()
  }

  const removeOpportunity = async (id) => {
    const payload = await apiRequest(`/api/admin/opportunities/${id}`, { token, method: 'DELETE' })
    setOpportunities(payload.opportunities)
    await refreshAdminStats()
  }

  const addCourse = async () => {
    const payload = await apiRequest('/api/admin/courses', { token, method: 'POST' })
    setCourses(payload.courses)
    await refreshAdminStats()
  }

  const analyzeCv = async (event) => {
    event.preventDefault()
    setCvError('')
    setCvLoading(true)
    try {
      const payload = await apiRequest('/api/me/cv/analyze', {
        token,
        method: 'POST',
        body: { cvText: cvInput, fileName: cvFileName || 'Pasted CV' },
      })
      setCurrentUser(payload.user)
    } catch (error) {
      setCvError(error.message)
    } finally {
      setCvLoading(false)
    }
  }

  const recommendedOpportunities = useMemo(
    () => [...opportunities].sort((a, b) => matchScore(b, profile) - matchScore(a, profile)).slice(0, 5),
    [opportunities, profile],
  )

  const recommendedCourses = useMemo(
    () => [...courses].sort((a, b) => matchScore(b, profile) - matchScore(a, profile)).slice(0, 3),
    [courses, profile],
  )

  const filteredOpportunities = opportunities.filter((item) => {
    const matchesCategory = filters.category === 'All' || item.category === filters.category
    const matchesFormat = filters.format === 'All' || item.format === filters.format
    const text = `${item.title} ${item.description} ${item.tags.join(' ')}`.toLowerCase()
    return matchesCategory && matchesFormat && text.includes(filters.query.toLowerCase())
  })

  const savedOpportunities = opportunities.filter((item) => saved.includes(item.id))
  const urgentDeadlines = [...opportunities].sort((a, b) => daysLeft(a.deadline) - daysLeft(b.deadline)).slice(0, 4)
  const averageProgress = Math.round(
    courses.length
      ? courses.reduce((sum, course) => sum + ((progress[course.id] || 0) / course.lessons.length) * 100, 0) / courses.length
      : 0,
  )
  const aiAnalysis = useMemo(
    () => buildAiAnalysis({ profile, opportunities, courses, saved, progress }),
    [profile, opportunities, courses, saved, progress],
  )

  if (bootStatus === 'loading') {
    return (
      <div className="auth-shell">
        <section className="auth-copy">
          <div className="brand-lockup">
            <div className="brand-mark">
              <Compass size={24} />
            </div>
            <div>
              <strong>Mentoria</strong>
              <span>Compass</span>
            </div>
          </div>
          <p className="eyebrow">Starting product backend</p>
          <h1>Loading your workspace from the Mentoria Compass API.</h1>
        </section>
      </div>
    )
  }

  if (!currentUser) {
    return (
      <AuthScreen
        authMode={authMode}
        setAuthMode={setAuthMode}
        authError={authError}
        signIn={signIn}
        register={register}
      />
    )
  }

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Primary navigation">
        <div className="brand-lockup">
          <div className="brand-mark">
            <Compass size={24} />
          </div>
          <div>
            <strong>Mentoria</strong>
            <span>Compass</span>
          </div>
        </div>

        <nav>
          {tabs.map(([id, Icon, label]) => (
            <button key={id} className={classNames('nav-button', activeTab === id && 'active')} onClick={() => switchTab(id)}>
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-card">
          <Brain size={18} />
          <strong>AI readiness: {aiAnalysis.readiness}%</strong>
          <span>{aiAnalysis.topOpportunity?.title || 'Complete your profile'}</span>
        </div>
      </aside>

      <main>
        <Topbar profile={profile} averageProgress={averageProgress} user={currentUser} signOut={signOut} />
        {activeTab === 'dashboard' && (
          <Dashboard
            profile={profile}
            setActiveTab={setActiveTab}
            recommendedOpportunities={recommendedOpportunities}
            recommendedCourses={recommendedCourses}
            urgentDeadlines={urgentDeadlines}
            saved={saved}
            toggleSaved={toggleSaved}
            aiAnalysis={aiAnalysis}
          />
        )}
        {activeTab === 'opportunities' && (
          <Opportunities
            filters={filters}
            setFilters={setFilters}
            opportunities={filteredOpportunities}
            profile={profile}
            saved={saved}
            toggleSaved={toggleSaved}
          />
        )}
        {activeTab === 'courses' && <Courses courses={courses} profile={profile} progress={progress} completeLesson={completeLesson} />}
        {activeTab === 'ai' && (
          <AiAnalysis profile={profile} analysis={aiAnalysis} setActiveTab={setActiveTab} />
        )}
        {activeTab === 'cv' && (
          <CvReview
            user={currentUser}
            cvInput={cvInput}
            setCvInput={setCvInput}
            cvFileName={cvFileName}
            setCvFileName={setCvFileName}
            cvError={cvError}
            cvLoading={cvLoading}
            analyzeCv={analyzeCv}
          />
        )}
        {activeTab === 'profile' && (
          <StudentProfile
            user={currentUser}
            profile={profile}
            updateProfile={updateProfile}
            savedOpportunities={savedOpportunities}
            courses={courses}
            progress={progress}
            urgentDeadlines={urgentDeadlines}
            analysis={aiAnalysis}
          />
        )}
        {activeTab === 'admin' && (
          <AdminPanel
            user={currentUser}
            adminStats={adminStats}
            opportunities={opportunities}
            courses={courses}
            newOpportunity={newOpportunity}
            setNewOpportunity={setNewOpportunity}
            addOpportunity={addOpportunity}
            removeOpportunity={removeOpportunity}
            addCourse={addCourse}
            savedCount={saved.length}
          />
        )}
      </main>
    </div>
  )
}

function AuthScreen({ authMode, setAuthMode, authError, signIn, register }) {
  const [form, setForm] = useState({
    name: 'Amina',
    email: 'amina@mentoria.demo',
    password: 'demo123',
    grade: '10',
    country: 'Kazakhstan',
  })

  const submit = (event) => {
    event.preventDefault()
    if (authMode === 'login') signIn(form)
    else register(form)
  }

  return (
    <div className="auth-shell">
      <section className="auth-copy">
        <div className="brand-lockup">
          <div className="brand-mark">
            <Compass size={24} />
          </div>
          <div>
            <strong>Mentoria</strong>
            <span>Compass</span>
          </div>
        </div>
        <p className="eyebrow">Full product mode</p>
        <h1>Register, get AI analysis, and manage your own student cabinet.</h1>
        <div className="auth-proof-grid">
          <div>
            <ShieldCheck size={20} />
            <strong>Personal account</strong>
            <span>Progress, saved opportunities and profile are stored per user.</span>
          </div>
          <div>
            <Brain size={20} />
            <strong>AI analysis</strong>
            <span>Readiness score, risks, strengths and weekly action plan.</span>
          </div>
          <div>
            <Users size={20} />
            <strong>Admin view</strong>
            <span>Mentoria can add content and see user/product metrics.</span>
          </div>
        </div>
      </section>

      <section className="auth-card">
        <div className="auth-switch">
          <button className={authMode === 'login' ? 'active' : ''} onClick={() => setAuthMode('login')}>
            <LogIn size={17} /> Login
          </button>
          <button className={authMode === 'register' ? 'active' : ''} onClick={() => setAuthMode('register')}>
            <UserPlus size={17} /> Register
          </button>
        </div>
        <form onSubmit={submit} className="auth-form">
          {authMode === 'register' && (
            <label>
              Full name
              <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
            </label>
          )}
          <label>
            Email
            <span className="input-with-icon">
              <Mail size={17} />
              <input value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
            </span>
          </label>
          <label>
            Password
            <span className="input-with-icon">
              <Lock size={17} />
              <input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
            </span>
          </label>
          {authMode === 'register' && (
            <div className="form-grid two">
              <label>
                Grade
                <select value={form.grade} onChange={(event) => setForm({ ...form, grade: event.target.value })}>
                  {['8', '9', '10', '11'].map((grade) => <option key={grade}>{grade}</option>)}
                </select>
              </label>
              <label>
                Country
                <input value={form.country} onChange={(event) => setForm({ ...form, country: event.target.value })} />
              </label>
            </div>
          )}
          {authError && <p className="auth-error">{authError}</p>}
          <button className="primary-button full">
            {authMode === 'login' ? <LogIn size={17} /> : <UserPlus size={17} />}
            {authMode === 'login' ? 'Enter cabinet' : 'Create account'}
          </button>
        </form>
        <div className="demo-accounts">
          <button onClick={() => signIn({ email: 'amina@mentoria.demo', password: 'demo123' })}>Use student demo</button>
          <button onClick={() => signIn({ email: 'admin@mentoria.demo', password: 'admin123' })}>Use admin demo</button>
        </div>
      </section>
    </div>
  )
}

function Topbar({ profile, averageProgress, user, signOut }) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Working product build</p>
        <h1>Personal roadmap for opportunities and async learning</h1>
      </div>
      <div className="topbar-actions">
        <div className="student-chip">
          <div className="avatar">{profile.name.slice(0, 1)}</div>
          <div>
            <strong>{profile.name}</strong>
            <span>{user.email} / {user.role} / {averageProgress}% learning</span>
          </div>
        </div>
        <button className="icon-button" onClick={signOut} title="Log out">
          <LogOut size={18} />
        </button>
      </div>
    </header>
  )
}

function Dashboard({
  profile,
  setActiveTab,
  recommendedOpportunities,
  recommendedCourses,
  urgentDeadlines,
  saved,
  toggleSaved,
  aiAnalysis,
}) {
  return (
    <section className="page-grid">
      <div className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Mentoria Compass</p>
          <h2>{profile.name}, your next 14 days are already mapped.</h2>
          <p>
            The platform connects registration, student profile, AI analysis, opportunities, async courses and admin content management.
          </p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => setActiveTab('ai')}>
              <Brain size={18} /> Run AI analysis
            </button>
            <button className="secondary-button" onClick={() => setActiveTab('opportunities')}>
              <Search size={18} /> Find opportunities
            </button>
          </div>
        </div>
        <div className="readiness-panel">
          <span>AI readiness</span>
          <strong>{aiAnalysis.readiness}%</strong>
          <p>{aiAnalysis.nextActions[0]}</p>
          <div className="progress-track">
            <span style={{ width: `${aiAnalysis.readiness}%` }} />
          </div>
        </div>
      </div>

      <MetricRow
        metrics={[
          ['Profile matches', recommendedOpportunities.length, Target],
          ['Saved opportunities', saved.length, Star],
          ['Urgent deadlines', urgentDeadlines.filter((item) => daysLeft(item.deadline) <= 10).length, CalendarDays],
          ['Active courses', recommendedCourses.length, GraduationCap],
        ]}
      />

      <section className="content-column wide">
        <SectionTitle icon={Sparkles} title="Best matches" action="Profile + deadline scoring" />
        <div className="opportunity-list compact">
          {recommendedOpportunities.slice(0, 4).map((item) => (
            <OpportunityCard key={item.id} item={item} profile={profile} saved={saved.includes(item.id)} toggleSaved={toggleSaved} />
          ))}
        </div>
      </section>

      <section className="content-column">
        <SectionTitle icon={Brain} title="AI action plan" action={`${aiAnalysis.readiness}% readiness`} />
        <div className="action-stack">
          {aiAnalysis.nextActions.slice(0, 3).map((item) => <p key={item}>{item}</p>)}
        </div>
      </section>

      <section className="content-column">
        <SectionTitle icon={CalendarDays} title="Deadline radar" action="June-July 2026" />
        <div className="deadline-stack">
          {urgentDeadlines.map((item) => (
            <div className="deadline-row" key={item.id}>
              <span>{Math.max(daysLeft(item.deadline), 0)}d</span>
              <div>
                <strong>{item.title}</strong>
                <small>{item.deadline} / {item.format}</small>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  )
}

function MetricRow({ metrics }) {
  return (
    <div className="metric-row">
      {metrics.map(([label, value, Icon]) => (
        <div className="metric-card" key={label}>
          <Icon size={18} />
          <strong>{value}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  )
}

function Opportunities({ filters, setFilters, opportunities, profile, saved, toggleSaved }) {
  return (
    <section className="content-column">
      <SectionTitle icon={Filter} title="Opportunity catalog" action={`${opportunities.length} visible`} />
      <div className="filters">
        <label className="search-box">
          <Search size={17} />
          <input
            value={filters.query}
            onChange={(event) => setFilters({ ...filters, query: event.target.value })}
            placeholder="Search by keyword, tag or title"
          />
        </label>
        <select value={filters.category} onChange={(event) => setFilters({ ...filters, category: event.target.value })}>
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select value={filters.format} onChange={(event) => setFilters({ ...filters, format: event.target.value })}>
          {formats.map((item) => <option key={item}>{item}</option>)}
        </select>
      </div>
      <div className="opportunity-list">
        {opportunities.map((item) => (
          <OpportunityCard key={item.id} item={item} profile={profile} saved={saved.includes(item.id)} toggleSaved={toggleSaved} />
        ))}
      </div>
    </section>
  )
}

function OpportunityCard({ item, profile, saved, toggleSaved }) {
  const score = matchScore(item, profile)
  return (
    <article className="opportunity-card">
      <div className="card-topline">
        <span className="tag">{item.category}</span>
        <strong className="match">{score}% match</strong>
      </div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <div className="meta-grid">
        <span>{item.format}</span>
        <span>Grades {item.grade}</span>
        <span>{Math.max(daysLeft(item.deadline), 0)} days left</span>
        <span>{item.direction}</span>
      </div>
      <small className="requirements">{item.requirements}</small>
      <div className="card-actions">
        <button className={classNames('icon-button', saved && 'saved')} onClick={() => toggleSaved(item.id)} title="Save opportunity">
          <Star size={17} fill={saved ? 'currentColor' : 'none'} />
        </button>
        <a className="apply-link" href={item.applyUrl}>
          Apply <ChevronRight size={16} />
        </a>
      </div>
    </article>
  )
}

function Courses({ courses, profile, progress, completeLesson }) {
  return (
    <section className="course-grid">
      {courses.map((course) => {
        const done = progress[course.id] || 0
        const percent = Math.round((done / course.lessons.length) * 100)
        return (
          <article className="course-card" key={course.id} style={{ '--accent': course.accent }}>
            <div className="course-header">
              <span className="tag">{course.subject}</span>
              <strong>{matchScore(course, profile)}% match</strong>
            </div>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <div className="video-placeholder">
              <BookOpen size={28} />
              <span>Mentoria lesson video</span>
            </div>
            <div className="progress-track">
              <span style={{ width: `${percent}%` }} />
            </div>
            <div className="lesson-list">
              {course.lessons.map((lesson, index) => (
                <div className={classNames('lesson-row', index < done && 'done')} key={lesson.title}>
                  <CheckCircle2 size={17} />
                  <div>
                    <strong>{lesson.title}</strong>
                    <small>{lesson.task}</small>
                  </div>
                </div>
              ))}
            </div>
            <button className="primary-button full" onClick={() => completeLesson(course.id, course.lessons.length)}>
              Complete next lesson
            </button>
          </article>
        )
      })}
    </section>
  )
}

function AiAnalysis({ profile, analysis, setActiveTab }) {
  return (
    <section className="ai-layout">
      <div className="ai-score-card">
        <p className="eyebrow">AI student analysis</p>
        <h2>{analysis.readiness}% ready for matched opportunities</h2>
        <div className="score-ring" style={{ '--score': `${analysis.readiness}%` }}>
          <strong>{analysis.readiness}</strong>
          <span>/100</span>
        </div>
        <p>
          Based on grade {profile.grade}, interests, goals, saved opportunities, course progress and upcoming deadlines.
        </p>
        <button className="primary-button full" onClick={() => setActiveTab('profile')}>
          <UserRound size={17} /> Improve profile
        </button>
      </div>

      <div className="content-column">
        <SectionTitle icon={Sparkles} title="Strengths" action="Why this profile can win" />
        <div className="insight-list positive">
          {analysis.strengths.map((item) => <p key={item}>{item}</p>)}
        </div>
      </div>

      <div className="content-column">
        <SectionTitle icon={Target} title="Risks" action="Fix before applying" />
        <div className="insight-list warning">
          {analysis.risks.map((item) => <p key={item}>{item}</p>)}
        </div>
      </div>

      <div className="content-column wide">
        <SectionTitle icon={ClipboardList} title="AI next actions" action="Generated roadmap" />
        <div className="action-stack">
          {analysis.nextActions.map((item) => <p key={item}>{item}</p>)}
        </div>
      </div>

      <div className="content-column">
        <SectionTitle icon={CalendarDays} title="Weekly plan" action="5-day sprint" />
        <div className="week-plan">
          {analysis.weeklyPlan.map(([day, task]) => (
            <div key={day}>
              <span>{day}</span>
              <strong>{task}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CvReview({ user, cvInput, setCvInput, cvFileName, setCvFileName, cvError, cvLoading, analyzeCv }) {
  const latestReview = user.cvReviews?.[0]

  const handleFile = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setCvFileName(file.name)
    const text = await file.text()
    setCvInput(text)
  }

  return (
    <section className="cv-layout">
      <div className="content-column">
        <SectionTitle icon={Upload} title="Upload CV" action="Server-side review" />
        <form className="cv-form" onSubmit={analyzeCv}>
          <label className="file-drop">
            <Upload size={22} />
            <strong>{cvFileName || 'Choose CV file'}</strong>
            <span>TXT, MD or copied text works best for instant analysis.</span>
            <input type="file" accept=".txt,.md,.text,.csv,.pdf,.doc,.docx" onChange={handleFile} />
          </label>
          <label>
            CV text
            <textarea
              className="cv-textarea"
              value={cvInput}
              onChange={(event) => setCvInput(event.target.value)}
              placeholder="Paste your CV here if the file format cannot be read as text."
            />
          </label>
          {cvError && <p className="auth-error">{cvError}</p>}
          <button className="primary-button full" disabled={cvLoading}>
            <Brain size={17} /> {cvLoading ? 'Analyzing CV...' : 'Analyze CV'}
          </button>
        </form>
      </div>

      <div className="cv-score-card">
        <p className="eyebrow">CV readiness</p>
        <h2>{latestReview ? `${latestReview.score}% application-ready` : 'No CV analyzed yet'}</h2>
        <div className="score-ring" style={{ '--score': `${latestReview?.score || 0}%` }}>
          <strong>{latestReview?.score || 0}</strong>
          <span>/100</span>
        </div>
        <p>{latestReview?.summary || 'Upload a CV to find missing sections, weak evidence and concrete edits.'}</p>
        {latestReview && (
          <div className="cv-meta">
            <span>{latestReview.fileName}</span>
            <span>{latestReview.wordCount} words</span>
          </div>
        )}
      </div>

      {latestReview && (
        <>
          <div className="content-column">
            <SectionTitle icon={Target} title="Gaps" action="Fix these first" />
            <div className="insight-list warning">
              {latestReview.gaps.map((item) => <p key={item}>{item}</p>)}
            </div>
          </div>

          <div className="content-column">
            <SectionTitle icon={Sparkles} title="How to improve" action="Concrete edits" />
            <div className="insight-list positive">
              {latestReview.improvements.map((item) => <p key={item}>{item}</p>)}
            </div>
          </div>

          <div className="content-column wide">
            <SectionTitle icon={Edit3} title="Rewrite weak bullets" action="Before and after" />
            <div className="rewrite-stack">
              {latestReview.rewriteExamples.length ? latestReview.rewriteExamples.map((item) => (
                <div key={item.before}>
                  <small>Before</small>
                  <p>{item.before}</p>
                  <small>After</small>
                  <strong>{item.after}</strong>
                </div>
              )) : <p className="muted-text">No weak bullet examples detected. Add more project bullets for deeper rewriting.</p>}
            </div>
          </div>

          <div className="content-column">
            <SectionTitle icon={CheckCircle2} title="Strengths" action="Keep these" />
            <div className="insight-list">
              {latestReview.strengths.map((item) => <p key={item}>{item}</p>)}
            </div>
          </div>
        </>
      )}
    </section>
  )
}

function StudentProfile({ user, profile, updateProfile, savedOpportunities, courses, progress, urgentDeadlines, analysis }) {
  const toggleArrayValue = (field, value) => {
    const current = profile[field]
    const next = current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    updateProfile({ ...profile, [field]: next })
  }

  return (
    <section className="profile-layout">
      <div className="content-column">
        <SectionTitle icon={UserRound} title="Student registration data" action={user.email} />
        <div className="form-grid">
          <label>
            Name
            <input value={profile.name} onChange={(event) => updateProfile({ ...profile, name: event.target.value })} />
          </label>
          <label>
            Grade
            <select value={profile.grade} onChange={(event) => updateProfile({ ...profile, grade: event.target.value })}>
              {['8', '9', '10', '11'].map((grade) => <option key={grade}>{grade}</option>)}
            </select>
          </label>
          <label>
            Country
            <input value={profile.country} onChange={(event) => updateProfile({ ...profile, country: event.target.value })} />
          </label>
          <label>
            School
            <input value={profile.school} onChange={(event) => updateProfile({ ...profile, school: event.target.value })} />
          </label>
          <label>
            English level
            <select value={profile.englishLevel} onChange={(event) => updateProfile({ ...profile, englishLevel: event.target.value })}>
              {['A2', 'B1', 'B2', 'C1'].map((level) => <option key={level}>{level}</option>)}
            </select>
          </label>
          <label>
            Account role
            <input value={user.role} disabled />
          </label>
        </div>
        <ChipPicker title="Interests" values={allInterests} selected={profile.interests} onToggle={(value) => toggleArrayValue('interests', value)} />
        <ChipPicker title="Goals" values={allGoals} selected={profile.goals} onToggle={(value) => toggleArrayValue('goals', value)} />
      </div>
      <div className="content-column">
        <SectionTitle icon={Award} title="Personal cabinet" action={`${analysis.readiness}% AI readiness`} />
        <div className="cabinet-block">
          <h3>Saved opportunities</h3>
          {savedOpportunities.length ? savedOpportunities.map((item) => <p key={item.id}>{item.title}</p>) : <p>No saved items yet.</p>}
        </div>
        <div className="cabinet-block">
          <h3>Learning progress</h3>
          {courses.map((course) => (
            <CourseMini key={course.id} course={course} progress={progress[course.id] || 0} />
          ))}
        </div>
        <div className="cabinet-block">
          <h3>Upcoming deadlines</h3>
          {urgentDeadlines.slice(0, 3).map((item) => <p key={item.id}>{item.deadline} / {item.title}</p>)}
        </div>
      </div>
    </section>
  )
}

function AdminPanel({
  user,
  adminStats,
  opportunities,
  courses,
  newOpportunity,
  setNewOpportunity,
  addOpportunity,
  removeOpportunity,
  addCourse,
  savedCount,
}) {
  if (user.role !== 'admin') {
    return (
      <section className="content-column">
        <SectionTitle icon={ShieldCheck} title="Admin panel" action="Restricted" />
        <p className="muted-text">This area is visible to students for demo transparency, but editing is available only for admin accounts.</p>
        <p className="muted-text">Use admin@mentoria.demo / admin123 to test content management.</p>
      </section>
    )
  }

  return (
    <section className="admin-layout">
      <div className="content-column">
        <SectionTitle icon={Plus} title="Admin: add opportunity" action="No rebuild needed" />
        <form className="admin-form" onSubmit={addOpportunity}>
          <input value={newOpportunity.title} onChange={(event) => setNewOpportunity({ ...newOpportunity, title: event.target.value })} placeholder="Opportunity title" />
          <textarea value={newOpportunity.description} onChange={(event) => setNewOpportunity({ ...newOpportunity, description: event.target.value })} placeholder="Short description" />
          <div className="form-grid">
            <select value={newOpportunity.category} onChange={(event) => setNewOpportunity({ ...newOpportunity, category: event.target.value })}>
              {categories.filter((item) => item !== 'All').map((item) => <option key={item}>{item}</option>)}
            </select>
            <select value={newOpportunity.format} onChange={(event) => setNewOpportunity({ ...newOpportunity, format: event.target.value })}>
              {formats.filter((item) => item !== 'All').map((item) => <option key={item}>{item}</option>)}
            </select>
            <input type="date" value={newOpportunity.deadline} onChange={(event) => setNewOpportunity({ ...newOpportunity, deadline: event.target.value })} />
          </div>
          <button className="primary-button">
            <Save size={17} /> Publish opportunity
          </button>
        </form>
      </div>

      <div className="content-column">
        <SectionTitle icon={BarChart3} title="Admin overview" action="Scale Mentoria" />
        <MetricRow
          metrics={[
            ['Opportunities', opportunities.length, ClipboardList],
            ['Courses', courses.length, BookOpen],
            ['Saved items', adminStats?.totals?.saved ?? savedCount, Star],
            ['Users', adminStats?.totals?.users ?? 0, Users],
          ]}
        />
        <button className="secondary-button full" onClick={addCourse}>
          <Plus size={17} /> Add course through API
        </button>
        {adminStats?.users?.length > 0 && (
          <div className="admin-list">
            {adminStats.users.slice(0, 4).map((student) => (
              <div className="admin-row" key={student.id}>
                <UserRound size={16} />
                <div>
                  <strong>{student.profile.name}</strong>
                  <small>{student.email} / {student.role}</small>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="admin-list">
          {opportunities.slice(0, 7).map((item) => (
            <div className="admin-row" key={item.id}>
              <Edit3 size={16} />
              <div>
                <strong>{item.title}</strong>
                <small>{item.category} / {item.deadline}</small>
              </div>
              <button className="icon-button danger" onClick={() => removeOpportunity(item.id)} title="Delete opportunity">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SectionTitle({ icon: Icon, title, action }) {
  return (
    <div className="section-title">
      <div>
        <Icon size={19} />
        <h2>{title}</h2>
      </div>
      <span>{action}</span>
    </div>
  )
}

function CourseMini({ course, progress }) {
  const percent = Math.round((progress / course.lessons.length) * 100)
  return (
    <div className="course-mini">
      <div>
        <strong>{course.title}</strong>
        <small>{progress}/{course.lessons.length} lessons complete</small>
      </div>
      <span>{percent}%</span>
    </div>
  )
}

function ChipPicker({ title, values, selected, onToggle }) {
  return (
    <div className="chip-picker">
      <h3>{title}</h3>
      <div>
        {values.map((value) => (
          <button key={value} className={classNames('chip', selected.includes(value) && 'active')} onClick={() => onToggle(value)}>
            {value}
          </button>
        ))}
      </div>
    </div>
  )
}

export default App
