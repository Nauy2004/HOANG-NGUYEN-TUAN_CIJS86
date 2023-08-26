import { useState, createContext, useEffect } from 'react'
export const TodoContext = createContext({})

function getlocalStorage() {
  let tododata = JSON.parse(localStorage.getItem("todoList"))
  if (tododata) {
    return tododata
  } else {
    localStorage.setItem('todoList', JSON.stringify([]))
  }
}
export const TodoProvider = ({ children }) => {
  let todoStora = getlocalStorage()
  //khởi tạo danh sách state lưu các task hiển thị
  let [allTask, setAllTask] = useState(todoStora)
  // hàm thay đổi trạng thái checkbox
  let onHandlerChange = (taskChecked) => {
    console.log(taskChecked)
    let findTask = allTask.findIndex((taskItem) => {
      return taskItem.id == taskChecked.target.name
    })
    let newArr = [...allTask]
    newArr[findTask].status = !taskChecked.target.checked
    localStorage.setItem('todoList', JSON.stringify(newArr))
    setAllTask(newArr)
  }
  //hàm xử lý xóa task
  let handlerDelete = (id) => {

    let findTask = allTask.findIndex((taskItem) => {
      return taskItem.id === id
    })
    let newArr = [...allTask]
    newArr.splice(findTask, 1)
    localStorage.setItem('todoList', JSON.stringify(newArr))
    setAllTask(newArr)
  }
  let headlerDeleteAll = () => {
    let newArr = [...allTask]
    let filtered = newArr.filter(function (value) {
      return value.status;
    });
    localStorage.setItem('todoList', JSON.stringify(filtered))
    setAllTask(filtered)

  }
  // khởi tạo danh sách state lưu giá trị input
  let [valueInput, setValueInput] = useState('')
  // hàm event lấy giá trị input 
  let hendlerValueInput = (e) => {
    let str = valueInput.slice()
    str = e.target.value
    setValueInput(str)
  }
  // hàm thêm phần tử vào danh sách state lưu các task hiển thị
  const onAddTodo = (newTodo) => {
    let isTrue = true
    allTask.map((itemtask) => {
      if (itemtask.taskName.toUpperCase() === newTodo.taskName.toUpperCase()) {
        window.alert('đã tồn tại')
        isTrue = false
      }
    })
    if (isTrue) {
      if (todoStora) {
        let arr = todoStora
        arr.push((newTodo))
        localStorage.setItem('todoList', JSON.stringify(arr))
        setAllTask(arr)
      } else {
        localStorage.setItem('todoList', JSON.stringify([newTodo]))
      }
    }
  };
  // hàm event onClick đẩy dữ liệu vào hàm thêm phần tử
  const onClickAddButton = () => {
    const newTodo = {
      id: crypto.randomUUID(),
      taskName: valueInput,
      status: true,
    };
    onAddTodo(newTodo);
  };
  let renderAllTask = () => {
    return allTask.map((itemTask, index) => {
      let style = ""
      let checkbox = ''
      if (!itemTask.status) {
        style = "text-decoration-line-through"
        checkbox = <input type="checkbox" name={itemTask.id} onChange={onHandlerChange} checked/>
      } else {
        style = ""
        checkbox = <input type="checkbox" name={itemTask.id} onChange={onHandlerChange}/>
      }
      return (
        <div key={itemTask.id} className='group-check d-flex w-100'>
          <div className='form-check'>
            {checkbox}
            <span className={style} >{itemTask.taskName}</span>
          </div>
        </div>
      )
    })
  }
  let renderActiveTask = () => {
    return allTask.map((itemTask) => {
      if (itemTask.status) {
        return (
          <div key={itemTask.id} className='group-check d-flex w-100'>
            <div className='form-check'>
              <input type="checkbox" name="" />
              <span>{itemTask.taskName}</span>
            </div>
          </div>
        )
      }
    })
  }
  let renderCompletedTask = () => {
    return allTask.map((itemTask, index) => {
      if (!itemTask.status) {
        return (
          <div key={itemTask.id} className='group-check d-flex w-100'>
            <div className='form-check'>
              <input type="checkbox" name="" checked/>
              <span className='text-decoration-line-through'>{itemTask.taskName}</span>
            </div>
            <button type='button' onClick={() => handlerDelete(itemTask.id)}>
              <i className="bi bi-trash3"></i>
            </button>
          </div>
        )
      }
    })
  }
  return <TodoContext.Provider value={
    {
      onClickAddButton, hendlerValueInput,
      handlerDelete, onHandlerChange, allTask,
      setAllTask, valueInput, setValueInput,
      renderActiveTask, renderCompletedTask, renderAllTask,
      headlerDeleteAll
    }
  }>
    {children}
  </TodoContext.Provider>

}
