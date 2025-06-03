import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Successful = ({
  message,
  to_path,
}: {
  message: string;
  to_path: string;
}) => {
  const [countdown, setCountdown] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate(to_path);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, to_path]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex items-center justify-center w-[35%] h-[35%] [#F6FBFF] rounded-[30px] shadow-lg bg-[#F6FBFF]">
        <div className="text-center">
          <img
            src="../success.png"
            alt="Loading animation"
            className="w-[100px] h-[100px] md:w-[140px] md:h-[140px] mx-auto"
          />
          <div className="text-black text-[12px] md:text-[16px] font-bold mt-4">
            {message}
          </div>
          <div className="text-black text-[10px] md:text-[14px] italic mt-4">
            You will be redirected in{" "}
            <span className="text-red-500">{countdown}</span> seconds...
          </div>
        </div>
      </div>
    </div>
  );
};

export default Successful;
