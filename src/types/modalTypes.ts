export interface RepusetModalProps {
  isOpen: boolean;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export interface ResultModalProps {
  type: "success" | "error" | null;
  message: string;
  onClose: () => void;
}
