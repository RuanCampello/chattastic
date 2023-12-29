'use client'
import { AuthContext } from '@/context/AuthContext'
import { ChatContext } from '@/context/ChatContext'
import { db, storage } from '@/firebase'
import { Image, PaperPlaneRight } from '@phosphor-icons/react'
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useContext, useState } from 'react'
import { v4 as uuid } from 'uuid'

export default function InputMessage() {
  const [text, setText] = useState(String)
  const [file, setFile] = useState<File | null>()

  const { data } = useContext(ChatContext)
  const { currentUser } = useContext(AuthContext)  

  async function handleClick(e: any) {
    e.preventDefault()
    
    // if(file) {
    //   const storageRef = ref(storage, uuid())
    //   const uploadTask = uploadBytesResumable(storageRef, file)

    //   uploadTask.on('state_changed', () => {
    //     getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
    //       await updateDoc(doc(db, 'chats', data.chatId), {
    //         messages: arrayUnion({
    //           id: uuid(),
    //           text,
    //           senderId: currentUser.uid,
    //           date: Timestamp.now(),
    //           img: downloadURL
    //         })
    //       })
    //     })
    //   })
    // } else {
      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now()
        })
      })
    // }
    // await updateDoc(doc(db, 'userChats', currentUser.uid), {
    //   [data.chatId + '.lastMessage']: {
    //     text,
    //   },
    //   [data.chatId + '.date']: serverTimestamp()
    // })
    // await updateDoc(doc(db, 'userChats', data.user.uid), {
    //   [data.chatId + '.lastMessage']: {
    //     text,
    //   },
    //   [data.chatId + '.date']: serverTimestamp()
    // })    
  setText('')
  }
  return (
    <div className='p-[14px]' >
      <form className='w-full text-neutral-400 bg-eerie-black rounded-3xl font-semibold flex items-center px-4 p-1'>
        <input
        value={text}
        onChange={(e) => setText(e.target.value)} 
        className='w-full p-2 overflow-y-scroll focus:outline-none bg-eerie-black' type='text' 
        placeholder='type your message...'/>
        <div className='flex gap-1'>
          <input onChange={(e) => {
            const selectedFile = e.target.files?.[0]
            if(selectedFile) {
              setFile(selectedFile)
            }
          }}
          type='file' className='hidden' id='file' />
          <label className='cursor-pointer hover:bg-jet p-2 rounded-full transition duration-500 ease-in-out' htmlFor='file'>
            <Image size={28} weight='duotone' />
          </label>
          <button onClick={handleClick} className='hover:bg-jet p-2 rounded-full transition duration-500 ease-in-out'>
            <PaperPlaneRight size={28} weight='duotone' />
          </button>
        </div>
      </form>
    </div>
  )
}