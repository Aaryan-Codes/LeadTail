import './App.css'
import HomePage from './components/Pages/HomePage'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './components/Pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Pages/Login';
import LeadCenter from './components/Pages/Admin/LeadCenter';
import CreateUser from './components/Pages/User Settings/CreateUser';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';


function App() {
 
  const {isLoading} = useSelector((state=>state.loader));
  const dispatch = useDispatch();
  // console.log(isLoading);

  return (
    <div>
      <Spin className={`fixed top-[45%] left-[52%] z-[9] ${isLoading ? "": "hidden"}`} indicator={<LoadingOutlined spin />} size="large" />
      <BrowserRouter>
      
      <Routes>

        <Route path='/*' element={<ProtectedRoute><HomePage/></ProtectedRoute>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>} />
        <Route path='/leadcenter' element={<ProtectedRoute><LeadCenter/></ProtectedRoute>} />
        <Route path='/settings' element={<ProtectedRoute><CreateUser/></ProtectedRoute>} />

      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
