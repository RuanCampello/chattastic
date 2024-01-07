import Chats from './chats'
import Navbar from './navbar'
import SearchBar from './searchbar'
import Version from './version'

export default function Sidebar() {
  return (
    <div className='w-20 lg:w-1/4 md:w-1/3 2xl:rounded-l-lg bg-eerie-black flex flex-col'>
      <div className='flex-1 flex flex-col overflow-y-scroll scrollbar-none m-2 md:m-4 md:mt-0'>
        <div className='sticky top-0 bg-eerie-black z-10 border-neon-blue border-b my-3 space-y-3 hidden md:block'>
          <Version />
          <SearchBar />
        </div>
        <Chats />
      </div>
      <div className='sticky bottom-0'>
        <Navbar />
      </div>
    </div>
  )
}