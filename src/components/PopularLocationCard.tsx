import React from "react";
import { formatCurrency } from "@/utils/utils";

interface PopularLocationCardProps {
  image: string; // URL of the image to display
  location: string; // Name of the location
  description: string; // Brief description of the location
  price: number; // Price associated with the location
  country: string; // Country where the location is situated
}

const PopularLocationCard: React.FC<PopularLocationCardProps> = ({
  image,
  location,
  description,
  price,
  country,
}) => {
  return (
    <div className="flex flex-col gap-[22px] rounded-[24px] shadow-lg bg-[#D8EBFE] w-full px-[18px] py-[18px] hover:scale-[1.05] transform transition-transform duration-200">
      {/* Image of the location */}
      <img
        src={image}
        alt="Image"
        className="md:w-[400px] md:h-[300px] object-cover"
      />

      <div className="text-[20px] font-bold">{location}</div>

      <div className="text-[14px] font-medium opacity-[50%]">{description}</div>

      <hr className="border-dashed border-t-2 border-gray-300 my-4" />

      {/* Price and Country details */}
      <div className="flex flex-row">
        <div className="text-[20px] font-bold self-start">
          {formatCurrency(price)}{" "}
          {/* Format the price using a utility function */}
        </div>

        <div className="flex flex-row ml-auto">
          <img src="./location_icon.png" alt="icon" />
          <div className="text-[18px] font-medium whitespace-nowrap">
            {country}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularLocationCard;
