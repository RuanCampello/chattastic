import BasicInfo from './basicInfo'

export default function Chats() {
  const placeholder = 'https://static.vecteezy.com/system/resources/previews/021/548/095/non_2x/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg'
  return (
    <div className='hover:bg-jet p-4 py-3 rounded-xl cursor-pointer'>
      <BasicInfo img={placeholder} name='John' text='
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam sint minima pariatur, maxime similique quos unde molestiae incidunt placeat aliquid consequatur odit dolore doloremque eligendi illo quidem laboriosam. Inventore, nobis.'/>
    </div>
  )
}
// import BasicInfo from './basicInfo'

// interface ChatsProps {
//   img: string
//   text?: string
//   name: string
// }

// export default function Chats({img, name, text}: ChatsProps) {
//   return (
//     <div className='hover:bg-jet p-4 py-3 rounded-xl cursor-pointer'>
//       <BasicInfo img={img} name={name} text={text}/>
//     </div>
//   )
// }