import Header from "./Header";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: AppLayoutProps) {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
}
