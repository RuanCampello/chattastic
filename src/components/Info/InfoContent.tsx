interface InfoActivityProps {
  name: string
  username?: string
  isLoading?: boolean
  lastOnline?: string
  activity?: string
  hideOnSmallScreens?: boolean
}

export default function InfoContent({name, lastOnline, isLoading, activity, username, hideOnSmallScreens}: InfoActivityProps) {
  return (
    <div className={`${hideOnSmallScreens && 'md:flex hidden'} flex flex-col`}>
      <h2 className='leading-5 font-semibold'>{name}</h2>
      {username && !isLoading && <h3 className='text-neon-blue leading-3 font-bold'>{username}</h3>}
      {lastOnline && (
        <h3 className='lowercase text-sm text-neutral-400 font-medium leading-3'>
          {activity !== 'online' ? (
            <span>online {lastOnline}</span>
          ) : (
            <span>online</span>
          )}
        </h3>
      )}
    </div>
  )
}