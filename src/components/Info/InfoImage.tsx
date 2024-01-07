import Image from "next/image"
interface InfoImageProps {
  name: string
  source: string
}

export default function InfoImage({name, source}: InfoImageProps) {
  return (
    <Image
      alt={`${name} profile picture`}
      src={source}
      width={48}
      height={48}
      className={'rounded-full object-cover h-10 w-10 group-hover:scale-105 transition-transform duration-300'}
    />
  )
}