import { MetaTags } from '@redwoodjs/web'

import FormSettings from 'src/components/FormSettings'

const AdminSettingsPage = () => {
  return (
    <>
      <MetaTags title="AdminSettings" description="AdminSettings page" />

      <div className="d-flex justify-content-center">
        <h1>Settings</h1>
      </div>
      <FormSettings />
    </>
  )
}

export default AdminSettingsPage
