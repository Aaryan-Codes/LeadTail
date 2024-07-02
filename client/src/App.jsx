import './App.css'
import HomePage from './components/Pages/HomePage'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './components/Pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Pages/Login';
import LeadCenter from './components/Pages/Admin/LeadCenter';

function App() {
 
  

  return (
    <div>
      
      <BrowserRouter>
      
      <Routes>

        <Route path='/*' element={<ProtectedRoute><HomePage/></ProtectedRoute>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>} />
        <Route path='/leadcenter' element={<ProtectedRoute><LeadCenter/></ProtectedRoute>} />

      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
