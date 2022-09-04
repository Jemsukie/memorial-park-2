import { render } from '@redwoodjs/testing/web'

import AdminSettingsPage from './AdminSettingsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AdminSettingsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminSettingsPage />)
    }).not.toThrow()
  })
})
