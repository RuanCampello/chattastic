import { AuthContext } from '@/context/AuthContext'
import { ChatContext } from '@/context/ChatContext'
import { db, storage } from '@/firebase'
import { Image as ImageIcon, PaperPlaneRight, Smiley, XCircle } from '@phosphor-icons/react'
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useContext, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { MessageContext } from '@/context/MessageContext'

export default function InputMessage() {
  const [text, setText] = useState(String)
  const [file, setFile] = useState<File | null>()
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const { userData } = useContext(ChatContext)
  const { currentUser } = useContext(AuthContext) 
  const { selectedMessage, setSelectedMessage } = useContext(MessageContext)

  function handleEmojiSelection(emoji: any) {
    setText((previousText) => previousText + emoji.native)
  }
  async function updateLastMessage(text: string, hasImage: boolean) {
    //update the last message of the chat
    const fields: any = {
      [userData.chatId + '.lastMessage']: text,
      [userData.chatId + '.date']: serverTimestamp()
    }
    if(hasImage) fields[userData.chatId + '.hasImage'] = true
    else fields[userData.chatId + '.hasImage'] = false

    //update the last message for the current user's chat
    await updateDoc(doc(db, 'userChats', currentUser.uid), fields)
    //update the last message for the other user's chat
    await updateDoc(doc(db, 'userChats', userData.user.uid), fields)
  }
  //commun function to add messages and update the chat last message
  async function addMessage(messageData: any) {
    const hasImage = typeof messageData.img !== 'undefined' && messageData.img !== ''
    
    await updateDoc(doc(db, 'chats', userData.chatId), {
      messages: arrayUnion({
        id: uuid(),
        ...messageData,
      })
    })
    await updateLastMessage(messageData.text, hasImage)
  }
  async function handleClick(e: any) {
    e.preventDefault()
    
    if(isUploading) return

    if (file) {
      setIsUploading(true)

      const storageRef = ref(storage, uuid())
      const uploadTask = uploadBytesResumable(storageRef, file)
      try {
        const snapshot = await uploadTask
        const downloadURL = await getDownloadURL(snapshot.ref)

        await addMessage({
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
          img: downloadURL,
          repliedMessage: selectedMessage && {
            repliedOwner: selectedMessage.owner,
            repliedText: selectedMessage.text,
            receiverUid: userData.user.uid,
          }
        })
        setFile(null)
      } catch(error) {
        console.error('Error during image upload:', error)
      }
    } else {
      await addMessage({
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
        repliedMessage: selectedMessage && {
          repliedOwner: selectedMessage.owner,
          repliedText: selectedMessage.text,
          receiverUid: userData.user.uid,
        }
      })
    }
    setSelectedMessage(null)
    setText('')
    setEmojiPickerVisible(false)
    setIsUploading(false)
  }
  
  return (
    <div className={`p-2 ${selectedMessage && 'border-t-2 border-eerie-black'}`} >
      {selectedMessage &&
      <div className='flex justify-between items-center mb-2 font-medium'>
        <div className='mb-2 flex flex-col overflow-hidden'>
        <span className='text-neutral-300'>
          Replying to {selectedMessage.owner ? 'yourself' : <b>{userData.user.displayName}</b>}
        </span>
        <p className='text-neutral-200 truncate'>{selectedMessage.text}</p>
        </div>            
        <button onClick={() => setSelectedMessage(null)} className='text-neutral-300'>
          <XCircle size={24} weight='duotone' />
        </button>
      </div>
      }
      <form onSubmit={e => e.preventDefault()} className='w-full text-neutral-400 bg-eerie-black rounded-3xl font-semibold flex items-center p-1'>
        <button 
          type='button' 
          onClick={() => setEmojiPickerVisible(!emojiPickerVisible)} className='hover:bg-jet p-2 rounded-full transition-colors duration-300'>
          <Smiley size={28} weight='duotone'/>
        </button>
        {/* scrollable input */}
        <input
        value={text}
        onChange={(e) => setText(e.target.value)} 
        className='w-full ps-0 p-2 focus:outline-none bg-eerie-black placeholder:truncate placeholder:text-neutral-500 placeholder:text-sm md:placeholder:text-base' type='text' 
        placeholder={`type your message to ${userData.user.displayName}...`}/>
        <div className='flex gap-1'>
          <input onChange={(e) => {
            const selectedFile = e.target.files?.[0]
            if(selectedFile) setFile(selectedFile)
          }}
          type='file' className='hidden' id='file' />
          <label className='cursor-pointer hover:bg-jet p-2 rounded-full transition-colors duration-300' htmlFor='file'>
            <ImageIcon size={28} weight='duotone' />
          </label>
          <button disabled={text.trim() === '' && file === null} onClick={handleClick} className='hover:bg-jet p-2 rounded-full transition-colors duration-300'>
            <PaperPlaneRight size={28} weight='duotone' />
          </button>
        </div>
      </form>
      <div className={`absolute left-0 ${selectedMessage ? 'bottom-[14.75vh]' : 'bottom-[7vh]'} emoji-picker-container`}>
        {emojiPickerVisible && 
          <Picker
           id={'emoji-picker-container'}
           data={data}
           theme={'dark'}
           previewPosition={'none'}
           set={'native'}
           emojiButtonSize={42}
           perLine={7}
           emojiSize={32}
           emojiButtonColors={['#5B68F1']}
           onEmojiSelect={handleEmojiSelection as any}
          />
        }
      </div>
    </div>
  )
}