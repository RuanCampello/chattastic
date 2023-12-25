import BasicInfo from './basicInfo'
import InputMessage from './inputMessage'
import Messages from './messages'

export default function Chat() {
  const placeholder = 'https://static.vecteezy.com/system/resources/previews/021/548/095/non_2x/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg'
  return (
    <div className='w-2/3 2xl:w-3/4 2xl:rounded-r-lg p-2 flex flex-col'>
      <div className='flex flex-col flex-1 overflow-hidden'>
        <div className='border-b-2 border-eerie-black p-4 sticky top-0 bg-jet'>
          <BasicInfo name='John' img={placeholder} />
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