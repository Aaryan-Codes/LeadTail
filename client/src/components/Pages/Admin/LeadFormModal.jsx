import { Button, Col, Form, Input, Modal, Row, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { AddLead, UpdateLead } from "../../../API/leadAPIcalls";

const LeadCenterForm = ({
  isLeadFormOpen,
  selectedLead,
  setSelectedLead,
  formType,
  setIsLeadFormOpen,
  getData
}) => {
  const handleCancel = () => {
    setIsLeadFormOpen(false);
    setSelectedLead(null);
  };

  const onFinish = async (data) => {
    try {
        let response = null;
        if(formType === 'add'){
            response = await AddLead(data);
        }else{
            response = await UpdateLead({...data,leadID:selectedLead._id});
        }
        console.log(response);
        if(response.success){
            getData();
            message.success(response.message);
            setIsLeadFormOpen(false);
        }else{
            message.error(response.message);
        }
        
    } catch (error) {
        message.error(error.message);
    }
  };

  return (
    <>
      <Modal
        centered
        open={isLeadFormOpen}
        onCancel={handleCancel}
        width={1000}
        footer={null}
      >
        <h1 className="text-3xl font-semibold text-center pb-4">
          {formType === "add" ? "Add Lead" : "Edit Lead"}
        </h1>
        <Form
          layout="vertical"
          className="w-full"
          initialValues={selectedLead}
          onFinish={onFinish}
        >
          <Row
            gutter={{
              xs: 6,
              sm: 10,
              md: 12,
              lg: 16,
            }}
          >
            <Col span={6}>
              <Form.Item
                label="Name"
                htmlFor="name"
                name="name"
                className=""
                rules={[{ required: true, message: "Enter client name" }]}
              >
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter client name"
                ></Input>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                label="Phone No."
                htmlFor="phone"
                name="phone"
                className=""
                rules={[{ required: true, message: "Enter client number" }]}
              >
                <Input
                  id="phone"
                  type="number"
                  placeholder="Enter client number"
                ></Input>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                label="Email"
                htmlFor="email"
                name="email"
                className=""
                rules={[{ required: true, message: "Enter client email" }]}
              >
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter client email"
                ></Input>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                label="Date"
                htmlFor="date"
                name="date"
                rules={[
                  {
                    required: true,
                    message: "Date is required",
                  },
                ]}
              >
                <Input
                  id="date"
                  type="date"
                  placeholder="Choose the date"
                ></Input>
              </Form.Item>
            </Col>
          </Row>

          <Row
            gutter={{
              xs: 6,
              sm: 10,
              md: 12,
              lg: 16,
            }}
          >
            <Col span={8}>
              <Form.Item
                label="Source"
                htmlFor="source"
                name="source"
                rules={[{ required: true, message: "Mention Source" }]}
              >
                <Select
                  id="source"
                  className="w-full"
                  placeholder="Select source"
                  onChange={(e) => console.log(e)}
                  options={[
                    { value: "Organic", label: "Organic" },
                    { value: "Paid", label: "Paid" },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Assigned to"
                htmlFor="assigned"
                name="assigned"
                rules={[{ required: true, message: "Mention assigned to" }]}
              >
                <Select
                  id="assigned"
                  className="w-full"
                  placeholder="Select assigned to"
                  onChange={(e) => console.log(e)}
                  options={[
                    { value: "Unassigned", label: "Unassigned" },
                    { value: "Person 1", label: "Person 1" },
                    { value: "Person 2", label: "Person 2" },
                    { value: "Person 3", label: "Person 3" },
                    { value: "Person 4", label: "Person 4" },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Stage"
                htmlFor="stage"
                name="stage"
                rules={[{ required: true, message: "Mention stage" }]}
              >
                <Select
                  id="stage"
                  className="w-full"
                  placeholder="Select stage"
                  onChange={(e) => console.log(e)}
                  options={[
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
              </Form.Item>
            </Col>
          </Row>

          <Row
            gutter={{
              xs: 6,
              sm: 10,
              md: 12,
              lg: 16,
            }}
          >
            <Col span={24}>
              <Form.Item label="Comments" htmlFor="comments" name={"comments"}>
                <TextArea
                  id="comments"
                  rows={3}
                  placeholder="Comments"
                ></TextArea>
              </Form.Item>
            </Col>
          </Row>
          <div className="flex justify-evenly w-full">
            <button
              type="submit"
              className="px-4 py-2 bg-[#1677ff] text-white rounded-lg shadow-lg"
            >
              {formType === 'add' ? "Add Lead" : "Update Lead"}
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-[#1677ff] text-white rounded-lg shadow-lg"
            >
              Cancel
            </button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default LeadCenterForm;
