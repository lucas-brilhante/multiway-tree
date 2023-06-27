import type { DataNode } from "antd/es/tree";
import { Key } from "react";

export interface UseMultiwayTreeParams {
  onClickPlusNode: (key: Key) => void;
}

export interface NodeArray {
  node: DataNode;
  index: number;
  array: DataNode[];
}
