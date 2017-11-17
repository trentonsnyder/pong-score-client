import React from 'react'

const PlayerCard = ({player, points, addPoint, submitting}) => {
  
  const pointsCount = ()  => {
    const playerPoints = points.filter(point => point.player_id === player.id)
    return playerPoints.length
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <h1>{player.name}</h1>
      <div>
        <h3>{pointsCount()}</h3>
      </div>
      <div>
        <button disabled={submitting} onClick={() => addPoint(player.id)}>+</button>
      </div>
    </div>
  )
}

export default PlayerCard