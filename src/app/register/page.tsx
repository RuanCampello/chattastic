'use client'
import { At, EnvelopeSimple, ImageSquare, Password, User } from '@phosphor-icons/react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db, storage } from '@/firebase'
import { useState } from 'react'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import MenuWrapper from '@/components/menuwrapper'
import { Form } from '@/components/Form'
import { Input } from '@/components/Input'

export default function Register() {
  const [error, setError] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [profilePhoto, setProfilePhoto] = useState()
  const [imagePreview, setImagePreview] = useState(String)
  const router = useRouter()

  const toogleVisibly = () => setIsVisible(!isVisible)

  async function checkUsernameExists(username: string): Promise<boolean> {
    const usernameQuery = await getDocs(query(collection(db, 'users'), where('username', '==', username)))
    return usernameQuery.size > 0
  }
  function handleImageInputChange(e: any) {
    const file = e.target.files[0]
    setProfilePhoto(file)

    if(file) {
      const previewURL = URL.createObjectURL(file)
      setImagePreview(previewURL)
    }
  }
  async function handleSubmit(e: any) {
    e.preventDefault()
    setIsLoading(true)
    const name = e.target.name.value
    const email = e.target.email.value
    const password = e.target.password.value
    const username = e.target.username.value
    const photo = e.target.photo.files[0]

    if(!name || !email || !password || !username || !photo) return

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
      <Form.Root onSubmitFunction={handleSubmit}>
        <Form.Header title='Register' />
        <div className='flex flex-col'>
          <Input.Root>
            <Input.Icon icon={User} />
            <Input.Section name='name' type='text' placeholder='Name' minLenght={4} />
            <Input.Invalid text='Please use a name with at least 4 characters' />
          </Input.Root>
          <Input.Root>
            <Input.Icon icon={At} />
            <Input.Section name='username' type='text' placeholder='Username' minLenght={6} />
            <Input.Invalid text='Please use a username with at least 6 characters' />
          </Input.Root>
          <Input.Root>
            <Input.Icon icon={EnvelopeSimple} />
            <Input.Section name='email' type='email' placeholder='E-mail' />
            <Input.Invalid text='Please use a valid e-mail' />
          </Input.Root>
          <Input.Root>
            <Input.Icon icon={Password} />
            <Input.Section name='password' type={`${isVisible ? 'text' : 'password'}`} placeholder='Password' minLenght={6} />
            <Input.Button onClickFunction={toogleVisibly} visibly={isVisible}/>
            <Input.Invalid text='Please use a password with at least 6 characters' />
          </Input.Root>
          <input onChange={handleImageInputChange} className='hidden' name='photo' type='file' id='file'/>
          <label className={`cursor-pointer flex font-medium items-center text-sm gap-1 text-neon-blue ${imagePreview ? 'justify-center' : 'justify-start'}`} htmlFor='file'>
            {!imagePreview ?
              <>
                <ImageSquare weight='duotone' size={32}/>
                <span>Add a profile photo</span>
              </>
              :
              <div className='group flex border-2 rounded-full border-neon-blue bg-eerie-black'>
                <img className='w-24 h-24 object-cover rounded-full group-hover:grayscale group-hover:brightness-75 group:transition-colors duration-300' src={imagePreview} alt='preview image' />
                <span className='text-transparent group-hover:text-neon-blue flex absolute self-center font-bold group:transition-colors duration-400 ease-in-out'>Change image</span>
              </div>
            }
          </label>
        </div>
        <Form.Button disable={isLoading} title='Sign up' />
        <Form.Link title='Login' path='/login' text='Already have an account?' />
      </Form.Root>
    </MenuWrapper>
  )
}