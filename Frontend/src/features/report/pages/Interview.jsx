import React, { useState, useEffect } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate, useParams } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth.js'

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
    { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
    { id: 'roadmap', label: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
]

const scoreRingClass = (score) => {
    if (score >= 80) return 'border-emerald-500'
    if (score >= 60) return 'border-amber-500'
    return 'border-rose-500'
}

const skillTagClass = (severity) => {
    if (severity === 'high') return 'border-rose-300 bg-rose-50 text-rose-700'
    if (severity === 'medium') return 'border-amber-300 bg-amber-50 text-amber-700'
    return 'border-emerald-300 bg-emerald-50 text-emerald-700'
}

const QuestionCard = ({ item, index }) => {
    const [ open, setOpen ] = useState(false)
    return (
        <div className='overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition hover:border-slate-300'>
            <div className='flex cursor-pointer items-start gap-3 px-4 py-3 select-none' onClick={() => setOpen(o => !o)}>
                <span className='mt-0.5 shrink-0 rounded-md border border-pink-200 bg-pink-50 px-2 py-0.5 text-[11px] font-bold text-pink-600'>Q{index + 1}</span>
                <p className='flex-1 text-sm font-medium leading-relaxed text-slate-900'>{item.question}</p>
                <span className={`mt-0.5 shrink-0 text-slate-500 transition ${open ? 'rotate-180 text-pink-600' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </div>
            {open && (
                <div className='flex flex-col gap-3 border-t border-slate-200 px-4 py-3'>
                    <div className='flex flex-col gap-1.5'>
                        <span className='w-fit rounded border border-violet-200 bg-violet-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-violet-700'>Intention</span>
                        <p className='text-sm leading-relaxed text-slate-700'>{item.intention}</p>
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        <span className='w-fit rounded border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-emerald-700'>Model Answer</span>
                        <p className='text-sm leading-relaxed text-slate-700'>{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day }) => (
    <div className='relative flex flex-col gap-2 py-3 pl-12'>
        <span className='absolute top-4 left-5.5 h-3.5 w-3.5 rounded-full border-2 border-pink-500 bg-white' />
        <div className='flex items-center gap-2'>
            <span className='rounded-full border border-pink-200 bg-pink-50 px-2 py-0.5 text-xs font-bold text-pink-700'>Day {day.day}</span>
            <h3 className='text-base font-semibold text-slate-900'>{day.focus}</h3>
        </div>
        <ul className='flex flex-col gap-1'>
            {day.tasks.map((task, i) => (
                <li key={i} className='flex items-start gap-2 text-sm leading-relaxed text-slate-700'>
                    <span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400' />
                    {task}
                </li>
            ))}
        </ul>
    </div>
)

// ── Main Component ────────────────────────────────────────────────────────────
const Interview = () => {
    const [ activeNav, setActiveNav ] = useState('technical')
    const { report, getReportById, loading } = useInterview()
    const { handleLogout } = useAuth()
    const { interviewId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        }
    }, [ interviewId ])

    useEffect(() => {
        if (report?.title) {
            document.title = `${report.title} | Resume Report`
        } else if (!loading) {
            document.title = "Interview Plan | Resume Report"
        }
    }, [report, loading])
    // console.log(report)


    if (loading || !report) {
        return (
            <main className='flex min-h-screen items-center justify-center bg-slate-100 px-6'>
                <h1 className='text-xl font-semibold text-slate-700'>Loading your interview plan...</h1>
            </main>
        )
    }
    const technicalQuestions = report.technicalQuestions || []
    const behavioralQuestions = report.behavioralQuestions || []
    const roadmap = report.roadmap || []
    const skillGaps = report.skillGaps || []
    const matchScore = typeof report.matchScore === 'number' ? report.matchScore : 0

    const onLogoutClick = async () => {
        await handleLogout();
        navigate('/login');
    }

    return (
        <div className='min-h-screen bg-slate-100 p-4 sm:p-6'>
            <div className='mx-auto flex w-full max-w-7xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:h-[calc(100vh-3rem)] lg:flex-row'>
                <nav className='flex w-full flex-col justify-between gap-3 border-b border-slate-200 p-4 lg:w-55 lg:border-r lg:border-b-0'>
                    <div>
                        <p className='mb-2 px-2 text-[11px] font-semibold uppercase tracking-widest text-slate-500'>Sections</p>
                        {NAV_ITEMS.map(item => (
                            <button
                                key={item.id}
                                className={`mb-1 flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition ${activeNav === item.id ? 'bg-pink-50 text-pink-600' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                                onClick={() => setActiveNav(item.id)}
                            >
                                <span className='shrink-0'>{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={onLogoutClick}
                        className='inline-flex items-center justify-center rounded-2xl bg-pink-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-pink-700 active:scale-95' >
                        <svg className='mr-2 h-3.5 w-3.5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path></svg>
                        Logout
                    </button>
                </nav>

                <main className='min-h-100 flex-1 overflow-y-auto border-b border-slate-200 p-4 pb-16 sm:p-6 lg:border-r lg:border-b-0'>
                    {activeNav === 'technical' && (
                        <section>
                            <div className='mb-5 flex items-center gap-3 border-b border-slate-200 pb-3'>
                                <h2 className='text-2xl font-bold text-slate-900'>Technical Questions</h2>
                                <span className='rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600'>{technicalQuestions.length} questions</span>
                            </div>
                            <div className='flex flex-col gap-3'>
                                {technicalQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'behavioral' && (
                        <section>
                            <div className='mb-5 flex items-center gap-3 border-b border-slate-200 pb-3'>
                                <h2 className='text-2xl font-bold text-slate-900'>Behavioral Questions</h2>
                                <span className='rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600'>{behavioralQuestions.length} questions</span>
                            </div>
                            <div className='flex flex-col gap-3'>
                                {behavioralQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'roadmap' && (
                        <section>
                            <div className='mb-5 flex items-center gap-3 border-b border-slate-200 pb-3'>
                                <h2 className='text-2xl font-bold text-slate-900'>Preparation Road Map</h2>
                                <span className='rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600'>{roadmap.length}-day plan</span>
                            </div>
                            <div className='relative'>
                                <div className='absolute top-0 bottom-0 left-7 w-0.5 rounded bg-linear-to-b from-pink-500 to-pink-100' />
                                {roadmap.map((day) => (
                                    <RoadMapDay key={day.day} day={day} />
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                <aside className='w-full p-4 sm:p-6 lg:w-60'>
                    <div className='flex flex-col items-center gap-2'>
                        <p className='self-start text-xs font-semibold uppercase tracking-widest text-slate-500'>Match Score</p>
                        <div className={`flex h-22.5 w-22.5 flex-col items-center justify-center rounded-full border-4 ${scoreRingClass(matchScore)}`}>
                            <span className='text-3xl font-extrabold leading-none text-slate-900'>{report.matchScore}</span>
                            <span className='-mt-0.5 text-xs text-slate-500'>%</span>
                        </div>
                        <p className='text-center text-xs text-emerald-600'>Strong match for this role</p>
                    </div>

                    <div className='my-5 h-px bg-slate-200' />

                    <div className='flex flex-col gap-3'>
                        <p className='text-xs font-semibold uppercase tracking-widest text-slate-500'>Skill Gaps</p>
                        <div className='flex flex-wrap gap-2'>
                            {skillGaps.map((gap, i) => (
                                <span key={i} className={`rounded-md border px-2.5 py-1 text-xs font-medium ${skillTagClass(gap.severity)}`}>
                                    {gap.skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Interview