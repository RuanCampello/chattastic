interface InputSectionProps {
  type: string
  name: string
  placeholder: string
  minLenght?: number
}

export default function InputSection({type, placeholder, name, minLenght}: InputSectionProps) {
  return (
    <input 
     className={`w-full p-2 rounded-md rounded-l-none focus:outline-none border bg-slate-200 text-savoy-blue font-medium invalid:border-indian-red invalid:text-indian-red`}
     type={type} 
     placeholder={placeholder} 
     name={name}
     minLength={minLenght}
    />
  )
}