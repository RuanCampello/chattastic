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
    <div className='bg-ultra-violet w-screen h-screen flex justify-center items-center text-savoy-blue'>
      <form onSubmit={handleSubmit} className='flex flex-col w-96 h-fit rounded-lg p-8 bg-gray-100'>
        <h1 className='text-3xl font-bold mb-8 self-center'>Register</h1>
        <div className='flex flex-col gap-4'>
          <InputSection name='name' placeholder='Name'/>
          <InputSection name='username' placeholder='Username'/>
          <InputSection type='email' name='email' placeholder='E-mail'/>
          <div className='flex items-center w-full relative'>
            <input className='p-3 bg-slate-200 w-full focus:outline-none' type={isVisible ? 'text' : 'password'} name='password' placeholder='Password' />
            <div onClick={e => setIsVisible(!isVisible)} className='absolute right-1 cursor-pointer hover:bg-slate-300 rounded-full p-2' >
              {isVisible ? <Eye weight='duotone' size={24}/> : <EyeClosed weight='duotone' size={24}/>}
            </div>
          </div>
          <input className='hidden' name='photo' type='file' id='file'/>
          <label className='cursor-pointer flex items-center text-sm gap-1' htmlFor='file'>
            <ImageSquare weight='duotone' size={32}/>
            <span>Add a profile photo</span>
          </label>
        </div>
        <button type='submit' className='bg-savoy-blue text-slate-50 hover:bg-ultra-violet w-full text-lg font-bold h-auto p-2 rounded-full mt-4 self-center'>
          Sign Up
        </button>
        <span className='my-2'>You already have an account? <Link href={'/login'} className='underline'>Login</Link></span>
      </form>
    </div>
  )
}