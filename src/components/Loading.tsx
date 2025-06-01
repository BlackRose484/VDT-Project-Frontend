const Loading = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="text-center">
        <img
          src="../loading_animation.png"
          alt="Loading animation"
          className="w-[75px] h-[75px] md:w-[150px] md:h-[150px] animate-spin mx-auto"
        />
        <div className="text-[#D8EBFE] text-[12px] md:text-[16px] font-bold mt-4">
          Loading ...
        </div>
      </div>
    </div>
  );
};

export default Loading;
