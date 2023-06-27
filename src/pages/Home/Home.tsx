import { DownOutlined } from "@ant-design/icons";
import { Tree, Typography } from "antd";
import { useState } from "react";
import { useMultiwayTree } from "../../hooks/useMultiwayTree";
import styles from "./styles.module.scss";
import { AddNodeModal } from "../../components/AddNodeModal";
import type { Key } from "react";
import type { AddNodeFormValues } from "../../components/AddNodeModal";

export const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedKeys, setExpandedKeys] = useState<Key[]>(["start"]);
  const [selectedKey, setSelectedKey] = useState<Key>();

  const { tree, handleDrag, createNode } = useMultiwayTree({
    onClickPlusNode: (key) => {
      setIsModalOpen(true);
      setSelectedKey(key);
    },
  });

  const confirmModal = (values: AddNodeFormValues) => {
    if (!selectedKey) return;
    createNode(values.nodeContent, values.isDraggable, selectedKey);
    setIsModalOpen(false);
    setSelectedKey(undefined);
  };

  return (
    <div className={styles.container}>
      <Typography.Title>Multiway Tree</Typography.Title>
      <div className={styles.infoContainer}>
        <Typography.Text>Info:</Typography.Text>
        <div className={styles.infoGroup}>
          <div style={{ width: 8, height: 8, background: "#a9a9dd" }} />
          <Typography.Text>Draggable nodes</Typography.Text>
        </div>
        <div className={styles.infoGroup}>
          <div style={{ width: 8, height: 8, background: "#d83a6f" }} />
          <Typography.Text>Locked nodes</Typography.Text>
        </div>
      </div>
      <div className={styles.treeContainer}>
        <Tree
          allowDrop={({ dropNode, dropPosition, dragNode }) => {
            if ((dragNode.key as string).includes("locked")) {
              return false;
            }

            if ((dropNode.key as string).includes("add")) {
              return false;
            }

            if (
              (dropNode.key as string).includes("start") &&
              dropPosition === -1
            ) {
              return false;
            }

            return true;
          }}
          showLine={{ showLeafIcon: false }}
          draggable={(node) =>
            !(node.key as string).includes("add") &&
            !(node.key as string).includes("start")
          }
          expandedKeys={expandedKeys}
          onExpand={(keys, info) => {
            if (info.nativeEvent.type !== "dragenter") {
              setExpandedKeys(keys);
            }
          }}
          onDrop={handleDrag}
          switcherIcon={<DownOutlined />}
          treeData={tree}
        />
      </div>
      <AddNodeModal
        isOpen={isModalOpen}
        onConfirm={confirmModal}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};
