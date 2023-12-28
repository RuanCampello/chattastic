'use client'
import InputSection from '@/components/inputSection'
import { auth } from '@/firebase'
import { Eye, EyeClosed } from '@phosphor-icons/react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Login() {
  const [isVisible, setIsVisible] = useState(false)
  const [error, setError] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: any) {
    e.preventDefault()

    const email = e.target.email.value
    const password = e.target.password.value
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.replace('/')
    } catch (error) {
      setError(true)
    }
  }
  return (
    <div className='bg-ultra-violet w-screen h-screen flex justify-center items-center text-savoy-blue'>
      <form onSubmit={handleSubmit} className='flex flex-col w-96 h-fit rounded-lg p-8 bg-gray-100'>
        <h1 className='text-3xl font-bold mb-8 self-center'>Login</h1>
        <div className='flex flex-col gap-4'>
          <InputSection name='email' placeholder='E-mail'/>
          <div className='flex items-center w-full relative'>
            <input className='p-3 bg-slate-200 w-full focus:outline-none' type={isVisible ? 'text' : 'password'} name='password' placeholder='Password' />
            <div onClick={e => setIsVisible(!isVisible)} className='absolute right-1 cursor-pointer hover:bg-slate-300 rounded-full p-2' >
              {isVisible ? <Eye weight='duotone' size={24}/> : <EyeClosed weight='duotone' size={24}/>}
            </div>
          </div>
        </div>
        <button type='submit' className='bg-savoy-blue text-slate-50 hover:bg-ultra-violet w-full text-lg font-bold h-auto p-2 rounded-full mt-4 self-center'>
          Login
        </button>
        <span className='my-2'>You don&apos;t have an account ? <Link className='underline' href={'/register'} >Register</Link></span>
      </form>
    </div>
  )
}