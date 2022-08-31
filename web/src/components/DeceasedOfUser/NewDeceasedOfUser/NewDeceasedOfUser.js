import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import DeceasedOfUserForm from 'src/components/DeceasedOfUser/DeceasedOfUserForm'

const CREATE_DECEASED_OF_USER_MUTATION = gql`
  mutation CreateDeceasedOfUserMutation($input: CreateDeceasedOfUserInput!) {
    createDeceasedOfUser(input: $input) {
      id
    }
  }
`

const NewDeceasedOfUser = () => {
  const [createDeceasedOfUser, { loading, error }] = useMutation(
    CREATE_DECEASED_OF_USER_MUTATION,
    {
      onCompleted: () => {
        toast.success('DeceasedOfUser created')
        navigate(routes.deceasedOfUsers())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    const castInput = Object.assign(input, {
      userId: parseInt(input.userId),
      deceasedId: parseInt(input.deceasedId),
    })
    createDeceasedOfUser({ variables: { input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New DeceasedOfUser</h2>
      </header>
      <div className="rw-segment-main">
        <DeceasedOfUserForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewDeceasedOfUser
