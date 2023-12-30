import { useContext } from 'react'
import BasicInfo from './basicInfo'
import InputMessage from './inputMessage'
import Messages from './messages'
import { ChatContext } from '@/context/ChatContext'

export default function Chat() {
  const { data } = useContext(ChatContext)
  return (
    <div className='w-2/3 2xl:w-3/4 2xl:rounded-r-lg p-2 pb-0 flex flex-col'>
      <div className='flex flex-col flex-1 overflow-hidden'>
        <div className='border-b-2 border-eerie-black p-4 sticky top-0 bg-jet'>
          <BasicInfo name={data.user.displayName || data.user.name} img={data.user.photoURL} activity={data.user.status}/>
        </div>
        <div className='overflow-y-scroll flex'>
          <Messages />
        </div>
      </div>
      <div className='sticky bottom-0'>
        <InputMessage />
      </div>
    </div>
  )
}