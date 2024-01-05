'use client'
import { Form } from '@/components/Form'
import InputSection from '@/components/inputSection'
import MenuWrapper from '@/components/menuwrapper'

export default function ForgotPassword() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const email = (e.target as any).elements.email.value
    console.log('Email:', email)
  }
  return (
    <MenuWrapper>
      <Form.Root onSubmitFunction={handleSubmit}>
        <Form.Header title='Forgot your password?' />
        <p className='mb-4'>Confirm your e-mail and we'll send you the instructions to reset the password.</p>
        <InputSection name='email' />
        <Form.Button title='Send e-mail' />
      </Form.Root>
    </MenuWrapper>
  )
}