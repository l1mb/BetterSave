import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config";

const useThemeResolver = () => {
  const fullConfig = resolveConfig(tailwindConfig);
  return fullConfig;
};

export default useThemeResolver;
