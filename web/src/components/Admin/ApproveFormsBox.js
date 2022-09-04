import { useMutation } from '@redwoodjs/web'

import FormsBox from './FormsBox'

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

const ApproveFormsBox = (props) => {
  const { id } = props

  const [updateDeceased, { loading, error }] = useMutation(
    UPDATE_DECEASED_MUTATION,
    {
      onCompleted: () => {
        window.alert('Deceased approved!')
        window.location.reload()
      },
      onError: (error) => {
        window.alert(error.message)
      },
    }
  )

  const onSave = (input) => {
    input.status = 'approved'
    updateDeceased({ variables: { id, input } })
  }

  const onSubmit = (data) => {
    onSave(data)
  }

  return (
    <>
      <p>To approve this, you must set the location coordinates first</p>
      <FormsBox loading={loading} error={error} onSubmit={onSubmit} />
    </>
  )
}

export default ApproveFormsBox
