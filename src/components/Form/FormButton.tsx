interface FormButtonProps {
  title: string
  disable: boolean
}

export default function FormButton({title, disable}: FormButtonProps) {
  return (
    <button disabled={disable} type='submit' className='bg-neon-blue text-slate-50 hover:bg-neon-blue/90 transition-colors duration-200 w-full text-lg font-bold h-auto p-2 rounded-full mt-4 self-center'>
      {title}
    </button>
  )
}