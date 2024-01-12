interface InputSectionProps {
  type: string
  name: string
  placeholder: string
  minLenght?: number
}

export default function InputSection({type, placeholder, name, minLenght}: InputSectionProps) {
  return (
    <input 
     className={`w-full p-2 rounded-md rounded-l-none focus:outline-none border bg-slate-200 text-savoy-blue font-medium peer/input invalid:text-pink-500 invalid:border-pink-500`}
     type={type} 
     placeholder={placeholder} 
     name={name}
     minLength={minLenght}
    />
  )
}