interface InputSectionProps {
  type?: string
  placeholder?: string
  name?: string
}

export default function InputSection({type = 'text', placeholder, name}: InputSectionProps) {
  return (
    <input className='w-full p-3 rounded-sm focus:outline-none bg-slate-200 text-savoy-blue font-medium' type={type} placeholder={placeholder} name={name}/>
  )
}