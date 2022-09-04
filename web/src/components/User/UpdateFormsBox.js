import { useMutation, useQuery } from '@redwoodjs/web'

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

const FIND_DECEASED_BY_ID = gql`
  query FindDeceasedById($id: Int!) {
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

const UpdateFormsBox = (props) => {
  const { id } = props

  const [updateDeceased, { loading, error }] = useMutation(
    UPDATE_DECEASED_MUTATION,
    {
      onCompleted: () => {
        window.alert('Deceased updated')
        window.location.reload()
      },
      onError: (error) => {
        window.alert(error.message)
      },
    }
  )

  const { data } = useQuery(FIND_DECEASED_BY_ID, {
    variables: { id },
  })

  const { deceased } = data || ''

  const onSave = (input) => {
    updateDeceased({ variables: { id, input } })
  }

  const onSubmit = (data) => {
    onSave(data)
  }

  return (
    <FormsBox
      loading={loading}
      error={error}
      onSubmit={onSubmit}
      defaultValue={deceased}
    />
  )
}

export default UpdateFormsBox
