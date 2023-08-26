import { useContext } from 'react'
import './App.css'
import TodoHeader from './componenst/todoHeader'
import TodoNavigation from './componenst/todoNavigation'
import TodoInput from './componenst/todoInput'
import { TodoProvider } from './context/context'
import TabContent from './componenst/tabContent/TabContent'
function App() {  
  let todoStyle = `todoApp container position-absolute 
  top-50 start-50 translate-middle`
  return (
    <TodoProvider>
      <div className={todoStyle}>
        <TodoHeader/>
        <TodoNavigation />
        <TodoInput />
        <TabContent/>
      </div>
    </TodoProvider>
  )
}

export default App
