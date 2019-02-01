import React from 'react'

export default function PrintPersonalAttributes(props) {
  const {obj} = props
  return (
    <div>
      <div className="box">
        <p>Height:</p><p>{obj.height} cm</p>
      </div>
      <div className="box">
        <p>Weight:</p><p>{obj.weightLog[obj.weightLog.length - 1]} kg</p>
        <div>
          <input type="text" placeholder="New weight" id="weight"></input>
          <button>Update</button>
        </div>
      </div>
      { obj.bodyFatLog[obj.bodyFatLog.length - 1] && <div className="box">
        <p>Body Fat:</p><p>{obj.bodyFatLog[obj.bodyFatLog.length - 1].toFixed(2)} %</p>
      </div>}
      {obj.fatMass[obj.fatMass.length - 1] && <div className="box">
        <p>Fat Mass:</p><p>{obj.fatMass[obj.fatMass.length - 1].toFixed(2)} %</p>
      </div>}
      {obj.leanMass[obj.leanMass.length - 1] && <div className="box">
        <p>Lean Mass:</p><p>{obj.leanMass[obj.leanMass.length - 1].toFixed(2)} %</p>
      </div>}
        <button>Calculate Body Fat</button>
      <div className="box">
        <p>Goal Weight:</p><p>{obj.goalWeight} kg</p>
        <div>
          <input type="text" placeholder="New goal weight" id="goalWeight"></input>
          <button>Update</button>
        </div>
      </div>
      <div className="box">
        <p>Goal Body Fat:</p><p>{obj.goalBodyFat} %</p>
        <div>
          <input type="text" placeholder="New goal body fat" id="goalBodyFat"></input>
          <button>Update</button>
        </div>
      </div>
    </div>
  )
}
