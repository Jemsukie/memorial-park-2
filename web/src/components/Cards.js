import { Button, Card } from 'react-bootstrap'

const Cards = (props) => {
  const { name, text, number, addClassName, func } = props

  return (
    <Card>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        {number}
        <Card.Text>{text}</Card.Text>

        <Button
          variant={addClassName}
          onClick={() => {
            func(name)
          }}
        >
          → Check Records
        </Button>
      </Card.Body>
    </Card>
  )
}

export default Cards
