import Link from "next/link";

const Footer = () => {
  return (
    <footer className="max-w-4xl mx-auto text-center text-gray-100 mt-6 pl-4 pr-4">
      2021© Todos os direitos reservados.{" "}
      <Link href="https://www.portaldev.digital/" target="_blank">
        <b className="ml-3">www.portaldev.digital</b>
      </Link>
    </footer>
  );
};

export default Footer;
