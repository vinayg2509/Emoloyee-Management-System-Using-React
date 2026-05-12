import './App.css'
import  AddEmployeeComponent from './component/AddEmployeeComponent'
import HeaderComponent from './component/HeaderComponent'
import ListEmployeeComponent from './component/ListEmployeeComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (

    <BrowserRouter>
    <HeaderComponent></HeaderComponent>
      <Routes>
        <Route path='/home' element={<ListEmployeeComponent/>}/>
        <Route path='/getall' element={<ListEmployeeComponent/>}/>
        <Route path='/add-employee' element={<AddEmployeeComponent/>}/>
        <Route path='/update-employee/:id' element={<AddEmployeeComponent/>}/>

      </Routes>

    </BrowserRouter>
  )
}

export default App