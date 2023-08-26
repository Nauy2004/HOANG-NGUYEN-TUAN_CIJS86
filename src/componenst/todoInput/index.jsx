import './todoInput.css'
import React, { useContext } from 'react'
import { TodoContext } from '../../context/context'

function TodoInput() {
  const {hendlerValueInput,onClickAddButton} = useContext(TodoContext)
  return (
    <div className='form-input d-flex'>
        <input type="text" placeholder='Enter new task' onChange={hendlerValueInput} />
        <button className='btn-add' onClick={onClickAddButton}>ADD</button>
    </div>
  )
}

export default TodoInput