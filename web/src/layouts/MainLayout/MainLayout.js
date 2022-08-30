import Navigate from 'src/components/Navigate'

const MainLayout = ({ children }) => {
  return (
    <>
      <Navigate item={children} />
      <main>{children}</main>
    </>
  )
}

export default MainLayout
