'use client'
import { Form } from '@/components/Form'
import { Input } from '@/components/Input'
import MenuWrapper from '@/components/menuwrapper'
import { auth } from '@/firebase'
import { EnvelopeSimple, Password } from '@phosphor-icons/react'
import { FirebaseError } from 'firebase/app'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Login() {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<FirebaseError | String>()
  const router = useRouter()

  const toogleVisibly = () => setIsVisible(!isVisible)
  
  
  async function handleSubmit(e: any) {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    if(!email || !password) return
    setIsLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.replace('/')
    } catch (error) {
      if(error instanceof FirebaseError) setError(error.code)
    }
  }
  return (
    <MenuWrapper>
      <Form.Root onSubmitFunction={handleSubmit}>
        <Form.Header title='Nice to see you again' />
        <div className='flex flex-col'>
          <Input.Root>
            <Input.Icon icon={EnvelopeSimple} />
            <Input.Section name='email' type='email' placeholder='E-mail' />
            <Input.Invalid text='Please enter a valid e-mail' />
          </Input.Root>
          <Input.Root>
            <Input.Icon icon={Password} />
            <Input.Section name='password' type={`${isVisible ? 'text' : 'password'}`} placeholder='Password' minLenght={6} />
            <Input.Invalid text='Please enter a password with at least 6 characters' />
            <Input.Button onClickFunction={toogleVisibly} visibly={isVisible} />
          </Input.Root>
          <div className='text-end'>
            <Form.Link title='Forgot your password?' text='' path='/forgotpassword' />
          </div>
        </div>
        <Form.Button disable={isLoading} title='Sign in'/>
        <Form.Link title='Register' text='Don&apos;t have an account?' path='/register' />
      </Form.Root>
    </MenuWrapper>
  )
}