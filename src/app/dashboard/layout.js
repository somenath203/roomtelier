import Header from "./_components/Header"

const Layout = ({ children }) => {
  return (
    <>
      
      <Header />

      <div className="pt-20 px-10 md:px-20 lg:px-40 xl:px-60">

        {children}

      </div>

    </>
  )
}

export default Layout
