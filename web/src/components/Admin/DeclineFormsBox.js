import { Button } from 'react-bootstrap'

import { useMutation, useQuery } from '@redwoodjs/web'

const DELETE_DECEASED_MUTATION = gql`
  mutation DeleteDeceasedMutation($id: Int!) {
    deleteDeceased(id: $id) {
      id
    }
  }
`

const FIND_DECEASED_OF_USERS_BY_DECEASED = gql`
  query FindDeceasedOfUsersByDeceased($deceasedId: Int!) {
    deceasedOfUsersByDeceased: deceasedOfUsersByDeceased(
      deceasedId: $deceasedId
    ) {
      id
    }
  }
`

const DELETE_DECEASED_OF_USER_MUTATION = gql`
  mutation DeleteDeceasedOfUserMutation($id: Int!) {
    deleteDeceasedOfUser(id: $id) {
      id
    }
  }
`

const FetchDeceasedOfUsers = (deceasedId) => {
  const { data } = useQuery(FIND_DECEASED_OF_USERS_BY_DECEASED, {
    variables: { deceasedId },
  })

  return data || []
}

const GetByDeceaseds = (id) => {
  const data = FetchDeceasedOfUsers(id)
  const { deceasedOfUsersByDeceased } = data

  return deceasedOfUsersByDeceased || []
}

const DeclineFormsBox = (props) => {
  const { id } = props
  const list = GetByDeceaseds(id)

  const [deleteDeceased] = useMutation(DELETE_DECEASED_MUTATION, {
    onCompleted: () => {
      window.alert('Deceased deleted!')
      window.location.reload()
    },
    onError: (error) => {
      window.alert(error.message)
    },
  })

  const [deleteDeceasedOfUser] = useMutation(DELETE_DECEASED_OF_USER_MUTATION)

  const DeleteThis = () => {
    list.forEach((l) => {
      deleteDeceasedOfUser({ variables: { id: l.id } })
    })

    // // We need to implement delete on DeceasedOfUser first
    // //
    deleteDeceased({
      variables: {
        id,
      },
    })
  }

  return (
    <>
      <p>Are you sure to delete/decline?</p>
      <Button className="mx-1" variant="danger" onClick={DeleteThis}>
        Delete
      </Button>
    </>
  )
}

export default DeclineFormsBox
