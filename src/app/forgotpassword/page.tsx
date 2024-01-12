'use client'
import { Form } from '@/components/Form'
import { Input } from '@/components/Input'
import MenuWrapper from '@/components/menuwrapper'
import { auth } from '@/firebase'
import { EnvelopeSimple } from '@phosphor-icons/react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useState } from 'react'

export default function ForgotPassword() {
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const email = (e.target as any).elements.email.value
    if(!email) return
    try {
      setIsLoading(true)
      await sendPasswordResetEmail(auth, email)
    } catch(error) {
      setError(true)
      setIsLoading(false)
    }
  }
  return (
    <MenuWrapper>
      <Form.Root onSubmitFunction={handleSubmit}>
        <Form.Header title='Forgot your password?' />
        <p className='mb-4'>Confirm your e-mail and we&apos;ll send you the instructions to reset the password.</p>
        <Input.Root>
          <Input.Icon icon={EnvelopeSimple} />
          <Input.Section name='email' type='email' placeholder='E-mail' />
          <Input.Invalid text='Please use a valid e-mail' />
        </Input.Root>
        <Form.Button disable={isLoading} title='Send e-mail' />
      </Form.Root>
    </MenuWrapper>
  )
}