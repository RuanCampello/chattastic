export default function SearchBar() {
  return (
    <form className='my-4'>
      <input className='w-full rounded-xl focus:outline-none px-3 py-2 bg-jet placeholder:text-neutral-400' type='text' placeholder='search user...' />
    </form>
  )
}