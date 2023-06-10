import { create } from 'zustand'

interface NewChatOpen {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useNewChatOpen = create<NewChatOpen>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default useNewChatOpen
