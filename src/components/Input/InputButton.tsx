import { Eye, EyeClosed } from '@phosphor-icons/react'

interface InputButtonProps {
  onClickFunction: () => void
  visibly: boolean
}

export default function InputButton({onClickFunction, visibly}: InputButtonProps) {
  return (
    <div 
    onClick={onClickFunction} 
    className='absolute right-1 cursor-pointer hover:bg-slate-300 rounded-full p-1 transition duration-300 ease-in-out z-10 bg-slate-200' >
      {visibly ? <Eye weight='duotone' size={24}/> : <EyeClosed weight='duotone' size={24}/>}
    </div>
  )
}