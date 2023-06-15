import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="mx-auto mt-6 max-w-4xl pl-4 pr-4 text-center text-gray-100">
      2021© Todos os direitos reservados.{' '}
      <Link href="https://www.portaldev.digital/" target="_blank">
        <b className="ml-3">www.portaldev.digital</b>
      </Link>
    </footer>
  )
}

export default Footer
