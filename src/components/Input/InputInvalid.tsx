interface InputInvalidProps {
  text: string
}

export default function InputInvalid({text}: InputInvalidProps) {
  return (
    <p className='text-pink-500 text-sm font-semibold peer-invalid/input:flex hidden absolute bottom-0'>
      {text}
    </p>
  )
}