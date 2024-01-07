interface InfoActivityProps {
  activity: string
}

export default function InfoActivity({activity}: InfoActivityProps) {
  return (     
    <div className={`h-4 w-4 rounded-full absolute bottom-0 -right-1 border-[3px] border-eerie-black 
    ${
      activity === 'online'
        ? 'bg-pigment-green'
        : activity === 'away'
        ? 'bg-xanthous'
        : 'bg-imperial-red'
    }`}
    ></div>
  )
}