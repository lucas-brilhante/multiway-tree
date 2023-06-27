import { DownOutlined } from "@ant-design/icons";
import _ from "lodash";
import { Input, InputRef, Modal, Tree, Typography } from "antd";
import { Key, useEffect, useRef, useState } from "react";
import { useMultiwayTree } from "../../hooks/useMultiwayTree";
import styles from "./styles.module.scss";

export const Home = () => {
  const inputRef = useRef<InputRef>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [expandedKeys, setExpandedKeys] = useState<Key[]>(["start"]);
  const [selectedKey, setSelectedKey] = useState<Key>();

  const { tree, handleDrag, createNode } = useMultiwayTree({
    onClickPlusNode: (key) => {
      setIsModalOpen(true);
      setSelectedKey(key);
    },
  });

  const confirmModal = () => {
    if (!selectedKey) return;

    createNode(inputValue, selectedKey);
    setIsModalOpen(false);
    setInputValue("");
    setSelectedKey("");
  };

  useEffect(() => {
    if (isModalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isModalOpen]);

  if (_.isEmpty(tree)) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Typography.Title>Multiway Tree</Typography.Title>
      <div className={styles.treeContainer}>
        <Tree
          allowDrop={({ dropNode, dropPosition }) => {
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
      <Modal
        title="New Node"
        open={isModalOpen}
        onOk={confirmModal}
        onCancel={() => {
          setIsModalOpen(false);
          setInputValue("");
          setSelectedKey("");
        }}
      >
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
      </Modal>
    </div>
  );
};
