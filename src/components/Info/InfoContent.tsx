interface InfoActivityProps {
  name: string
  username?: string
  isLoading?: boolean
  lastOnline?: string
  lastMessage?: string
  activity?: string
  hideOnSmallScreens?: boolean
}

export default function InfoContent({name, lastMessage, lastOnline, isLoading, activity, username, hideOnSmallScreens}: InfoActivityProps) {
  const showActivity = activity !== 'online' ? `online ${lastOnline}` : 'online'
  return (
    <div className={`${hideOnSmallScreens && 'md:flex hidden'} flex-col leading-4`}>
      <h1 className='font-semibold'>{name}</h1>
      {username && !isLoading && <h3 className='text-neon-blue leading-4 text-sm font-bold'>{username}</h3>}
      {lastOnline && 
        <h3 className='lowercase text-sm text-neutral-400 font-medium'>{showActivity}</h3>
      }
      {lastMessage && 
        <h3 className='text-neutral-400 text-sm font-semibold line-clamp-1'>{lastMessage}</h3>
      }
    </div>
  )
}