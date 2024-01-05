interface FormButtonProps {
  title: string
}

export default async function FormButton({title}: FormButtonProps) {
  return (
    <button type='submit' className='bg-neon-blue text-slate-50 hover:bg-purple transition duration-200 ease-in-out w-full text-lg font-bold h-auto p-2 rounded-full mt-4 self-center'>
      {title}
    </button>
  )
}