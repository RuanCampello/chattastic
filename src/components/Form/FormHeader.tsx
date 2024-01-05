interface FormHeaderProps {
  title: string
}

export default function FormHeader({title}: FormHeaderProps) {
  return (
    <h1 className='text-3xl font-bold mb-8 self-center text-neon-blue'>{title}</h1>
  )
}