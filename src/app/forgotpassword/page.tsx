'use client'
import { Form } from '@/components/Form'
import InputSection from '@/components/inputSection'
import MenuWrapper from '@/components/menuwrapper'
import { auth } from '@/firebase'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useState } from 'react'

export default function ForgotPassword() {
  const [error, setError] = useState(false)
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const email = (e.target as any).elements.email.value
    try {
      await sendPasswordResetEmail(auth, email)
    } catch(error) {
      setError(true)
    }
  }
  return (
    <MenuWrapper>
      <Form.Root onSubmitFunction={handleSubmit}>
        <Form.Header title='Forgot your password?' />
        <p className='mb-4'>Confirm your e-mail and we&apos;ll send you the instructions to reset the password.</p>
        <InputSection placeholder='E-mail' name='email' />
        <Form.Button title='Send e-mail' />
      </Form.Root>
    </MenuWrapper>
  )
}