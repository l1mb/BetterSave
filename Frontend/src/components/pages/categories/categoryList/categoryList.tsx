interface categoryIcon {
  name: string;
  onClick: (prop: unknown) => void;
}

const categories: categoryIcon[] = [
  {},
  {
    name: "smile",
    onClick(FaSmile) {},
  },
];
