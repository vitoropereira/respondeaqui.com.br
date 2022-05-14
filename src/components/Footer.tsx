import Link from "next/link";

const Footer = () => {
  return (
    <footer className="max-w-4xl m-auto text-center text-gray-700 mt-6 pl-4 pr-4">
      2021© Todos os direitos reservados.{" "}
      <Link href="https://www.portaldev.digital/" target="_blank">
        <a
          href="https://www.portaldev.digital/"
          target="_blank"
          rel="noreferrer"
        >
          <b>www.portaldev.digital</b>
        </a>
      </Link>
    </footer>
  );
};

export default Footer;
