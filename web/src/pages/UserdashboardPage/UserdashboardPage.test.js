import { render } from '@redwoodjs/testing/web'

import UserdashboardPage from './UserdashboardPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('UserdashboardPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserdashboardPage />)
    }).not.toThrow()
  })
})
