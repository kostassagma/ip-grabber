import { useMediaQuery } from "react-responsive";

export const useScreenType = (): "desktop" | "mobile" => {
  const isDesktop = useMediaQuery({ minWidth: 640 });

  if (isDesktop) {
    return "desktop";
  }

  return "mobile";
};
