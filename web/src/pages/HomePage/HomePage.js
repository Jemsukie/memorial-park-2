import { MetaTags } from '@redwoodjs/web'

import HighChartsMap from 'src/components/HighchartsMap'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <div className="d-flex justify-content-center">
        <h1>HomePage</h1>
      </div>

      <HighChartsMap />
    </>
  )
}

export default HomePage
