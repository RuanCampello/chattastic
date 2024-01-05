interface InputSectionProps {
  type?: string
  placeholder?: string
  name?: string
}

export default function InputSection({type, placeholder, name}: InputSectionProps) {
  return (
    <input className='w-full p-3 rounded-md focus:outline-none border invalid:border-indian-red invalid:text-indian-red bg-slate-200 text-savoy-blue font-medium' type={type || 'text'} placeholder={placeholder} name={name}/>
  )
}