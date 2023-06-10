interface ChatWindowProps {
  activeChatId:string
}

export default async function ChatWindow({activeChatId}: ChatWindowProps) {
  const chatData = await 

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
