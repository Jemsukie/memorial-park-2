// import { Form, Button } from 'react-bootstrap'
import { useAuth } from '@redwoodjs/auth'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  DateField,
  Submit,
} from '@redwoodjs/forms'
// import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
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

const FormsBox = () => {
  const { currentUser } = useAuth()

  const [createDeceased, { loading, error }] = useMutation(
    CREATE_DECEASED_MUTATION,
    {
      onCompleted: () => {
        toast.success('Deceased created')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const [createDeceasedOfUser] = useMutation(CREATE_DECEASED_OF_USER_MUTATION, {
    onCompleted: () => {
      toast.success('DeceasedOfUser created')
      alert('Record Successfully Added!')
      window.location.reload()
    },
    onError: (error) => {
      toast.error(error.message)
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

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={error}>
        <FormError
          error={error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="firstName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          First name
        </Label>

        <TextField
          name="firstName"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="firstName" className="rw-field-error" />

        <Label
          name="lastName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Last name
        </Label>

        <TextField
          name="lastName"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="lastName" className="rw-field-error" />

        <Label
          name="dateBorn"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Date born
        </Label>

        <DateField
          name="dateBorn"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="dateBorn" className="rw-field-error" />

        <Label
          name="dateDied"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Date died
        </Label>

        <DateField
          name="dateDied"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="dateDied" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default FormsBox
