import { isDarkAtom } from "@/atoms";
import { useRecoilValue } from "recoil";
import Header from "./Header";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "@/theme";
import DarkToggle from "./DarkToggle";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: AppLayoutProps) {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <Header />
        <DarkToggle />
        <div>{children}</div>
      </ThemeProvider>
    </>
  );
}
