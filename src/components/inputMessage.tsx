import { AuthContext } from '@/context/AuthContext'
import { ChatContext } from '@/context/ChatContext'
import { db, storage } from '@/firebase'
import { Image, PaperPlaneRight, Smiley } from '@phosphor-icons/react'
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import { Timestamp, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useContext, useState } from 'react'
import { v4 as uuid } from 'uuid'

export default function InputMessage() {
  const [text, setText] = useState(String)
  const [file, setFile] = useState<File | null>()
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false)

  const { userData } = useContext(ChatContext)
  const { currentUser } = useContext(AuthContext)  

  function handleEmojiSelection(emoji: any) {
    setText((previousText) => previousText + emoji.native)
  }
  async function handleClick(e: any) {
    e.preventDefault()
  
    if (file) {
      const storageRef = ref(storage, uuid())
      const uploadTask = uploadBytesResumable(storageRef, file)
  
      uploadTask.on('state_changed', () => {

      }, (error) => {
        console.error('error during upload:', error)
      }, async() => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateDoc(doc(db, 'chats', userData.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              img: downloadURL,
            })
          })
        })
      })
    } else {
      await updateDoc(doc(db, 'chats', userData.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        })
      })
    }
    setText('')
    setFile(null)
    setEmojiPickerVisible(false)
  }
  
  return (
    <div className='p-[14px]' >
      <form onSubmit={e => e.preventDefault()} className='w-full relative text-neutral-400 bg-eerie-black rounded-3xl font-semibold flex items-center px-4 p-1'>
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
          <button 
           type='button' 
           onClick={() => setEmojiPickerVisible(!emojiPickerVisible)} className='hover:bg-jet p-2 rounded-full transition duration-500 ease-in-out'>
            <Smiley size={28} weight='duotone'/>
          </button>
          <button disabled={text.trim() === '' && file === null} onClick={handleClick} className='hover:bg-jet p-2 rounded-full transition duration-500 ease-in-out'>
            <PaperPlaneRight size={28} weight='duotone' />
          </button>
        </div>
      </form>
      <div className='absolute right-[1vw] bottom-[10vh]'>
        {emojiPickerVisible && 
          <Picker 
           data={data} 
           previewPosition={'none'}
           set={'native'}
           emojiSize={32}
           onEmojiSelect={handleEmojiSelection as any} 
          />
        }
      </div>
    </div>
  )
}