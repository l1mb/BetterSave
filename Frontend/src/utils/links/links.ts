export interface links {
  link: string;
  label: string;
  align?: "left" | "right";
}

const navLinks: links[] = [
  { label: "Зарегистрироваться", link: "/register", align: "right" },
  { label: "Войти", link: "/login", align: "right" },
];

export default navLinks;
