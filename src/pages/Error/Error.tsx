import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/base/Header";
import Footer from "../../components/base/Footer";

export function Error({ message }: { message: string }) {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }, [navigate]);

  return (
    <>
      <Header />
      <div className="w-full h-[80vh] flex flex-col items-center justify-center">
        <img src="/not_found.png" alt="Error" className="w-[200px] h-[200px]" />
        <div className="text-[24px] font-semibold">{message}</div>
      </div>
      <Footer />
    </>
  );
}
