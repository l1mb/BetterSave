import ModalWrapper from "@/components/modals/modalWrapper";
import React from "react";
import AddSplit from "../AddSplit/addSplit";

interface CreateSplitModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handleSuccess: () => void;
}

function CreateSplitModal({ isOpen, handleClose, handleSuccess }: CreateSplitModalProps) {
  return (
    <div>
      <ModalWrapper
        open={isOpen}
        backdrop="static"
        handleClose={handleClose}
        handleProceed={handleSuccess}
        title="Давайте добавим траты"
        cancelLabel="Отмена"
        okLabel="Далее"
      >
        <AddSplit />
      </ModalWrapper>
    </div>
  );
}

export default CreateSplitModal;
