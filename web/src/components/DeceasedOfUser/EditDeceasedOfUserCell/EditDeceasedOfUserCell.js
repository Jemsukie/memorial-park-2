import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import DeceasedOfUserForm from 'src/components/DeceasedOfUser/DeceasedOfUserForm'

export const QUERY = gql`
  query EditDeceasedOfUserById($id: Int!) {
    deceasedOfUser: deceasedOfUser(id: $id) {
      id
      userId
      deceasedId
      createdAt
    }
  }
`
const UPDATE_DECEASED_OF_USER_MUTATION = gql`
  mutation UpdateDeceasedOfUserMutation(
    $id: Int!
    $input: UpdateDeceasedOfUserInput!
  ) {
    updateDeceasedOfUser(id: $id, input: $input) {
      id
      userId
      deceasedId
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ deceasedOfUser }) => {
  const [updateDeceasedOfUser, { loading, error }] = useMutation(
    UPDATE_DECEASED_OF_USER_MUTATION,
    {
      onCompleted: () => {
        toast.success('DeceasedOfUser updated')
        navigate(routes.deceasedOfUsers())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    const castInput = Object.assign(input, {
      userId: parseInt(input.userId),
      deceasedId: parseInt(input.deceasedId),
    })
    updateDeceasedOfUser({ variables: { id, input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit DeceasedOfUser {deceasedOfUser.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <DeceasedOfUserForm
          deceasedOfUser={deceasedOfUser}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
