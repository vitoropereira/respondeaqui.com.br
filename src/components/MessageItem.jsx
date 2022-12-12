import { useEffect, useState } from "react";

export function MessageItem({data, user}) {
  const [time, setTime] = useState('')

  useEffect(() => {
    if(data.date > 0) {
      let d = new Date(data.date.seconds * 1000) 
      let hours = d.getHours()
      let minutes = d.getMinutes()

      hours = hours < 10 ? '0'+hours : hours
      minutes = minutes < 10 ? '0'+minutes : minutes
      setTime(`${hours}:${minutes}`)
    }
  }, [data])

  return (
    <div className="flex mb-3" style={{
      justifyContent: user.id === data.author ? 'flex-end' : 'flex-start'
    }}>
      <div className="bg-white rounded-xl flex flex-col p-1 max-w-[90%]"
        style={{backgroundColor: user.id === data.author ? '#D9FDD3' : '#FFF' }}
      > 
        <div className="text-sm mt-1 mr-10 mb-1 ml-1">{data.body}</div>
        <div className="text-xs text-gray-500 mr-1 text-right h-4 -mt-4">{time}</div>
      </div>
    </div>
  )
}