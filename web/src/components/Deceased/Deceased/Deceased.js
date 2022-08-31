import humanize from 'humanize-string'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const DELETE_DECEASED_MUTATION = gql`
  mutation DeleteDeceasedMutation($id: Int!) {
    deleteDeceased(id: $id) {
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

const Deceased = ({ deceased }) => {
  const [deleteDeceased] = useMutation(DELETE_DECEASED_MUTATION, {
    onCompleted: () => {
      toast.success('Deceased deleted')
      navigate(routes.deceaseds())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete deceased ' + id + '?')) {
      deleteDeceased({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Deceased {deceased.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{deceased.id}</td>
            </tr>
            <tr>
              <th>First name</th>
              <td>{deceased.firstName}</td>
            </tr>
            <tr>
              <th>Last name</th>
              <td>{deceased.lastName}</td>
            </tr>
            <tr>
              <th>Date born</th>
              <td>{timeTag(deceased.dateBorn)}</td>
            </tr>
            <tr>
              <th>Date died</th>
              <td>{timeTag(deceased.dateDied)}</td>
            </tr>
            <tr>
              <th>Latitude</th>
              <td>{deceased.latitude}</td>
            </tr>
            <tr>
              <th>Longitude</th>
              <td>{deceased.longitude}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{deceased.status}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(deceased.createdAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editDeceased({ id: deceased.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(deceased.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Deceased
