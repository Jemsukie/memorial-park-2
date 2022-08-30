// import Navigate from 'src/components/Navigate'
import NavMenu from 'src/components/NavMenu'

const MainLayout = ({ children }) => {
  const { props } = children

  return (
    <>
      <NavMenu props={props} />
      <main>{children}</main>
    </>
  )
}

export default MainLayout
