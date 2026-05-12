
import './App.css'
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import {Toaster} from 'react-hot-toast'
import ProtectedRoute from './ProtectedRoute'

function App() {


  return (
    <>
    <Toaster/>
 
  
    <Routes>
      
      <Route path='/' element={<Register/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/home' element={
        
          <Home/>}>
          </Route>
    
    </Routes>
    
    
      
    </>
  )
}

export default App
