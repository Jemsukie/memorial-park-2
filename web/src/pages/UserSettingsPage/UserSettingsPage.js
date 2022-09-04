import { MetaTags } from '@redwoodjs/web'

import FormSettings from 'src/components/FormSettings'

const UserSettingsPage = () => {
  return (
    <>
      <MetaTags title="UserSettings" description="UserSettings page" />

      <div className="d-flex justify-content-center">
        <h1>Settings</h1>
      </div>
      <FormSettings />
    </>
  )
}

export default UserSettingsPage
