'use client'
import { Form } from '@/components/Form'
import MenuWrapper from '@/components/menuwrapper'
import { auth } from '@/firebase'
import { Eye, EyeClosed } from '@phosphor-icons/react'
import { FirebaseError } from 'firebase/app'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Login() {
  const [isVisible, setIsVisible] = useState(false)
  const [error, setError] = useState<FirebaseError | String>()
  const router = useRouter()
  
  async function handleSubmit(e: any) {
    e.preventDefault()

    const email = e.target.email.value
    const password = e.target.password.value
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.replace('/')
    } catch (error) {
      if(error instanceof FirebaseError) setError(error.code)
    }
  }
  function handleForgotPassword() {
    router.replace('/forgotpassword')
  }
  return (
    <MenuWrapper>
      <Form.Root onSubmitFunction={() => handleSubmit}>
        <Form.Header title='Nice to see you again' />
        <div className='flex flex-col gap-4'>
          <input
           className='w-full p-3 rounded-md focus:outline-none bg-slate-200 text-savoy-blue font-medium border invalid:border-indian-red' 
           placeholder='E-mail' 
           type='email' 
           name='email'/>
          <div className='flex flex-col'>
            <div className='relative items-center flex w-full'>
              <input 
              className='p-3 bg-slate-200 w-full focus:outline-none border rounded-md invalid:border-indian-red' 
              type={isVisible ? 'text' : 'password'} 
              name='password'
              minLength={6}
              placeholder='Password' />
              <div 
              onClick={() => setIsVisible(!isVisible)} 
              className='absolute right-1 cursor-pointer hover:bg-slate-300 rounded-full p-2 transition duration-300 ease-in-out z-10 bg-slate-200' >
                {isVisible ? <Eye weight='duotone' size={24}/> : <EyeClosed weight='duotone' size={24}/>}
              </div>
            </div>
            <button
             onClick={() => handleForgotPassword()}
             className='text-end text-neon-blue hover:underline text-sm mt-2 font-medium'>
              forgot password?
            </button>
          </div>
        </div>
        <Form.Button title='Sign in'/>
        <Form.Link title='Register' text='Don&apos;t have an account?' path='/register' />
      </Form.Root>
    </MenuWrapper>
  )
}