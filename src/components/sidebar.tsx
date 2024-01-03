import Chats from './chats'
import Navbar from './navbar'
import SearchBar from './searchbar'

export default function Sidebar() {
  return (
    <div className='w-1/3 2xl:w-1/4 2xl:rounded-l-lg bg-eerie-black flex flex-col'>
      <div className='flex-1 flex flex-col overflow-y-scroll scrollbar-none m-4 mt-0'>
        <div className='sticky top-0 bg-eerie-black z-10 border-neon-blue border-b mb-2'>
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