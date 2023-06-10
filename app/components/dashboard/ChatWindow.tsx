'use cliente'

import { useState } from 'react'

interface ChatWindowProps {}

export function ChatWindow({}: ChatWindowProps) {
  

  activeChat !== undefined && (
    <ChatWindow
      chatData={activeChat}
      handleWithSetMobileOpen={handleWithSetMobileOpen}
      mobileOpen={mobileOpen}
    />
  )
  return (

    {activeChat === undefined && <ChatIntro />}
  )
}
