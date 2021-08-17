import { motion } from "framer-motion"
import Link from "next/link";

interface CollaboratorsCardProps {
  username: string
  layoutId: string
}

const CollaboratorsCard: React.FC<CollaboratorsCardProps> = ({ username, layoutId }) => {
  const collaboratorAvatar = `./avatars/${username}.jpg`;
  const collaboratorPage = `./${username}`;
  const layoutIdLogo = `${layoutId}_logo`
  console.log('Card ' + layoutIdLogo)
  return (
    <Link href={collaboratorPage}>
      <a className="hover:bg-blue-300">
        <div className="relative w-20 md:w-40 mx-3 mt-3 cursor-pointer transition">
          <motion.img
            src={collaboratorAvatar}
            className="w-full h-full rounded-t-xl"
            layoutId={layoutIdLogo} />
        </div>
        <div className="mx-3 m-auto mb-3 py-2 w-20 md:w-40 rounded-b-xl bg-blue-300 hover:bg-blue-600 transition">
          <p className="text-xs md:text-sm lg:text-md flex justify-center whitespace-nowrap overflow-hidden overflow-ellipsis"> @{username} </p>
        </div>
      </a>
    </Link >
  )
}

export default CollaboratorsCard