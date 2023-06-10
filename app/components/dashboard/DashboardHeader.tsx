'use client'

import { SafeUser } from '@/app/@types/userTypes'
import useThemeContext from '@/app/hooks/useThemeContext'
import Image from 'next/image'
import { ToolTip } from '../Tooltip'
import { MdDarkMode, MdLogout } from 'react-icons/md'
import { FaComments } from 'react-icons/fa'
import useNewChatOpen from '@/app/hooks/useNewChatOpen'
import { signOut } from 'next-auth/react'

interface DashboardHeaderProps {
  currentUser: SafeUser
}

const DashboardHeader = async ({ currentUser }: DashboardHeaderProps) => {
  const { onChangeThemeToDark, onChangeThemeToLight, mode } = useThemeContext()
  const { isOpen, onClose, onOpen } = useNewChatOpen()

  const handleThemeContext = () => {
    if (mode === '') {
      onChangeThemeToDark()
      return
    }
    onChangeThemeToLight()
  }

  const handleNewChat = () => {
    if (isOpen) {
      onClose()
    }
    onOpen()
  }

  return (
    <header className="flex h-[60px] items-center justify-between bg-light-backgroundSecond px-4 py-0 dark:bg-dark-backgroundSecond max-[994px]:w-screen">
      <div className="flex items-center justify-center gap-2">
        {currentUser.image ? (
          <Image
            width={40}
            height={40}
            className="cursor-pointer rounded-full"
            src={currentUser.image}
            alt={`Avatar do usuário ${currentUser.name}`}
          />
        ) : (
          ''
        )}

        <p className="ml-1 text-light-text dark:text-dark-text">
          {currentUser.name}
        </p>
      </div>
      <div className="flex">
        <div
          onClick={handleThemeContext}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[20px]"
        >
          <ToolTip tooltip="Tema Dark/Light">
            <MdDarkMode style={{ color: '#919191' }} />
          </ToolTip>
        </div>

        <div
          onClick={handleNewChat}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[20px]"
          title="Fazer uma nova pergunta!"
        >
          <ToolTip tooltip="Clique para fazer uma nova pergunta!">
            <FaComments style={{ color: '#919191' }} />
          </ToolTip>
        </div>
        <div
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
          onClick={() => signOut()}
        >
          <ToolTip tooltip="Logout">
            <MdLogout style={{ color: '#919191' }} />
          </ToolTip>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
