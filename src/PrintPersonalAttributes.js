import React from 'react'

export default function PrintPersonalAttributes(props) {
  const {obj} = props
  console.log(obj)
  return (
    <div>
        <p>Height: {obj.height}</p>
        <p>
          Weight: {obj.weightLog[obj.weightLog.length - 1]}
        </p>
        <input type="text" placeholder="New weight" id="weight"></input>
        <button>Update</button>
        <p>Body Fat Percentage: {obj.bodyFatLog[obj.bodyFatLog.length - 1]}</p>
        <p>Fat Mass: {obj.fatMass[obj.fatMass.length - 1]}</p>
        <p>Lean Mass: {obj.leanMass[obj.leanMass.length - 1]}</p>
        <button>Calculate Body Fat</button>
        <p>Goal Weight: {obj.goalWeight}</p>
        <input type="text" placeholder="New goal weight" id="goalWeight"></input>
        <button>Update</button>
        <p>Goal Body Fat: {obj.goalBodyFat}</p>
        <input type="text" placeholder="New body fat goal" id="goalBodyFat"></input>
        <button>Update</button>
    </div>
  )
}
