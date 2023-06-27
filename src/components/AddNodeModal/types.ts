export interface AddNodeFormValues {
  nodeContent: string;
  isDraggable: boolean;
}
export interface AddNodeModalProps {
  isOpen: boolean;
  onConfirm: (values: AddNodeFormValues) => void;
  onCancel: () => void;
}

