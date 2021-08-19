import React from 'react'
import { Component } from 'react'
import { State } from '../statty'
import * as updaters from '../reducers'

const NodeContainer = (props) => {
  return (
    <State
      select={state => state[props.id]}
      render={(state, update) => <Node {...state} update={update} />}
     />
  )
}

export class Node extends Component {
  handleIncrementClick = () => {
    const { id } = this.props
    this.props.update(updaters.increment(id))
  }

  handleAddChildClick = e => {
    e.preventDefault()

    const { addChild, createNode, id } = this.props
    const childId = createNode().nodeId
    addChild(id, childId)
  }

  handleRemoveClick = e => {
    e.preventDefault()

    const { removeChild, deleteNode, parentId, id } = this.props
    removeChild(parentId, id)
    deleteNode(id)
  }

  renderChild = childId => {
    const { id } = this.props
    return (
      <li key={childId}>
        <NodeContainer id={childId} parentId={id} />
      </li>
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.counter !== this.props.counter
  }

  render() {
    const { counter, parentId, childIds } = this.props
    return (
      <div>
        Counter: {counter}
        {' '}
        <button onClick={this.handleIncrementClick}>
          +
        </button>
        {' '}
        {typeof parentId !== 'undefined' &&
          <a href="#" onClick={this.handleRemoveClick} // eslint-disable-line jsx-a11y/href-no-hash
             style={{ color: 'lightgray', textDecoration: 'none' }}>
            ×
          </a>
        }
        <ul>
          {childIds.map(this.renderChild)}
          <li key="add">
            <a href="#" // eslint-disable-line jsx-a11y/href-no-hash
              onClick={this.handleAddChildClick}
            >
              Add child
            </a>
          </li>
        </ul>
      </div>
    )
  }
}

export default NodeContainer
