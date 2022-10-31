export interface links {
  link: string;
  label: string;
  align?: "left" | "right";
}

const navLinks: links[] = [
  { label: "Register", link: "/register", align: "right" },
  { label: "Login", link: "/login", align: "right" },
];

export default navLinks;
