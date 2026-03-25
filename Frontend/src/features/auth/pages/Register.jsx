import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {

    const navigate = useNavigate()
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const {loading,handleRegister} = useAuth()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRegister({username,email,password})
        navigate("/")
    }

    if(loading){
        return (
            <main className='flex min-h-screen items-center justify-center bg-slate-100 px-6'>
                <h1 className='text-xl font-semibold text-slate-700'>Loading.......</h1>
            </main>
        )
    }

    return (
        <main className='flex min-h-screen items-center justify-center bg-slate-100 px-6'>
            <div className='w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-sm'>
                <h1 className='mb-5 text-4xl font-bold text-slate-900'>Register</h1>

                <form onSubmit={handleSubmit}>

                    <div className='mb-4 flex flex-col gap-2'>
                        <label className='text-sm font-medium text-slate-700' htmlFor='username'>Username</label>
                        <input
                            className='w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200'
                            onChange={(e) => { setUsername(e.target.value) }}
                            type="text" id="username" name='username' placeholder='Enter username' />
                    </div>
                    <div className='mb-4 flex flex-col gap-2'>
                        <label className='text-sm font-medium text-slate-700' htmlFor='email'>Email</label>
                        <input
                            className='w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200'
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email" id="email" name='email' placeholder='Enter email address' />
                    </div>
                    <div className='mb-5 flex flex-col gap-2'>
                        <label className='text-sm font-medium text-slate-700' htmlFor='password'>Password</label>
                        <input
                            className='w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200'
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password" id="password" name='password' placeholder='Enter password' />
                    </div>

                    <button className='w-full rounded-2xl bg-pink-600 px-6 py-3 font-semibold text-white transition hover:bg-pink-700 active:scale-95' >Register</button>

                </form>

                <p className='mt-5 text-base text-slate-700'>Already have an account? <Link className='font-semibold text-pink-600 hover:text-pink-700' to={"/login"} >Login</Link> </p>
            </div>
        </main>
    )
}

export default Register