import React from "react";
import { IconButton } from "rsuite";
import styles from "./styles.module.scss";

export interface CategoryIconProps {
  name: string;
  onClick: (e: string) => void;
}

function CategoryIcon({ name, onClick }: CategoryIconProps) {
  return (
    <IconButton
      icon={<span className={`${styles.small} material-symbols-outlined`}>{name}</span>}
      circle
      appearance="subtle"
      size="xs"
      onClick={() => onClick(name)}
    />
  );
}

export default CategoryIcon;
