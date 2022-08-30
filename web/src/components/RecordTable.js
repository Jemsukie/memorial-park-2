import { Table } from 'react-bootstrap'

// This is the main component
const RecordTable = (props) => {
  const { data = [], columnNames, columnProps } = props

  // Let's create column tabs
  const ColumnElement = () => {
    return columnNames.map((cn, idx) => {
      return <th key={idx}>{cn}</th>
    })
  }

  // Arrange Columns
  const ColumnData = () => {
    return data.map((d, idx) => {
      return <RowData key={idx} data={d} />
    })
  }

  // Arrange Cells of Row
  const RowData = (props) => {
    const { data } = props

    const ComposeColumn = () => {
      return columnProps.map((cp, idx) => {
        return <td key={idx}>{data[cp]}</td>
      })
    }

    return (
      <tr>
        <ComposeColumn />
      </tr>
    )
  }

  if (data.length > 0) {
    return (
      <>
        <Table striped bordered hover>
          <thead>
            <tr>
              <ColumnElement />
            </tr>
          </thead>
          <tbody>
            <ColumnData data={data} />
          </tbody>
        </Table>
      </>
    )
  } else {
    return <p>No Records Yet...</p>
  }
}

export default RecordTable
