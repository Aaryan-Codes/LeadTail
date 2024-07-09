import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import DeleteEmployeeModal from "./DeleteEmployeeModal";
import {
  GetAllEmployees,
  GetEmployeeByCompany,
} from "../../../API/employeeAPIcalls";
import { useDispatch, useSelector } from "react-redux";
import { updateEmployees } from "../../../redux/user.reducer";
import EmployeeModalForm from "./EmployeeModalForm";

const Employees = () => {
  const { employees } = useSelector((state) => state.user);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType,setFormType] = useState('add');
  const [isDeleteEmployeeModalOpen, setIsDeleteEmployeeModalOpen] =
    useState(false);
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone No.",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, data) => (
        <div className="flex gap-1">
          <Button
            title="Edit Employee"
            className="px-2"
            onClick={() => {
              setIsModalOpen(true);
              setFormType("edit");
              setSelectedEmployee(data);
            }}
          >
            <EditOutlined />
          </Button>
          <Button title="Delete Employee" className="px-2" onClick={() => {
            setIsDeleteEmployeeModalOpen(true);
            setSelectedEmployee(data);
          }}>
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];

  const getData = useCallback(async () => {
    try {
      const response = await GetEmployeeByCompany();
      console.log(1);
      if (response.success) {
        dispatch(updateEmployees(response.data));
      } else {
        message.error(response.error);
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [employees]);

  return (
    <>
      <div className="p-3 flex flex-col gap-2">
        <h1 className="pt-3 pb-4 text-2xl text-center font-semibold">Users</h1>
        <div className="flex justify-start gap-4 bg-white p-4 rounded-lg items-center">
          <button
            className="px-4 py-2 bg-[#1677ff] text-white rounded-lg shadow-lg"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Add new employee
          </button>
        </div>
        <div>
          <Table dataSource={employees} columns={columns} />
        </div>
      </div>
      {
        <EmployeeModalForm
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            selectedEmployee={selectedEmployee}
            setSelectedEmployee={setSelectedEmployee}
            formType={formType}
            setFormType={setFormType}
            getData={getData}
        />
      }
      {
        <DeleteEmployeeModal
          isDeleteEmployeeModalOpen={isDeleteEmployeeModalOpen}
          setIsDeleteEmployeeModalOpen={setIsDeleteEmployeeModalOpen}
          selectedEmployee={selectedEmployee}
          setSelectedEmployee={setSelectedEmployee}
          getData={getData}
        />
      }
    </>
  );
};

export default Employees;
