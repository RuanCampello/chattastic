interface FormHeaderProps {
  title: string
}

export default async function FormHeader({title}: FormHeaderProps) {
  return (
    <h1 className='text-2xl font-bold mb-8 text-neon-blue'>{title}</h1>
  )
}