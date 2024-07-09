import './App.css'
import HomePage from './components/Pages/HomePage'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './components/Pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Pages/Login';
import LeadCenter from './components/Pages/Admin/LeadCenter';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import Employees from './components/Pages/User Settings/Employees';
import Dashboard from './components/Pages/DashBoard';
import { GetEmployeeByCompany } from './API/employeeAPIcalls';
import { setEmployees } from './redux/user.reducer';
import { useEffect } from 'react';



function App() {
 
  const {employees} = useSelector((state)=>state.user);
  const {isLoading} = useSelector((state=>state.loader));
  const dispatch = useDispatch();
  // console.log(isLoading);

  const getAllEmployees = async() =>{
    try {
      const response = await GetEmployeeByCompany();
      dispatch(setEmployees(response.data))
      
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(()=>{
    if(!employees || employees.length ===0){
      getAllEmployees();
    }
  },[])

  return (
    <div>
      <Spin className={`fixed top-[45%] left-[52%] z-[9] ${isLoading ? "": "hidden"}`} indicator={<LoadingOutlined spin />} size="large" />
      <BrowserRouter>
      
      <Routes>

        <Route path='/*' element={<ProtectedRoute><HomePage/></ProtectedRoute>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>} />
        <Route path='/leadcenter' element={<ProtectedRoute><LeadCenter/></ProtectedRoute>} />
        <Route path='/employees' element={<ProtectedRoute><Employees/></ProtectedRoute>} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
