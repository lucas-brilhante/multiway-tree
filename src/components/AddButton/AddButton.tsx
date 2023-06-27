import { Button, ButtonProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";

export const AddButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      className={styles.addButtonNode}
      icon={<PlusOutlined style={{ fontSize: 12, padding: 0, margin: 0 }} />}
    />
  );
};
