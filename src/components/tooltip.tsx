import * as Tooltip from '@radix-ui/react-tooltip'
import { ReactNode } from 'react'

interface TooltipWrapperProps {
  children: ReactNode
  content: string
}

export default function TooltipWrapper({children, content}: TooltipWrapperProps) {
  return (
    <Tooltip.TooltipProvider delayDuration={300} >
      <Tooltip.Root>
        <Tooltip.TooltipTrigger asChild>
          {children}
        </Tooltip.TooltipTrigger>
        <Tooltip.TooltipContent sideOffset={10} className='px-3 py-2 rounded-lg text-sm bg-neon-blue font-semibold text-neutral-200'>
          {content}
          <Tooltip.TooltipArrow fill='#5B68F1' />
        </Tooltip.TooltipContent>
      </Tooltip.Root>
    </Tooltip.TooltipProvider>
  )
}