import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Button, Select, Table, message } from "antd";
import { useEffect, useState } from "react";
import LeadCenterForm from "./LeadFormModal";
import { GetCompanyLeads } from "../../../API/leadAPIcalls";
import moment from "moment";
import DeleteLeadModal from "./DeleteLeadModal";
import LeadInfoDrawer from "./LeadInfoDrawer";
import { useSelector } from "react-redux";

const LeadCenter = () => {
  const { user } = useSelector((state) => state.user);
  const [selectedLead, setSelectedLead] = useState(null);
  const [allLeads, setAllLeads] = useState(null);
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
  const [isLeadInfoOpen, setIsLeadInfoOpen] = useState(false);
  const [formType, setFormType] = useState("add");
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    source: "",
    assigned: "",
    stage: "",
  });

  const getData = async () => {
    try {
      const response = await GetCompanyLeads({ owner: user._id });
      if (response.success) {
        const allLeads = response.data.map((item) => ({
          ...item,
          key: `lead${item._id}`,
        }));
        setAllLeads(allLeads);
        setFilteredLeads(allLeads);
      } else {
        message.error(response.error);
      }
    } catch (error) {
      console.log(error.message);
      // message.error(error.message);
    }
  };

  const filterLeads = () => {
    let filtered = allLeads;
    if (selectedFilters.source && selectedFilters.source !== "All") {
      filtered = filtered.filter(
        (lead) => lead.source === selectedFilters.source
      );
    }
    if (selectedFilters.assigned && selectedFilters.assigned !== "All") {
      filtered = filtered.filter(
        (lead) => lead.assigned === selectedFilters.assigned
      );
    }
    if (selectedFilters.stage && selectedFilters.stage !== "All") {
      filtered = filtered.filter(
        (lead) => lead.stage === selectedFilters.stage
      );
    }
    setFilteredLeads(filtered);
  };

  const handleFilterChange = (key, value) => {
    setSelectedFilters((prevState) => {
      const updatedFilters = { ...prevState, [key]: value };
      return updatedFilters;
    });
  };

  useEffect(() => {
    getData();
  }, [user]);

  useEffect(() => {
    filterLeads();
  }, [selectedFilters, allLeads]);

  const columns = [
    {
      title: "Date added",
      dataIndex: "date",
      render: (text, data) => moment(data.date).format("DD-MM-YYYY"),
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
      render: (text) => (text ? text.slice(0, 50) + "..." : "No comments"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, data) => (
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
            onClick={() => {
              setSelectedLead(data);
              setIsLeadInfoOpen(true);
            }}
          >
            <InfoCircleOutlined />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="p-3 flex flex-col gap-2">
        <h1 className="pt-3 pb-4 text-2xl text-center font-semibold">
          Lead Center
        </h1>
        <div className="flex justify-start gap-4 bg-white p-4 rounded-lg items-center">
          <button
            className="px-4 py-2 bg-[#1677ff] text-white rounded-lg shadow-lg"
            onClick={() => {
              setIsLeadFormOpen(true);
              setFormType("add");
            }}
          >
            Add new lead
          </button>

          <Select
            id="source"
            className="w-fit"
            style={{ minWidth: "100px" }}
            placeholder="Select source"
            onChange={(value) => handleFilterChange("source", value)}
            options={[
              { value: "All", label: "All" },
              { value: "Organic", label: "Organic" },
              { value: "Paid", label: "Paid" },
            ]}
          />

          <Select
            id="assigned"
            className="w-fit"
            style={{ minWidth: "120px" }}
            placeholder="Select assigned to"
            onChange={(value) => handleFilterChange("assigned", value)}
            options={[
              { value: "All", label: "All" },
              { value: "Unassigned", label: "Unassigned" },
              { value: "Person 1", label: "Person 1" },
              { value: "Person 2", label: "Person 2" },
              { value: "Person 3", label: "Person 3" },
              { value: "Person 4", label: "Person 4" },
            ]}
          />

          <Select
            id="stage"
            className="w-fit"
            style={{ minWidth: "120px" }}
            placeholder="Select stage"
            onChange={(value) => handleFilterChange("stage", value)}
            options={[
              { value: "All", label: "All" },
              { value: "Warm", label: "Warm" },
              { value: "Hot", label: "Hot" },
              { value: "Cold", label: "Cold" },
              { value: "Sale", label: "Sale" },
              { value: "Callback", label: "Callback" },
              { value: "Follow up 1", label: "Follow up 1" },
              { value: "Follow up 2", label: "Follow up 2" },
              { value: "Follow up 3", label: "Follow up 3" },
              { value: "Follow up 4", label: "Follow up 4" },
              { value: "Not Qualified", label: "Not Qualified" },
              { value: "Not Interested", label: "Not Interested" },
            ]}
          />
        </div>
        <div>
          <Table dataSource={filteredLeads} columns={columns} />
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
          setSelectedLead={setSelectedLead}
          getData={getData}
        />
      )}

      {isLeadInfoOpen && (
        <LeadInfoDrawer
          isLeadInfoOpen={isLeadInfoOpen}
          setIsLeadInfoOpen={setIsLeadInfoOpen}
          selectedLead={selectedLead}
        />
      )}
    </>
  );
};

export default LeadCenter;
