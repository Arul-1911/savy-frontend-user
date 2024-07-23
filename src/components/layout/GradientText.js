import React from 'react'

function GradientText({text,color}) {
  return (
    <span style={{
        background: color,
  webkitBackgroundClip: 'text',
  webkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textFillColor: 'transparent',
    }}>{text}</span>
  )
}

export default GradientText