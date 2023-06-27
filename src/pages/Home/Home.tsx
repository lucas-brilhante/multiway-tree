import { DownOutlined } from "@ant-design/icons";
import _ from "lodash";
import { Input, InputRef, Modal, Tree } from "antd";
import type { DataNode, TreeProps } from "antd/es/tree";
import { Key, useEffect, useRef, useState } from "react";
import { AddButton } from "../../components/AddButton";
import { TreeNode } from "../../components/TreeNode";
import styles from "./styles.module.scss";
import { NodeArray } from "./types";

export const Home = () => {
  const inputRef = useRef<InputRef>(null);
  const [tree, setTree] = useState<DataNode[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<Key[]>(["start"]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedKey, setSelectedKey] = useState("");

  const createNode = (node: DataNode, key: string) => {
    if (node.key === key) {
      const newKey = new Date().toISOString();
      const childrenLength = node.children?.length || 0;
      const newNode: DataNode = {
        title: <TreeNode content={inputValue} />,
        key: newKey,
        children: [
          {
            title: (
              <AddButton
                onClick={() => {
                  setIsModalOpen(true);
                  setSelectedKey(newKey);
                }}
              />
            ),
            key: `add-${newKey}`,
          },
        ],
      };
      node.children?.splice(childrenLength - 1, 0, newNode);
      return node;
    }

    node.children?.some((child) => {
      return createNode(child, key);
    });
  };

  const findNodeArray = (
    nodes: DataNode[] | undefined,
    key: string
  ): NodeArray | undefined => {
    let currentArray;
    let currentIndex;
    let currentNode;

    const loop = (nodes: DataNode[] | undefined, key: string) => {
      nodes?.some((node, index, array) => {
        if (node.key === key) {
          currentNode = node;
          currentIndex = index;
          currentArray = array;
          return true;
        }

        return loop(node.children, key);
      });
    };
    loop(nodes, key);

    if (!currentNode || currentIndex === undefined || !currentArray)
      return undefined;

    return { node: currentNode, index: currentIndex, array: currentArray };
  };

  const confirmModal = () => {
    const treeClone = [...tree];
    createNode(treeClone[0], selectedKey);
    setTree(treeClone);
    setIsModalOpen(false);
    setInputValue("");
    setSelectedKey("");
  };

  useEffect(() => {
    setTree([
      {
        title: "Start",
        key: "start",
        children: [
          {
            title: (
              <AddButton
                onClick={() => {
                  setIsModalOpen(true);
                  setSelectedKey("start");
                }}
              />
            ),
            key: "add",
          },
        ],
      },
    ]);
  }, []);

  useEffect(() => {
    if (isModalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isModalOpen]);

  const handleDrag: TreeProps["onDrop"] = (info) => {
    const { dragNode, node } = info;
    const treeClone = [...tree];

    const dragNodeArray = findNodeArray(treeClone, dragNode.key as string);
    if (!dragNodeArray) return;
    const { array: dNodeArray, index: dIndex, node: dNode } = dragNodeArray;

    // Remove dragged node
    dNodeArray.splice(dIndex, 1);

    const targetNodeArray = findNodeArray(treeClone, node.key as string);
    if (!targetNodeArray) return;
    const { array: tNodeArray, node: tNode, index: tIndex } = targetNodeArray;

    // Add a copy of dragged node to new position
    if (!info.dropToGap) {
      tNode.children?.unshift(dNode);
      setTree(treeClone);
      return;
    }

    tNodeArray.splice(tIndex + 1, 0, dNode);
    setTree(treeClone);
    return;
  };

  if (_.isEmpty(tree)) {
    return null;
  }

  return (
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
