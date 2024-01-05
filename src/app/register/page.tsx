'use client'
import InputSection from '@/components/inputSection'
import { Eye, EyeClosed, ImageSquare } from '@phosphor-icons/react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db, storage } from '@/firebase'
import { useState } from 'react'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import MenuWrapper from '@/components/menuwrapper'
import { Form } from '@/components/Form'

export default function Register() {
  const [isVisible, setIsVisible] = useState(false)
  const [error, setError] = useState(false)
  const router = useRouter()

  async function checkUsernameExists(username: string): Promise<boolean> {
    const usernameQuery = await getDocs(query(collection(db, 'users'), where('username', '==', username)))
    return usernameQuery.size > 0
  }
  async function handleSubmit(e: any) {
    e.preventDefault()
    const name = e.target.name.value
    const email = e.target.email.value
    const password = e.target.password.value
    const username = e.target.username.value
    const photo = e.target.photo.files[0]

    //check uniqueness of the username
    const usernameExists = await checkUsernameExists(username)
    if(usernameExists) {
      setError(true)
      console.error('Username is not unique')
      return
    }
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password)
      const date = new Date().getTime()
      const storageRef = ref(storage, `${name}+${date}`)

      await uploadBytesResumable(storageRef, photo).then(() => {
      getDownloadURL(storageRef).then(async(downloadURL) => {
        try {
          await updateProfile(response.user, {
            displayName: name,
            photoURL: downloadURL
          })
          await setDoc(doc(db, 'users', response.user.uid), {
            uid: response.user.uid,
            name,
            email,
            photoURL: downloadURL,
            username,
          })
          await setDoc(doc(db, 'userChats', response.user.uid), {})
          router.replace('/')
        } catch (error) {}
        })
      })
    } catch (error) {
      console.error('Registration Error:', error)
      setError(true)
    }
  }
  return (
    <MenuWrapper>
      <Form.Root onSubmitFunction={() => handleSubmit}>
        <Form.Header title='Register' />
        <div className='flex flex-col gap-4'>
          <InputSection name='name' placeholder='Name'/>
          <InputSection type='text' name='username' placeholder='Username'/>
          <InputSection type='email' name='email' placeholder='E-mail'/>
          <div className='flex items-center w-full relative'>
            <input className='p-3 bg-slate-200 rounded-md w-full focus:outline-none' type={isVisible ? 'text' : 'password'} name='password' placeholder='Password' />
            <div onClick={e => setIsVisible(!isVisible)} className='absolute right-1 cursor-pointer hover:bg-slate-300 rounded-full p-2' >
              {isVisible ? <Eye weight='duotone' size={24}/> : <EyeClosed weight='duotone' size={24}/>}
            </div>
          </div>
          <input className='hidden' name='photo' type='file' id='file'/>
          <label className='cursor-pointer flex font-medium items-center text-sm gap-1 text-neon-blue' htmlFor='file'>
            <ImageSquare weight='duotone' size={32}/>
            <span>Add a profile photo</span>
          </label>
        </div>
        <Form.Button title='Sign up' />
        <Form.Link title='Login' path='/login' text='Already have an account?' />
      </Form.Root>
    </MenuWrapper>
  )
}