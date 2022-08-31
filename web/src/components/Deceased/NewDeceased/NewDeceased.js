import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import DeceasedForm from 'src/components/Deceased/DeceasedForm'

const CREATE_DECEASED_MUTATION = gql`
  mutation CreateDeceasedMutation($input: CreateDeceasedInput!) {
    createDeceased(input: $input) {
      id
    }
  }
`

const NewDeceased = () => {
  const [createDeceased, { loading, error }] = useMutation(
    CREATE_DECEASED_MUTATION,
    {
      onCompleted: () => {
        toast.success('Deceased created')
        navigate(routes.deceaseds())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createDeceased({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Deceased</h2>
      </header>
      <div className="rw-segment-main">
        <DeceasedForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewDeceased
