interface MessageProps {
  owner?: boolean
}

export default function Message({owner}: MessageProps) {
  return (
    <div className={`${owner ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
      <p className={`max-w-[40%] p-2 rounded-xl font-semibold ${owner ? 'bg-neon-blue' : 'text-neutral-400 bg-eerie-black border border-neutral-600'}`}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi fugiat perferendis quos quae deleniti, sapiente eos! Dolores, odit obcaecati. Nisi sunt amet blanditiis? Consectetur aperiam quaerat harum autem ullam mollitia!
      </p>
      <span className='text-neutral-500 text-sm font-semibold mx-1'>Just now</span>
    </div>
  )
}