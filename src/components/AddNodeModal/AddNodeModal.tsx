import { Checkbox, Form, Input, Modal } from "antd";
import type { AddNodeFormValues, AddNodeModalProps } from "./types";

export const AddNodeModal = ({
  isOpen,
  onConfirm,
  onCancel,
}: AddNodeModalProps) => {
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const handleFinish = (values: AddNodeFormValues) => {
    onConfirm(values);
    form.resetFields();
  };

  return (
    <Modal
      title="New Node"
      open={isOpen}
      okButtonProps={{
        form: "addNodeForm",
        htmlType: "submit",
      }}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        initialValues={{ isDraggable: true, }}
        autoComplete="off"
        id="addNodeForm"
        onFinish={handleFinish}
        layout="vertical"
      >
        <Form.Item
          name="nodeContent"
          label="Node Content"
          rules={[{ required: true, message: "Required!" }]}
        >
          <Input autoFocus />
        </Form.Item>
        <Form.Item
          name="isDraggable"
          label="Can be draggable?"
          valuePropName="checked"
        >
          <Checkbox>Yes</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};
