import { useAuth } from '@redwoodjs/auth'
import { useQuery } from '@redwoodjs/web'

import HighChartsMap from '../HighchartsMap'
import Modals from '../Modals'
import RecordTable from '../RecordTable'

import DeleteFormsBox from './DeleteFormsBox'
import UpdateFormsBox from './UpdateFormsBox'

const FIND_USER = gql`
  query FindUser($id: Int!) {
    user: user(id: $id) {
      id
      email
      firstName
      lastName
      hashedPassword
      salt
      createdAt
      roles
      deceaseds {
        deceased {
          id
          firstName
          lastName
          dateBorn
          dateDied
          latitude
          longitude
          status
        }
      }
    }
  }
`

const FetchFromDB = () => {
  const { currentUser } = useAuth()
  const { data } = useQuery(FIND_USER, {
    variables: { id: currentUser.id },
  })

  return data || []
}

const GetUserData = () => {
  const data = FetchFromDB()
  const { user } = data

  return user || ''
}

const getDeceasedList = () => {
  const user = GetUserData()
  const { deceaseds } = user

  return deceaseds || []
}

const GetResult = (getList, statusFilter) => {
  const result =
    getList.map((g) => {
      return g.deceased
    }) || []

  return (
    result
      .filter((d) => {
        if (d.status === statusFilter) {
          return true
        }
        return false
      })
      .map((d) => {
        const dateBorn = new Date(d.dateBorn)
        const dateDied = new Date(d.dateDied)
        const name = `${d.firstName} ${d.lastName}`

        return {
          id: d.id,
          name,
          dateBorn: dateBorn.toDateString(),
          dateDied: dateDied.toDateString(),
          status: d.status,
        }
      }) || []
  )
}

const DeceasedList = (props) => {
  const columnStructure = {
    request: {
      names: ['ID', 'Name', 'Born', 'Died', 'Actions'],
      props: [
        'id',
        'name',
        'dateBorn',
        'dateDied',
        (props) => {
          const { id } = props
          return (
            <>
              <Modals
                variant={'success'}
                text={'Update'}
                icon={''}
                comp={<UpdateFormsBox id={id} />}
              />
              <Modals
                variant={'danger'}
                text={'Delete'}
                icon={''}
                comp={<DeleteFormsBox id={id} />}
              />
            </>
          )
        },
      ],
    },
    approved: {
      names: ['ID', 'Name', 'Born', 'Died', 'Actions'],
      props: [
        'id',
        'name',
        'dateBorn',
        'dateDied',
        (props) => {
          const { id } = props
          return (
            <>
              <Modals
                variant={'info'}
                text={'View'}
                icon={''}
                comp={<HighChartsMap />}
              />
              <Modals
                variant={'success'}
                text={'Update'}
                icon={''}
                comp={<UpdateFormsBox id={id} />}
              />
              <Modals
                variant={'danger'}
                text={'Delete'}
                icon={''}
                comp={<DeleteFormsBox id={id} />}
              />
            </>
          )
        },
      ],
    },
  }

  const getList = getDeceasedList() || []
  const { statusFilter } = props

  const getResult = GetResult(getList, statusFilter)

  return (
    <RecordTable
      data={getResult}
      columnNames={columnStructure[statusFilter].names}
      columnProps={columnStructure[statusFilter].props}
    />
  )
}

export default DeceasedList
