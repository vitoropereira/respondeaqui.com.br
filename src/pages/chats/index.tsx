export default function Chats(){
 const [darkMode, setDarkMode] = useState()

 return (
  <ThemeProvider theme={isDarkTheme ? lightTheme : darkTheme}>
    <div className="my-custom-style"> 
    <Container>
      <Sidebar display={mobileOpen ? 'none' : 'flex'}>
        <NewChat
          chatList={chatList}
          user={user}
          show={showNewChat}
          setShow={setShowNewChat}
        />
        <HeaderSidebar>
          <div className="header">
            <img src={user.avatar} alt="" />
            <p>{user.name}</p>
          </div>
          <div className="button">

            <div onClick={() => setIsDarkTheme(!isDarkTheme)} className="btn">
              <DarkModeIcon  
                style={{ color: '#919191' }} 
              />
            </div>

            <div onClick={handleNewChat} className="btn">
              <ChatIcon style={{ color: '#919191' }} />
            </div>

          </div>
        </HeaderSidebar>

        <Search>
          <div className="input">
            <SearchIcon fontSize="small" style={{ color: '#919191' }} />
            <input
              type="search"
              placeholder="Procurar ou começar uma nova conversa"
            />
          </div>
        </Search>

        <div className="chatList">
          {chatList.map((item, key) => (
            <ChatList
              key={key}
              data={item}
              active={activeChat.chatId === chatList[key].chatId}
              onClick={() => setActiveChat(chatList[key])}
              onMobileClick={() => setMobileOpen(true)}
            />
          ))}
        </div>
      </Sidebar>
      <Content>
        {activeChat.chatId !== undefined && (
          <ChatWindow 
            user={user} 
            data={activeChat}
            setMobileOpen={setMobileOpen} 
            mobileOpen={mobileOpen} 
          />
        )}

        {activeChat.chatId === undefined && <ChatIntro />}
      </Content>
    </Container>
    </div>
  </ThemeProvider>
)
}

}