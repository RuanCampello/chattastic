import { useState } from 'react'
import ToastWrapper from '../toast'

interface InfoActivityProps {
  name: string
  username?: Promise<string>
  isLoading?: boolean
  lastOnline?: string
  lastMessage?: string
  activity?: string
  hideOnSmallScreens?: boolean
}
export default function InfoContent({name, lastMessage, lastOnline, isLoading, activity, username, hideOnSmallScreens}: InfoActivityProps) {
  const showActivity = activity !== 'online' ? `online ${lastOnline}` : 'online'
  const [open, setOpen] = useState(false)

  function handleUsernameClick() {
    if(username) {
      username.then(value => navigator.clipboard.writeText(value))
      setOpen(true)
    }
  }
  
  return (
    <div className={`${hideOnSmallScreens && 'md:flex hidden'} flex-col leading-4`}>
      <h1 className='font-semibold'>{name}</h1>
      {username && !isLoading &&
        <ToastWrapper setIsOpen={() => setOpen(false)} title={'Copied!'} description={'username copied to clipboard'} isOpen={open}>
          <button onClick={handleUsernameClick} className='text-neon-blue text-start leading-4 text-sm font-bold'>{username}</button>
        </ToastWrapper>
      }
      {lastOnline && 
        <h3 className='lowercase text-sm text-neutral-400 font-medium'>{showActivity}</h3>
      }
      {lastMessage && 
        <h3 className='text-neutral-400 text-sm font-semibold line-clamp-1'>{lastMessage}</h3>
      }
    </div>
  )
}