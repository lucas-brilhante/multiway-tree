import { useState } from "react";
import { AddButton } from "../../components/AddButton";
import { TreeNode } from "../../components/TreeNode";
import type { Key } from "react";
import type { DataNode, TreeProps } from "antd/es/tree";
import type { NodeArray, UseMultiwayTreeParams } from "./types";

export const useMultiwayTree = ({ onClickPlusNode }: UseMultiwayTreeParams) => {
  const [tree, setTree] = useState<DataNode[]>([
    {
      title: "Start",
      key: "start",
      children: [
        {
          title: (
            <AddButton
              onClick={() => {
                onClickPlusNode("start");
              }}
            />
          ),
          key: "add",
        },
      ],
    },
  ]);

  const findNodeArray = (
    nodes: DataNode[] | undefined,
    key: Key
  ): NodeArray | undefined => {
    let currentArray;
    let currentIndex;
    let currentNode;

    const loop = (nodes: DataNode[] | undefined, key: Key) => {
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

  const handleDrag: TreeProps["onDrop"] = (info) => {
    const { dragNode, node } = info;
    const treeClone = [...tree];

    const dragNodeArray = findNodeArray(treeClone, dragNode.key);
    if (!dragNodeArray) return;
    const { array: dNodeArray, index: dIndex, node: dNode } = dragNodeArray;

    // Remove dragged node
    dNodeArray.splice(dIndex, 1);

    const targetNodeArray = findNodeArray(treeClone, node.key);
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

  const createNode = (content: string, isDraggable: boolean, key: Key) => {
    const treeClone = [...tree];
    const nodeArray = findNodeArray(treeClone, key);

    if (!nodeArray) return;
    const { node } = nodeArray;

    const randomKey = new Date().toISOString();
    const childrenLength = node.children?.length || 0;
    const prefix = isDraggable ? "draggable" : "locked";
    const nodeKey = `${prefix}-${randomKey}`;
    const newNode: DataNode = {
      title: <TreeNode content={content} isDraggable={Boolean(isDraggable)} />,
      key: nodeKey,
      children: [
        {
          title: (
            <AddButton
              onClick={() => {
                onClickPlusNode(nodeKey);
              }}
            />
          ),
          key: `add-${nodeKey}`,
        },
      ],
    };
    node.children?.splice(childrenLength - 1, 0, newNode);
    setTree(treeClone);
  };

  return { tree, handleDrag, createNode };
};
