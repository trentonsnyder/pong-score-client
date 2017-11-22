import React from 'react'

const PlayerCard = ({player, score, addPoint, disabled}) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <h1>{player.name}</h1>
      <div>
        <h3>{score}</h3>
      </div>
      <div>
        <button disabled={disabled} onClick={() => addPoint(player.id)}>+</button>
      </div>
    </div>
  )
}

export default PlayerCard