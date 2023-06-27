interface TreeNodeProps {
  content: string;
}

export const TreeNode = ({ content }: TreeNodeProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 24,
        height: 24,
        borderRadius: "50%",
        background: "#a9a9dd",
      }}
    >
      <b>{content}</b>
    </div>
  );
};
