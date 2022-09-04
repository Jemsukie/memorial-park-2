import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'

import FormsBox from './FormsBox'
const CREATE_DECEASED_MUTATION = gql`
  mutation CreateDeceasedMutation($input: CreateDeceasedInput!) {
    createDeceased(input: $input) {
      id
    }
  }
`

const CREATE_DECEASED_OF_USER_MUTATION = gql`
  mutation CreateDeceasedOfUserMutation($input: CreateDeceasedOfUserInput!) {
    createDeceasedOfUser(input: $input) {
      id
    }
  }
`

const AddFormsBox = () => {
  const { currentUser } = useAuth()

  const [createDeceased, { loading, error }] = useMutation(
    CREATE_DECEASED_MUTATION,
    {
      onCompleted: () => {
        console.log('Record Successfully Added!')
      },
      onError: (error) => {
        console.log(error.message)
      },
    }
  )

  const [createDeceasedOfUser] = useMutation(CREATE_DECEASED_OF_USER_MUTATION, {
    onCompleted: () => {
      window.alert('Record Successfully Added!')
      window.location.reload()
    },
    onError: (error) => {
      window.alert(error.message)
    },
  })

  const autoAssoc = (data) => {
    const { createDeceased } = data

    const input = {
      userId: currentUser.id,
      deceasedId: createDeceased.id,
    }
    createDeceasedOfUser({
      variables: { input },
    })
  }

  const onSave = async (input) => {
    const { data } = await createDeceased({ variables: { input } })
    autoAssoc(data)
  }

  const onSubmit = (data) => {
    onSave(data)
  }

  return <FormsBox loading={loading} error={error} onSubmit={onSubmit} />
}

export default AddFormsBox
