import React from "react";
import { IconButton } from "rsuite";
import PlusIcon from "@rsuite/icons/Plus";

interface PlusButtonProps {
  onClick: () => void;
}

function PlusButton({ onClick }: PlusButtonProps) {
  return <IconButton icon={<PlusIcon />} circle onClick={onClick} />;
}

export default PlusButton;
