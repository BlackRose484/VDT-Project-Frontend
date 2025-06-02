import Header from "@/components/base/Header";
import Footer from "@/components/base/Footer";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className={`container mx-auto flex-1}`}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
