import React, { useState, useRef,useEffect } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'
import { logout } from '../../auth/services/auth.api.js'

const Home = () => {

    const { loading, generateReport,reports } = useInterview()
    const [ jobDescription, setJobDescription ] = useState("")
    const [ selfDescription, setSelfDescription ] = useState("")
    const [resumeFilename, setResumeFilename] = useState("")
    const [isUploading, setIsUploading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const resumeInputRef = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        document.title = "Create Interview Plan | Resume Report"
    }, [])

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    }

    const handleGenerateReport = async () => {
        try {
            setErrorMessage("")
            const resumeFile = resumeInputRef.current.files[ 0 ]
            const data = await generateReport({ jobDescription, selfDescription, resumeFile })
            navigate(`/${data._id}`)
        } catch (error) {
            console.error('Error generating report:', error)
            setErrorMessage("Failed to generate interview report. Please try again.")
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) {
            setResumeFilename('')
            setIsUploading(false)
            return
        }

        // Start upload state
        setIsUploading(true)
        
        // Add delay to allow proper file processing (500ms)
        setTimeout(() => {
            setResumeFilename(file.name)
            setIsUploading(false)
        }, 5000)
    }

    const hasResume = Boolean(resumeFilename)

    if (loading) {
        return (
            <main className='flex min-h-screen items-center justify-center bg-slate-100 px-6'>
                <h1 className='text-xl font-semibold text-slate-700'>Loading...</h1>
            </main>
        )
    }

    return (
        <div className='min-h-screen bg-slate-100 px-4 py-6 text-slate-900 sm:px-6 lg:px-8'>
            <div className='mx-auto flex w-full max-w-6xl flex-col gap-6'>

            <header className='flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-start sm:justify-between'>
                <div className='min-w-0 flex-1'>
                    <h1 className='text-3xl font-bold leading-tight sm:text-4xl'>Create Your Custom <span className='text-pink-600'>Interview Plan</span></h1>
                    <p className='mt-2 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base'>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
                </div>
                <button onClick={handleLogout} className='inline-flex items-center justify-center rounded-2xl bg-pink-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-pink-700 active:scale-95'>
                    <svg className='mr-2 h-3.5 w-3.5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path></svg>
                    Logout
                </button>
            </header>

            {errorMessage && (
                <div className='w-full rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-center font-medium text-rose-700 shadow-sm'>
                    {errorMessage}
                </div>
            )}

            <div className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
                <div className='grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr]'>
                    <div className='relative flex min-h-107.5 flex-col gap-4 p-5 sm:p-6'>
                        <div className='mb-1 flex items-center gap-2'>
                            <span className='text-pink-600'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                            </span>
                            <h2 className='flex-1 text-base font-semibold text-slate-900'>Target Job Description</h2>
                            <span className='rounded-md border border-rose-200 bg-rose-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-rose-600'>Required</span>
                        </div>
                        <textarea
                            onChange={(e) => { setJobDescription(e.target.value) }}
                            className='h-full min-h-75 w-full resize-none rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-200'
                            placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                            maxLength={5000}
                        />
                        <div className='absolute bottom-9 right-9 text-xs text-slate-500'>{jobDescription.length} / 5000 chars</div>
                    </div>

                    <div className='hidden w-px bg-slate-200 lg:block' />

                    <div className='flex flex-col gap-4 p-5 sm:p-6'>
                        <div className='mb-1 flex items-center gap-2'>
                            <span className='text-pink-600'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            </span>
                            <h2 className='flex-1 text-base font-semibold text-slate-900'>Your Profile</h2>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='mb-1 flex items-center gap-2 text-sm font-semibold text-slate-800'>
                                Upload Resume
                                <span className='rounded-md border border-pink-200 bg-pink-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-pink-600'>Best Results</span>
                            </label>
                            <label className={`flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed px-4 py-7 text-center transition ${hasResume ? 'border-pink-400 bg-pink-50' : 'border-slate-300 bg-slate-50 hover:border-pink-400 hover:bg-pink-50'}`} htmlFor='resume'>
                                <span className='mb-1 text-pink-600'>
                                    {isUploading ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10" />
                                            <polyline points="12 6 12 12 16 14" />
                                        </svg>
                                    ) : hasResume ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="16 16 12 12 8 16" />
                                            <line x1="12" y1="12" x2="12" y2="21" />
                                            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                                        </svg>
                                    )}
                                </span>
                                <p className='text-sm font-semibold text-slate-800'>{isUploading ? 'Uploading...' : 'Click to upload or drag & drop'}</p>
                                <p className='text-xs text-slate-500'>{isUploading ? 'Please wait...' : 'PDF or DOCX (Max 5MB)'}</p>
                                <input ref={resumeInputRef} hidden type='file' id='resume' name='resume' accept='.pdf,.docx' onChange={handleFileChange} disabled={isUploading}/>
                            </label>
                            {hasResume && (
                                <div className='text-xs text-slate-600'>
                                    Uploaded: <strong>{resumeFilename}</strong>
                                </div>
                            )}
                        </div>

                        <div className='flex items-center gap-3 text-xs text-slate-500'>
                            <div className='h-px flex-1 bg-slate-200' />
                            <span>OR</span>
                            <div className='h-px flex-1 bg-slate-200' />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='text-sm font-semibold text-slate-800' htmlFor='selfDescription'>Quick Self-Description</label>
                            <textarea
                                onChange={(e) => { setSelfDescription(e.target.value) }}
                                id='selfDescription'
                                name='selfDescription'
                                className='h-24 resize-none rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-200'
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                            />
                        </div>

                        <div className='flex items-start gap-2 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3'>
                            <span className='mt-0.5 shrink-0 text-sky-600'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" stroke="#1a1f27" strokeWidth="2" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="#1a1f27" strokeWidth="2" /></svg>
                            </span>
                            <p className='text-xs leading-relaxed text-sky-800'>Either a <strong className='font-semibold text-slate-900'>Resume</strong> or a <strong className='font-semibold text-slate-900'>Self Description</strong> is required to generate a personalized plan.</p>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6'>
                    <span className='text-xs text-slate-500'>AI-Powered Strategy Generation &bull; Approx 30s</span>
                    <button
                        onClick={handleGenerateReport}
                        disabled={loading || isUploading}
                        className='inline-flex items-center justify-center gap-2 rounded-xl bg-pink-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                        {loading || isUploading ? 'Processing...' : 'Generate My Interview Strategy'}
                    </button>
                </div>
            </div>

            {reports.length > 0 && (
                <section className='flex w-full flex-col gap-3'>
                    <h2 className='text-3xl font-bold text-slate-900'>My Recent Interview Plans</h2>
                    <ul className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4'>
                        {reports.map(report => (
                            <li key={report._id} className='flex cursor-pointer flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-pink-300 hover:shadow-md' onClick={() => navigate(`/${report._id}`)}>
                                <h3 className='text-xl font-bold leading-tight text-slate-900'>{report.title || 'Untitled Position'}</h3>
                                <p className='text-sm text-slate-600'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                <p className={`text-sm font-semibold ${report.matchScore >= 80 ? 'text-emerald-600' : report.matchScore >= 60 ? 'text-amber-600' : 'text-rose-600'}`}>Match Score: {report.matchScore}%</p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <footer className='mt-2 flex flex-wrap gap-5 text-sm text-slate-500'>
                <a className='transition hover:text-slate-800' href='#'>Privacy Policy</a>
                <a className='transition hover:text-slate-800' href='#'>Terms of Service</a>
                <a className='transition hover:text-slate-800' href='#'>Help Center</a>
            </footer>
            </div>
        </div>
    )
}

export default Home