import styles from "./styles.module.scss";
import type { TreeNodeProps } from "./types";

export const TreeNode = ({ content, isDraggable = true }: TreeNodeProps) => {
  const style = isDraggable
    ? styles.treeNode
    : [styles.treeNode, styles.isLocked].join(" ");

  return (
    <div className={style}>
      <b>{content}</b>
    </div>
  );
};
