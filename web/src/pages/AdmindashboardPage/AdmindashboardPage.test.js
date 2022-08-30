import { render } from '@redwoodjs/testing/web'

import AdmindashboardPage from './AdmindashboardPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AdmindashboardPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdmindashboardPage />)
    }).not.toThrow()
  })
})
