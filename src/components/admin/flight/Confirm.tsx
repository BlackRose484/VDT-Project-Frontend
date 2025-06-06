import React from "react";

interface FinalConfirmCancelProps {
  title?: string;
  message?: string;
  close: () => void;
  confirm: () => void;
}

const Confirm: React.FC<FinalConfirmCancelProps> = ({
  title,
  message,
  close,
  confirm,
}) => {
  return (
    <div className="flex flex-col gap-[17px] px-[23px] py-[36px] border-t-[10px] border-b-[10px] border-[#223A60] rounded-[20px] items-center justify-center border shadow-lg bg-[#D8EEFE] w-full">
      <div className="text-[#223A60] text-[40px] font-bold">
        {title || "Confirm Action"}
      </div>
      <div className="italic text-[20px]">{message}</div>
      <div className="flex flex-row gap-[25px]">
        <button
          onClick={close}
          className="w-full border-[3px] border-[#223A60] text-[#223A60] text-[22px] font-semibold rounded-[14px] px-[60px] py-[10px] shadow-lg hover:scale-[1.05] transform transition-transform duration-200 hover:bg-[#223A60] hover:text-white"
        >
          No
        </button>
        <button
          onClick={confirm}
          className="w-full border-[3px] border-[#FF0000] text-[#FF0000] text-[22px] font-semibold rounded-[14px] px-[60px] py-[10px] shadow-lg hover:scale-[1.05] transform transition-transform duration-200 hover:bg-[#FF0000] hover:text-white"
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default Confirm;
