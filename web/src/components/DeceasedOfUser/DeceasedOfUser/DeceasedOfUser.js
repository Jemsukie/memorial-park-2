import humanize from 'humanize-string'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const DELETE_DECEASED_OF_USER_MUTATION = gql`
  mutation DeleteDeceasedOfUserMutation($id: Int!) {
    deleteDeceasedOfUser(id: $id) {
      id
    }
  }
`

const formatEnum = (values) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values)
    }
  }
}

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const DeceasedOfUser = ({ deceasedOfUser }) => {
  const [deleteDeceasedOfUser] = useMutation(DELETE_DECEASED_OF_USER_MUTATION, {
    onCompleted: () => {
      toast.success('DeceasedOfUser deleted')
      navigate(routes.deceasedOfUsers())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete deceasedOfUser ' + id + '?')) {
      deleteDeceasedOfUser({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            DeceasedOfUser {deceasedOfUser.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{deceasedOfUser.id}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{deceasedOfUser.userId}</td>
            </tr>
            <tr>
              <th>Deceased id</th>
              <td>{deceasedOfUser.deceasedId}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(deceasedOfUser.createdAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editDeceasedOfUser({ id: deceasedOfUser.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(deceasedOfUser.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default DeceasedOfUser
