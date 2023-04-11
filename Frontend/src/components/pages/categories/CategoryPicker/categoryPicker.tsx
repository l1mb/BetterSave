import React, { useEffect, useState } from "react";
import { Divider, IconButton, Tooltip, Whisper } from "rsuite";

import * as Icons from "react-icons/fa";
import CategoryIcon from "../categoryInPicker/categoryIcon";
import "./overrides.scss";
import { TypeAttributes } from "rsuite/esm/@types/common";

interface DynamicFaIconProps {
  name: unknown;
}

function DynamicFaIcon({ name }: DynamicFaIconProps) {
  const IconComponent = Icons[name];

  if (!IconComponent) {
    // Return a default one
    return <Icons.FaBeer />;
  }

  return <IconComponent />;
}

interface CategoryPickerProps {
  onChange: (color: TypeAttributes.Color, name: string) => void;
}

function CategoryPicker({ onChange }: CategoryPickerProps) {
  const [activeIcon, setActiveIcon] = useState("local_dining");
  const [activeColor, setActiveColor] = useState<TypeAttributes.Color>();

  interface categoryIcon {
    name: string;
    onClick: (prop: unknown) => void;
  }
  useEffect(() => {
    onChange(activeColor || "blue", activeIcon);
  }, []);

  const iconList: string[] = [
    "local_dining",
    "local_pizza",
    "tapas",
    "kebab_dining",
    "inventory_2",
    "payments",
    "ecg_heart",
    "shopping_cart",
    "mic_external_on",
    "account_balance",
    "laundry",
    "school",
    "wallet",
    "credit_card",
    "savings",
    "architecture",
    "flight_takeoff",
    "healing",
    "sports_bar",
    "cake",
    "local_taxi",
    "child_care",
    "theater_comedy",
    "`  `",
    "movie",
    "local_cafe",
    "dentistry",
    "local_bar",
    "bolt",
    "sentiment_satisfied",
    "restaurant",
    "sports_soccer",
    "car_rental",
    "car_repair",
    "redeem",
    "fitness_center",
    "house",
    "wifi",
    "attach_money",
    "receipt_long",
    "local_parking",
    "pets",
    "phone_iphone",
    "directions_railway",
  ];

  function onChangeActiveColor(x: TypeAttributes.Color) {
    onChange(x, activeIcon);
    setActiveColor(x);
  }

  const onChangeActiveIcon = (x: string) => {
    onChange(activeColor || "blue", x);
    setActiveIcon(x);
  };

  const items = iconList.map((iconName) => <CategoryIcon name={iconName} onClick={onChangeActiveIcon} />);
  const colors: TypeAttributes.Color[] = ["red", "orange", "yellow", "green", "cyan", "blue", "violet"];
  const colorButtons = colors.map((x) => (
    <IconButton color={x} appearance="primary" circle onClick={() => onChangeActiveColor(x)} />
  ));

  return (
    <Whisper
      trigger="click"
      placement="bottom"
      controlId="control-id-bottom"
      speaker={
        <Tooltip>
          <div className="flex flex-col p-2">
            <div className="flex h-40 w-96 flex-col flex-wrap items-center justify-center gap-1 ">{items}</div>
            <Divider />
            <div className="flex gap-2">{colorButtons}</div>
          </div>
        </Tooltip>
      }
    >
      <IconButton
        icon={<span className="material-symbols-outlined">{activeIcon}</span>}
        appearance={activeColor ? "primary" : "subtle"}
        color={activeColor}
        size="sm"
        circle
      />
    </Whisper>
  );
}

export default CategoryPicker;
