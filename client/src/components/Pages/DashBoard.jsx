import { useEffect, useState } from "react";
import { GetCompanyLeads } from "../../API/leadAPIcalls";
import { useSelector } from "react-redux";
import StagePieChart from "./Charts/StagePieChart";
import EmployeeBarChart from "./Charts/EmployeeBarChart";
import LeadsByDateChart from "./Charts/LeadsLineChart";
import { Statistic } from "antd";
import moment from "moment";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const [leadsData, setLeadsData] = useState(null);
  const [pipelineLeads, setPipelineLeads] = useState(0);
  const [leadsToday,setLeadsToday] = useState(0);

  const getAllLeads = async () => {
    try {
      const response = await GetCompanyLeads({ owner: user._id });
      if (response.success) {
        const data = response.data.map((item) => {
          {
            console.log(item.date);
            // console.log(moment(Date.now()).format("DD-MM-YYYY"))
            if (item.stage === "Hot" || item.stage === "Warm") {
              setPipelineLeads((prev) => prev + 1);
            }
            if(item.date === moment(Date.now()).format("YYYY-MM-DD")){
                setLeadsToday((prev)=>prev+1);
            }
            return { ...item, key: `lead${item._id}` };
          }
        });
        setLeadsData(data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllLeads();
  }, [user]);

  return (
    <div className="p-3 flex flex-col items-center bg-white">
      <div className="flex w-full flex-col gap-20">
        <div className="flex flex-col">
        <h1 className='text-center text-3xl font-semibold'>Overview</h1>
          {/* Calender Chart */}
          <div className="flex justify-evenly mt-3">
            <Statistic
              title="Total Active Leads"
              value={leadsData ? leadsData.length : ""}
              className="shadow-md py-2 w-[150px] text-center rounded-lg"
            />
            <Statistic
              title="Pipeline Stage"
              value={pipelineLeads}
              className="shadow-md py-2 w-[150px] text-center rounded-lg"
            />
            <Statistic title="Today&#39;s Leads" 
                className="shadow-md py-2 w-[150px] text-center rounded-lg"
                value={leadsToday}
            />
          </div>
         <div className="flex">
         <LeadsByDateChart data={leadsData} />
          
         </div>
        </div>
        <div className="flex justify-evenly">
          <StagePieChart data={leadsData} />
          <EmployeeBarChart data={leadsData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
