import Link from 'next/link'

interface FormLinkProps {
  text?: string
  path: string
  title: string
}

export default async function FormLink({text, path, title}: FormLinkProps) {
  return (
    <div className='my-2 text-sm font-medium'>
      {text} 
      <Link href={path} className='text-neon-blue hover:underline'> {title}</Link>
    </div>
  )
}