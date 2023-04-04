import { BaseProps } from "@/types/props/defaultProps";
import React from "react";
import { Button, Modal, Placeholder } from "rsuite";

interface ModalWrapperProps extends BaseProps {
  open: boolean;
  backdrop: "static" | boolean;
  handleClose: () => void;
  handleProceed: () => void;
  size?: "full" | "lg" | "md" | "sm" | "xs";
  title: string;
  cancelLabel: string;
  okLabel: string;
}

function ModalWrapper({
  backdrop,
  open,
  handleClose,
  handleProceed,
  children,
  title,
  cancelLabel,
  okLabel,
  size,
}: ModalWrapperProps) {
  return (
    <Modal backdrop={backdrop} keyboard={false} open={open} onClose={handleClose} size={size}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{children || <Placeholder.Paragraph />}</Modal.Body>
      <Modal.Footer>
        <Button onClick={handleProceed} appearance="primary">
          {okLabel}
        </Button>
        <Button onClick={handleClose} appearance="subtle">
          {cancelLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

ModalWrapper.defaultProps = {
  size: "md",
};

export default ModalWrapper;
