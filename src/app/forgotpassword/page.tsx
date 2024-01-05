'use client'
import { Form } from '@/components/Form'
import InputSection from '@/components/inputSection'
import MenuWrapper from '@/components/menuwrapper'

export default function ForgotPassword() {
  function handleSubmit(e: any) {
    e.preventDefault()
    
  }
  return (
    <MenuWrapper>
      <Form.Root onSubmitFunction={() => handleSubmit}>
        <Form.Header title='Forgot your password?'/>
        <p className='mb-4'>
          Confirm your e-mail and we&apos;ll send you the instructions to reset password.
        </p>
        <InputSection type='email' placeholder='E-mail' />
        <Form.Button title='Send e-mail'/>
      </Form.Root>
    </MenuWrapper>
  )
}