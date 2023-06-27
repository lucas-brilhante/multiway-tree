import { Button, ButtonProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";

type AddButtonProps = Omit<ButtonProps, "onClick"> & {
  nodeKey: string;
  onClick: (key: string) => void;
};

export const AddButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      icon={
        <PlusOutlined
          style={{ fontSize: 12, marginBottom: 10, padding: 0, margin: 0 }}
        />
      }
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        width: 24,
        height: 24,
      }}
    />
  );
};
