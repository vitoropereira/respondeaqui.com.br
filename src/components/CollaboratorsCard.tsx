import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { UserProps } from 'src/@types/userTypes'

interface CollaboratorsCardProps {
  username: UserProps
  imagesUrls?: string
  layoutId: string
}

const CollaboratorsCard = ({ username, layoutId }: CollaboratorsCardProps) => {
  const [imagesUrl, setImagesUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const collaboratorPage = `./${username.username}`
  const layoutIdLogo = `${layoutId}_logo`

  return (
    <Link href={collaboratorPage}>
      <a className="hover:bg-blue-300">
        <div className="relative mx-3 mt-3 w-20 cursor-pointer transition md:w-40">
          <motion.img
            src={username.image}
            className="h-full w-full rounded-t-xl"
            layoutId={layoutIdLogo}
          />
        </div>
        <div className="m-auto mx-3 mb-3 w-20 rounded-b-xl bg-blue-300 py-2 transition hover:bg-blue-600 md:w-40">
          <p className="lg:text-md flex justify-center overflow-hidden overflow-ellipsis whitespace-nowrap text-xs md:text-sm">
            {' '}
            @{username.username}{' '}
          </p>
        </div>
      </a>
    </Link>
  )
}

export default CollaboratorsCard
