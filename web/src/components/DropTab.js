import Cards from 'src/components/Cards'

const DropTab = (props) => {
  const { tabs, func, useCounter } = props
  const counter = useCounter()

  return tabs.map((tab, idx) => {
    return (
      <div className="col" key={idx}>
        <Cards
          name={tab.name}
          text={tab.text}
          number={counter[idx]}
          addClassName={tab.addClassName}
          func={func}
        />
      </div>
    )
  })
}

export default DropTab
