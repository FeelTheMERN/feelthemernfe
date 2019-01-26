import React from 'react'

export default function PrintPersonalAttributes(props) {
  const {obj} = props
  console.log(obj)
  return (
    <div>
        <p>Gender: {obj.gender}</p>
        <p>Height: {obj.height}</p>
        <p>Weight: {obj.weightLog[obj.weightLog.length - 1]}</p>
        <p>Body Fat Percentage: {obj.bodyFatLog[obj.bodyFatLog.length - 1]}</p>
        {/* <p>Fat Mass: {obj.fatMass[obj.fatMass.length - 1]}</p> */}
        {/* <p>Lean Mass: {obj.leanMass[obj.leanMass.length - 1]}</p> */}
        <p>Goal Weight: {obj.goalWeight}</p>
        <p>Goal Body Fat: {obj.goalBodyFat}</p>
    </div>
  )
}
