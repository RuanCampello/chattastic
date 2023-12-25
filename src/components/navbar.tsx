import { SignOut } from "@phosphor-icons/react"

export default function Navbar() {
  const placeholder = 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'
  return (
    <div className='2xl:rounded-bl-lg flex items-center justify-between p-4 w-full bg-neon-blue'>
      <div className='flex items-center gap-2'>
        <img src={placeholder} title='name' alt='name' className='h-10 rounded-full'/>
        <h2 className='text-xl text-start'>Joseph</h2>
      </div>
      <button type='button' className='px-3 py-1 rounded-full'>
        <SignOut size={20} weight="duotone" />
      </button>
    </div>
  )
}