import { Button, ButtonProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";

export const AddButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      icon={
        <PlusOutlined
          style={{ fontSize: 12, marginBottom: 10, padding: 0, margin: 0 }}
        />
      }
      className={styles.addButtonNode}
    />
  );
};
