'use client'

import { SafeUser } from '@/app/@types/userTypes'
import { NewChat } from './NewChat'
import { useState } from 'react'
import useNewChatOpen from '@/app/hooks/useNewChatOpen'

interface AsideProps {
  currentUser: SafeUser
}

export default async function Aside({ currentUser }: AsideProps) {
  const { isOpen, onClose, onOpen } = useNewChatOpen()

  const handleNewChat = () => {
    if (isOpen) {
      onClose()
    }
    onOpen()
  }
  return (
    <NewChat show={isOpen} setShow={handleNewChat} currentUser={currentUser} />
  )
}
