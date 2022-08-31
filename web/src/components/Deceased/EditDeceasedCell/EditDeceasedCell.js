import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import DeceasedForm from 'src/components/Deceased/DeceasedForm'

export const QUERY = gql`
  query EditDeceasedById($id: Int!) {
    deceased: deceased(id: $id) {
      id
      firstName
      lastName
      dateBorn
      dateDied
      latitude
      longitude
      status
      createdAt
    }
  }
`
const UPDATE_DECEASED_MUTATION = gql`
  mutation UpdateDeceasedMutation($id: Int!, $input: UpdateDeceasedInput!) {
    updateDeceased(id: $id, input: $input) {
      id
      firstName
      lastName
      dateBorn
      dateDied
      latitude
      longitude
      status
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ deceased }) => {
  const [updateDeceased, { loading, error }] = useMutation(
    UPDATE_DECEASED_MUTATION,
    {
      onCompleted: () => {
        toast.success('Deceased updated')
        navigate(routes.deceaseds())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateDeceased({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Deceased {deceased.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <DeceasedForm
          deceased={deceased}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
