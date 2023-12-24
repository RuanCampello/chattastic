interface InputSectionProps {
  type?: string
  placeholder?: string
}

export default function InputSection({type = 'text', placeholder}: InputSectionProps) {
  return (
    <input className='w-full p-3 rounded-sm focus:outline-none bg-slate-200 text-savoy-blue font-medium' type={type} placeholder={placeholder}/>
  )
}