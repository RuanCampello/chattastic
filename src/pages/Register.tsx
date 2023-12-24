'use client'
import InputSection from '@/components/inputSection'
import { ImageSquare } from '@phosphor-icons/react'

export default function Register() {
  return (
    <div className='bg-ultra-violet w-screen h-screen flex justify-center items-center text-savoy-blue'>
      <form className='flex flex-col w-96 h-fit rounded-lg p-8 bg-gray-100'>
        <h1 className='text-3xl font-bold mb-8 self-center'>Register</h1>
        <div className='flex flex-col gap-4'>
          <InputSection placeholder='Name'/>
          <InputSection placeholder='E-mail'/>
          <InputSection placeholder='Password' type='password'/>
          <input className='hidden' type='file' id='file'/>
          <label className='cursor-pointer flex items-center text-sm gap-1' htmlFor='file'>
            <ImageSquare weight='duotone' size={32}/>
            <span>Add an avatar</span>
          </label>
        </div>
        <button type='submit' className='bg-savoy-blue text-slate-50 hover:bg-ultra-violet w-full text-lg font-bold h-auto p-2 rounded-full mt-4 self-center'>
          Sign Up
        </button>
        <span className='my-2'>You already have an account? <a href='#' className='underline'>Login</a></span>
      </form>
    </div>
  )
}