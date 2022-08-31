import humanize from 'humanize-string'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/DeceasedOfUser/DeceasedOfUsersCell'

const DELETE_DECEASED_OF_USER_MUTATION = gql`
  mutation DeleteDeceasedOfUserMutation($id: Int!) {
    deleteDeceasedOfUser(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

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

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
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

const DeceasedOfUsersList = ({ deceasedOfUsers }) => {
  const [deleteDeceasedOfUser] = useMutation(DELETE_DECEASED_OF_USER_MUTATION, {
    onCompleted: () => {
      toast.success('DeceasedOfUser deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete deceasedOfUser ' + id + '?')) {
      deleteDeceasedOfUser({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>User id</th>
            <th>Deceased id</th>
            <th>Created at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {deceasedOfUsers.map((deceasedOfUser) => (
            <tr key={deceasedOfUser.id}>
              <td>{truncate(deceasedOfUser.id)}</td>
              <td>{truncate(deceasedOfUser.userId)}</td>
              <td>{truncate(deceasedOfUser.deceasedId)}</td>
              <td>{timeTag(deceasedOfUser.createdAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.deceasedOfUser({ id: deceasedOfUser.id })}
                    title={
                      'Show deceasedOfUser ' + deceasedOfUser.id + ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editDeceasedOfUser({ id: deceasedOfUser.id })}
                    title={'Edit deceasedOfUser ' + deceasedOfUser.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete deceasedOfUser ' + deceasedOfUser.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(deceasedOfUser.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DeceasedOfUsersList
