import Message from './message';

export default function Messages() {
  return (
    <div className='space-y-2 px-4 mt-4 w-full'>
      <Message />
      <Message />
      <Message owner={true} />
      <Message />
      <Message />
      <Message owner={true} />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message owner={true} />
      <Message owner={true} />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  )
}