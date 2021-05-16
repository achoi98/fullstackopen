import React from 'react'

const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
  }
  
  const Total = ({ course }) => {
    const reducer = (acc, curr) => acc + curr.exercises
    const sum = course.parts.reduce(reducer, 0)
    return(
      <p><strong>Total of {sum} exercises</strong></p>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(part => <Part part={part} key={part.id}/>)}
      </div>
    )
  }
  
  const Course = ({ courses }) => {
    return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => {
        return (
        <div key={course.id}>
          <Header course={course} />
          <Content course={course} />
          <Total course={course} />
          </div>
        )
      } ) }
    </div>
    )
  }
  
export default Course