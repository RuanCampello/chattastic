'use client'
import InputSection from '@/components/inputSection'

export default function Login() {
  return (
    <div className='bg-ultra-violet w-screen h-screen flex justify-center items-center text-savoy-blue'>
      <form className='flex flex-col w-96 h-fit rounded-lg p-8 bg-gray-100'>
        <h1 className='text-3xl font-bold mb-8 self-center'>Login</h1>
        <div className='flex flex-col gap-4'>
          <InputSection placeholder='E-mail'/>
          <InputSection placeholder='Password' type='password'/>
        </div>
        <button type='submit' className='bg-savoy-blue text-slate-50 hover:bg-ultra-violet w-full text-lg font-bold h-auto p-2 rounded-full mt-4 self-center'>
          Login
        </button>
        <span className='my-2'>You don't have an account ? <a href='#' className='underline'>Register</a></span>
      </form>
    </div>
  )
}