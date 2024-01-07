interface InfoActivityProps {
  name: string
  username?: string
  isLoading?: boolean
  lastOnline?: string
  activity?: string
  hideOnSmallScreens?: boolean
}

export default function InfoContent({name, lastOnline, isLoading, activity, username, hideOnSmallScreens}: InfoActivityProps) {
  const showActivity = activity !== 'online' ? `online ${lastOnline}` : 'online'
  return (
    <div className={`${hideOnSmallScreens && 'md:flex hidden'} flex flex-col`}>
      <h1 className='font-semibold leading-4'>{name}</h1>
      {username && !isLoading && <h3 className='text-neon-blue text-sm font-bold leading-4'>{username}</h3>}
      {lastOnline && (
        <h3 className='lowercase text-sm text-neutral-400 font-medium leading-4'>{showActivity}</h3>
      )}
    </div>
  )
}