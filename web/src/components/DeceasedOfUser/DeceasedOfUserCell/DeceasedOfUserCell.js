import DeceasedOfUser from 'src/components/DeceasedOfUser/DeceasedOfUser'

export const QUERY = gql`
  query FindDeceasedOfUserById($id: Int!) {
    deceasedOfUser: deceasedOfUser(id: $id) {
      id
      userId
      deceasedId
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>DeceasedOfUser not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ deceasedOfUser }) => {
  return <DeceasedOfUser deceasedOfUser={deceasedOfUser} />
}
