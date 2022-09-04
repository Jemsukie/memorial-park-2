import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  DateField,
  Submit,
} from '@redwoodjs/forms'

const setCurrentDate = (date) => {
  const year = `${date.getFullYear()}`
  const month =
    date.getMonth() + 1 < 10
      ? `0${date.getMonth() + 1}`
      : `${date.getMonth() + 1}`
  const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`
  return `${year}-${month}-${day}`
}

const FormsBox = (props) => {
  const { onSubmit, error, loading, defaultValue } = props

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
          defaultValue={defaultValue ? defaultValue.firstName : ''}
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
          defaultValue={defaultValue ? defaultValue.lastName : ''}
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
          defaultValue={
            defaultValue ? setCurrentDate(new Date(defaultValue.dateBorn)) : ''
          }
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
          defaultValue={
            defaultValue ? setCurrentDate(new Date(defaultValue.dateDied)) : ''
          }
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
