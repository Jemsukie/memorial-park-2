import { useRef } from 'react'
import { useEffect } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Form, Label, TextField, FieldError, Submit } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { Toaster } from '@redwoodjs/web/toast'
const UPDATE_USER = gql`
  mutation UpdateUser($id: Int!, $input: UpdateUserInput!) {
    updateUser: updateUser(id: $id, input: $input) {
      id
    }
  }
`

const FormSettings = () => {
  const { isAuthenticated, currentUser } = useAuth()

  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      window.alert('Account Updated!')
      setTimeout(() => {
        window.location.reload()
      }, 3000)
    },
    onError: (error) => {
      window.alert(error.message)
    },
  })

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(routes.login())
    }
  }, [isAuthenticated])

  // focus on email box on page load
  const usernameRef = useRef()
  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  const onSubmit = async (data) => {
    const verify = window.confirm('Confirm changes?')

    if (verify) {
      updateUser({
        variables: {
          id: currentUser.id,
          input: {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
          },
        },
      })
    }
    // if (data.password !== data.confirmPassword) {
    //   alert('Password not Match!')
    //   return
    // } else {
    //   const response = await signUp({ ...data })

    //   if (response.message) {
    //     toast(response.message)
    //   } else if (response.error) {
    //     toast.error(response.error)
    //   } else {
    //     // user is signed in automatically
    //     toast.success('Welcome!')
    //   }
    // }
  }

  return (
    <>
      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">Edit Details</h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
                  {/* Email */}
                  <Label
                    name="username"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Email
                  </Label>
                  <TextField
                    name="username"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    ref={usernameRef}
                    defaultValue={currentUser.email}
                    validation={{
                      required: {
                        value: true,
                        message: 'Email is required',
                      },
                    }}
                  />
                  <FieldError name="username" className="rw-field-error" />

                  {/* First Name */}
                  <Label
                    name="firstName"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    First Name
                  </Label>
                  <TextField
                    name="firstName"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    autoComplete="current-firstName"
                    defaultValue={currentUser.firstName}
                    validation={{
                      required: {
                        value: true,
                        message: 'First name is required',
                      },
                    }}
                  />
                  <FieldError name="firstName" className="rw-field-error" />

                  {/* First Name */}
                  <Label
                    name="lastName"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Last Name
                  </Label>
                  <TextField
                    name="lastName"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    autoComplete="current-lastName"
                    defaultValue={currentUser.lastName}
                    validation={{
                      required: {
                        value: true,
                        message: 'last name is required',
                      },
                    }}
                  />
                  <FieldError name="lastName" className="rw-field-error" />

                  <div className="rw-button-group">
                    <Submit className="rw-button rw-button-blue">Submit</Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          {/* <div className="rw-login-link">
            <span>Already have an account?</span>{' '}
            <Link to={routes.login()} className="rw-link">
              Log in!
            </Link>
          </div> */}
        </div>
      </main>
    </>
  )
}

export default FormSettings
