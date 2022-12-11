import { useEffect, useState } from 'react'
import { Chat } from './styles'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Api from '../../Api'

export function NewChat({ user, chatList, show, setShow }) {
  const [list, setList] = useState([])

  useEffect(() => {
    if (user !== null) {
      const getList = async () => {
        if (user !== null) {
          let results = await Api.getContactList(user.id)
          setList(results)
        }
      }
      getList()
    }
  }, [user])

  const addNewChat = async user2 => {
    await Api.addNewChat(user, user2)

    handleClose()
  }

  const handleClose = () => {
    setShow(false)
  }

  return (
    <Chat style={{ left: show ? 0 : -420 }}>
      <div className="header">
        <div onClick={handleClose} className="button">
          <ArrowBackIcon style={{ color: '#FFF' }} />
        </div>
        <h2>Nova Conversa</h2>
      </div>
      <div className="list">
        {list.map((item, key) => (
          <div onClick={() => addNewChat(item)} className="new-chat" key={key}>
            <img src={item.avatar} />
            <div className="name">{item.name}</div>
          </div>
        ))}
      </div>
    </Chat>
  )
}
