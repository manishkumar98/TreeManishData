import React from 'react'
import { render } from 'react-dom'
import { Provider } from './statty'
import generateTree from './generateTree'
import Node from './containers/Node'

const tree = generateTree()

render(
  <Provider state={tree}>
    <Node id={0} />
  </Provider>,
  document.getElementById('root')
)