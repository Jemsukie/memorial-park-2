import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

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
          name="longitude"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Longitude
        </Label>

        <TextField
          name="longitude"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
          defaultValue={defaultValue ? defaultValue.longitude : ''}
        />

        <FieldError name="longitude" className="rw-field-error" />

        <Label
          name="latitude"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Latitude
        </Label>

        <TextField
          name="latitude"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
          defaultValue={defaultValue ? defaultValue.latitude : ''}
        />

        <FieldError name="latitude" className="rw-field-error" />

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
