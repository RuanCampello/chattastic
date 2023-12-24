import BasicInfo from './basicInfo'

export default function Chat() {
  const placeholder = 'https://static.vecteezy.com/system/resources/previews/021/548/095/non_2x/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg'
  return (
    <div className='w-2/3 2xl:w-3/4 2xl:rounded-r-lg p-2'>
      <div className='border-b-2 border-eerie-black p-4'>
        <BasicInfo name='John' img={placeholder} />
      </div>
    </div>
  )
}