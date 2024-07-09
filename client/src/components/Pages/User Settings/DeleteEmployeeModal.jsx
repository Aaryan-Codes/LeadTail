import { message, Modal } from "antd";
import { DeleteEmployee } from "../../../API/employeeAPIcalls";

const DeleteEmployeeModal = ({
    isDeleteEmployeeModalOpen,
    setIsDeleteEmployeeModalOpen,
    selectedEmployee,
    setSelectedEmployee,
    getData
  }) => {
  
      const handleDelete = async () =>{
          try {
            const empID = selectedEmployee._id;
            const response = await DeleteEmployee({empID});
            if(response.success){
              message.success(response.message);
              setSelectedEmployee(null);
              getData();
            }else{
              message.error(response.message);
              setSelectedEmployee(null);
            }
            setIsDeleteEmployeeModalOpen(false);
          } catch (error) {
            setIsDeleteEmployeeModalOpen(false);
            message.error(error.message);
          }
      }
  
      const handleCancel = () =>{
          setSelectedEmployee(null);
          setIsDeleteEmployeeModalOpen(false);
      }
  
    return (
      <>
        <Modal open={isDeleteEmployeeModalOpen} centered footer={false}>
          <h1 className="text-3xl font-semibold text-center pb-4" >Delete Employee?</h1>
          <p className="text-center">Are you sure you want to delete this employee?</p>
          <p className="text-center">This action can't be undone and you'll lose the employee data</p>
          <div className="flex justify-around w-full pt-4">
              <button className="px-4 py-2 bg-[#1677ff] text-white rounded-lg shadow-lg" onClick={handleDelete}>
                  Delete
              </button>
              <button className="px-4 py-2 bg-[#1677ff] text-white rounded-lg shadow-lg" onClick={handleCancel}>
                  Cancel
              </button>
          </div>
        </Modal>
      </>
    );
  };
  
  export default DeleteEmployeeModal;