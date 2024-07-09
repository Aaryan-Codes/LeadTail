import { Modal, Form, Input, message } from "antd";
import { useEffect } from "react";
import { AddNewEmployee, UpdateEmployee } from "../../../API/employeeAPIcalls";
import { useSelector } from "react-redux";

const EmployeeModalForm = ({
  isModalOpen,
  setIsModalOpen,
  selectedEmployee,
  setSelectedEmployee,
  formType,
  setFormType,
  getData,
}) => {
  const [form] = Form.useForm();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (selectedEmployee) {
      form.setFieldsValue(selectedEmployee);
    } else {
      form.resetFields();
    }
  }, [selectedEmployee, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      let response = null;
      if (formType === "add") {
        response = await AddNewEmployee({ ...values, owner: user._id });
      } else {
        response = await UpdateEmployee({
          ...values,
          empID: selectedEmployee._id,
        });
      }
      if (response.success) {
        message.success(response.message);
        getData();
        setIsModalOpen(false);
        setSelectedEmployee(null);
        form.resetFields();
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const validateMobileNumber = (_, value) => {
    if (!value || value.length !== 10) {
      return Promise.reject(
        new Error("Mobile number must be exactly 10 digits")
      );
    }
    return Promise.resolve();
  };

  return (
    <Modal
      title={selectedEmployee ? "Edit Employee" : "Add Employee"}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input the name!" }]}
        >
          <Input placeholder="Enter employee name" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone No."
          rules={[
            { required: true, message: "Please input the phone number!" },
            { validator: validateMobileNumber },
          ]}
        >
          <Input placeholder="Enter employee phone no." />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please input the email!" }]}
        >
          <Input placeholder="Enter employee email" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EmployeeModalForm;
