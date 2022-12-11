import { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Image from 'next/image'

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

  // const addNewChat = async user2 => {
  //   await api .addNewChat(user, user2)

  //   handleClose()
  // }

  const handleClose = () => {
    setShow(false)
  }

  return (
    <div className='w-[35%] max-w-md fixed left-0 top-0 bottom-0 bg-light-background dark:bg-dark-background flex flex-col border-r-[1px] border-r-light-border dark:border-r-dark-border transition-all ease-linear max-md:fixed max-md:w-full max-md:h-full max-md:flex-1 max-md:z-10 ' style={{ left: show ? 0 : -420 }}>
      <div className="flex bg-cyan-500 items-center pt-16 pb-4 px-4">
        <div onClick={handleClose} className="w-10 h-10 flex justify-center items-center cursor-pointer">
          <ArrowBackIcon style={{ color: '#FFF' }} />
        </div>
        <h2 className='text-lg h-10 leading-10 flex-1 font-bold text-white ml-5'>Nova Conversa</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {list.map((item, key) => (
          <div onClick={() => addNewChat(item)} className="flex items-center p-4 cursor-pointer hover:bg-light-backgroundHover dark:hover:bg-dark-backgroundHover" key={key}>
            <Image width={50} height={50} className='rounded-full mr-4' alt='Imagem do usuário.' src={item.avatar} />
            <div className="text-base text-light-text dark:text-dark-text">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
