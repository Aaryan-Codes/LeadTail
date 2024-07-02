import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import { Button, FloatButton, Layout, Table, message } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import LeadCenterForm from "./LeadFormModal";
import { GetAllLeads } from "../../../API/leadAPIcalls";
import moment from 'moment';
import DeleteLeadModal from "./DeleteLeadModal";
import LeadInfoDrawer from "./LeadInfoDrawer";
// import LeadInfoTab from "./LeadInfo";

const LeadCenter = () => {
  
  const [selectedLead, setSelectedLead] = useState(null);
  const [allLeads, setAllLeads] = useState(null);
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
  const [isLeadInfoOpen,setIsLeadInfoOpen] = useState(false);
  const [formType, setFormType] = useState("add");

    const getData = async() =>{
        try {
            const response = await GetAllLeads();
            if(response.success){
                const allMovies = response.data;
                // console.log(allMovies);
                setAllLeads(
                    allMovies.map((item)=>{
                        return {...item,key:`lead${item._id}`};
                    })
                )
            }else{
                message.error(response.error);
            }
        } catch (error) {
            return message.error(error.message);
        }
    }

  const columns = [
    {
      title: "Date added",
      dateIndex: "date added",
      render: (text, data) => {
        return moment(data.date).format("DD-MM-YYYY");
      },
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
    },
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
      title: "Assigned to",
      dataIndex: "assigned",
      key: "assigned",
    },
    {
      title: "Stage",
      dataIndex: "stage",
      key: "stage",
    },
    {
      title: "Comments",
      dataIndex: "comments",
      key: "comments",
      render:(text,data)=>{
        return text.slice(0,50)+"...";
      }
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, data) => {
        return (
          <div className="flex gap-1">
            <Button
            title="Edit Lead"
                className="px-2"
              onClick={() => {
                setIsLeadFormOpen(true);
                setFormType("edit");
                setSelectedLead(data);
              }}
            >
              <EditOutlined />
            </Button>
            <Button
            title="Delete Lead"
            className="px-2"
              onClick={() => {
                setIsDeleteModelOpen(true);
                setSelectedLead(data);
              }}
            >
              <DeleteOutlined />
            </Button>
            <Button
            title="Lead Info"
            className="px-2"
            onClick={()=>{
                setSelectedLead(data);
                setIsLeadInfoOpen(true);
                console.log(data)
            }}
            >
                <InfoCircleOutlined/>
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(()=>{
    getData();
  },[])

  return (
    <>
      <div className="p-3 flex flex-col gap-2">
        <h1 className="pt-3 pb-4 text-2xl text-center font-semibold">
          Lead Center
        </h1>
        <div className="flex justify-between bg-white p-4 rounded-lg">
          <button className="px-4 py-2 bg-[#1677ff] text-white rounded-lg shadow-lg" onClick={()=>{
            setIsLeadFormOpen(true)
            setFormType('add')
          }}>
            Add new lead
          </button>
          <div className="flex items-center">Filters</div>
        </div>
        <div>
          <Table dataSource={allLeads} columns={columns}/>
        </div>
      </div>
      {isLeadFormOpen && (
        <LeadCenterForm
          isLeadFormOpen={isLeadFormOpen}
          setIsLeadFormOpen={setIsLeadFormOpen}
          selectedLead={selectedLead}
          setSelectedLead={setSelectedLead}
          formType={formType}
          getData={getData}
        />
      )}
      {isDeleteModelOpen && (
        <DeleteLeadModal
            isDeleteModelOpen={isDeleteModelOpen}
            selectedLead={selectedLead}
            setIsDeleteModelOpen={setIsDeleteModelOpen}
            setSelectedLead = {setSelectedLead}
            getData={getData}
        />
      )}

      {isLeadInfoOpen && (
        <LeadInfoDrawer
            isLeadInfoOpen={isLeadInfoOpen}
            setIsLeadInfoOpen={setIsLeadInfoOpen}
            selectedLead={selectedLead}
        />
      )
      }

    </>
  );
};

export default LeadCenter;
