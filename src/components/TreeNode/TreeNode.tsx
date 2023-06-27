import { TreeNodeProps } from "./types";
import styles from "./styles.module.scss";

export const TreeNode = ({ content }: TreeNodeProps) => {
  return (
    <div className={styles.treeNode}>
      <b>{content}</b>
    </div>
  );
};
