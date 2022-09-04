import { useQuery } from '@redwoodjs/web'

import HighChartsMap from '../HighchartsMap'
import Modals from '../Modals'
import RecordTable from '../RecordTable'

import ApproveFormsBox from './ApproveFormsBox'
import DeclineFormsBox from './DeclineFormsBox'
import UpdateFormsBox from './UpdateFormsBox'

const FIND_DECEASEDS = gql`
  query FindDeceaseds {
    deceaseds: deceaseds {
      id
      firstName
      lastName
      dateBorn
      dateDied
      status
      users {
        user {
          id
          email
          firstName
          lastName
        }
      }
    }
  }
`

// Let's modify the column structure for request and approved
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
              text={'Approve'}
              icon={''}
              comp={<ApproveFormsBox id={id} />}
            />
            <Modals
              variant={'danger'}
              text={'Decline'}
              icon={''}
              comp={<DeclineFormsBox id={id} />}
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
              comp={<DeclineFormsBox id={id} />}
            />
          </>
        )
      },
    ],
  },
}

const FetchFromDB = () => {
  // const { currentUser } = useAuth()
  const { data } = useQuery(FIND_DECEASEDS)

  return data || []
}

const GetDeceasedsData = () => {
  const data = FetchFromDB()
  const { deceaseds } = data

  return deceaseds || []
}

const GetResult = (getList, statusFilter) => {
  return (
    getList
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
  const getList = GetDeceasedsData() || ''
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
