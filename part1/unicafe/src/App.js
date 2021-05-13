import React, { useState } from 'react'

const Header = (props) => {
  return <div><h1>{props.text}</h1></div>
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const DisplayStatistics = ({ text, value }) => <p>{text} {value}</p>

const GetTotal = (props) => (
  props.good + props.neutral + props.bad
)

const Average = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return 0
  }
  return (
    (good - bad) / (good + neutral + bad)
  )
}

const Positive = ({ good, total }) => {
  if (total === 0) return 0
  return ((good / total) * 100 + ' %')
}

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  
  if (good === 0 && neutral === 0 && bad === 0) return 'No feedback given'
  return (
    <table>
      <tr>
        <td>good</td>
        <td>{good}</td>
      </tr>
      <tr>
        <td>neutral</td>
        <td>{neutral}</td>
      </tr>
        <tr><td>bad</td>
        <td>{bad}</td>
      </tr>
      <tr>
        <td>total</td>
        <td>{good + neutral + bad}</td>
      </tr>
      <tr>
        <td>average</td>
        <td>{<Average good={good} neutral={neutral} bad={bad}/>}</td>
      </tr>
      <tr>
        <td>positive</td>
        <td>{<Positive good={good} total={good + neutral + bad} />}</td>
      </tr>
    </table>
  )
}



const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text='give feedback' />
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad+1)} text='bad' />
      <Header text='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App