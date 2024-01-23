import React from 'react'
import ReactDOMServer from 'react-dom/server'
import LeaderBoard from './src/pages/leaderboad'

export function render() {
  return ReactDOMServer.renderToString(<LeaderBoard />)
}
