import Image from 'next/image'

interface BasicInfoProps {
  name: string
  img?: string
  activity?: string
  showActivity?: boolean
  lastOnline?: string
}

export default function BasicInfo({
  name,
  img,
  activity,
  showActivity = true,
  lastOnline
}: BasicInfoProps) {

  return (
    <div className='flex items-center gap-3 text-neutral-200'>
      {img ? (
        <div className='flex relative'>
          <Image
            alt={`${name} profile picture`}
            src={img}
            width={48}
            height={48}
            className={'rounded-full object-cover h-10 w-10'}
          />
          {showActivity && (
            <div
              className={`h-4 w-4 rounded-full absolute bottom-0 -right-1 border-[3px] border-eerie-black ${
                activity === 'online'
                  ? 'bg-pigment-green'
                  : activity === 'away'
                  ? 'bg-xanthous'
                  : 'bg-imperial-red'
              }`}
            ></div>
          )}
        </div>
      ) : (
        <div className='h-10 w-10 rounded-full'></div>
      )}
      {img && (
        <div className='flex flex-col'>
          <h2 className='leading-5 font-semibold'>{name}</h2>
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
      )}
    </div>
  )
}
