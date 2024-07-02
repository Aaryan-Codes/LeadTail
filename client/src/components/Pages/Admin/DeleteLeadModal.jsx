import { Modal, message } from "antd";
import { DeleteLead } from "../../../API/leadAPIcalls";

const DeleteLeadModal = ({
  isDeleteModelOpen,
  selectedLead,
  setIsDeleteModelOpen,
  setSelectedLead,
  getData,
}) => {

    const handleDelete = async () =>{
        try {
            const leadID = selectedLead._id;
            console.log(leadID);
            const response = await DeleteLead({leadID});
            // console.log(response);
            if(response.success){
                message.success(response.message);
                setSelectedLead(null);
                getData();
            }else{
                message.error(response.message);
                setSelectedLead(null);
            }
            setIsDeleteModelOpen(false);
        } catch (error) {
            setIsDeleteModelOpen(false);
            message.error(error.message);
        }
    }

    const handleCancel = () =>{
        setSelectedLead(null);
        setIsDeleteModelOpen(false);
    }

  return (
    <>
      <Modal open={isDeleteModelOpen} centered footer={false}>
        <h1 className="text-3xl font-semibold text-center pb-4" >Delete Lead?</h1>
        <p className="text-center">Are you sure you want to delete this lead?</p>
        <p className="text-center">This action can't be undone and you'll lose this lead data</p>
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

export default DeleteLeadModal;
