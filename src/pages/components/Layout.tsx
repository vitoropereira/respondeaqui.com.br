import Footer from "./Footer"
import Header from "./Header"

const Layout: React.FC = ({ children }) => {
  return (
    <div className="mx-auto px-4 sm:px-6 md:px-8">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout