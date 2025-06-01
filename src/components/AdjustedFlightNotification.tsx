import React from "react";

// Define types for the component's props
interface AdjustedFlightNotificationProps {
  oldDepartureDate: string; // Old departure date before adjustment
  newDepartureDate: string; // New departure date after adjustment
  oldArrivalDate: string | undefined; // Old arrival date before adjustment (optional)
  newArrivalDate: string | undefined; // New arrival date after adjustment (optional)
  reason: string; // Reason for the flight schedule change
}

// Functional component for displaying adjusted flight notification
const AdjustedFlightNotification: React.FC<AdjustedFlightNotificationProps> = ({
  oldDepartureDate,
  newDepartureDate,
  oldArrivalDate,
  newArrivalDate,
  reason,
}) => {
  return (
    <div className="flex flex-col gap-[5px] py-[2px] text-[16px]">
      <div>Schedule for this flight has been changed by the admin!</div>
      
      <div>Reason: {reason}</div>
      
      {/* Adjusted Departure Date */}
      <div className="flex flex-col md:flex-row gap-[22px] items-center">
        <div>Adjusted Departure Date:</div>
        <div className="font-semibold text-[#0066FF] italic">
          {oldDepartureDate} 
        </div>
        <div className="scale-x-[2] text-[20px]">→</div>
        <div className="font-semibold text-[#0066FF] italic">
          {newDepartureDate}
        </div>
      </div>
      
      {/*Arrival Date if it exists */}
      {oldArrivalDate && (
        <div className="flex flex-col md:flex-row gap-[22px] items-center">
          <div>Adjusted Arrival Date:</div>
          <div className="font-semibold text-[#0066FF] italic">
            {oldArrivalDate} 
          </div>
          <div className="scale-x-[2] text-[20px]">→</div> 
          <div className="font-semibold text-[#0066FF] italic">
            {newArrivalDate} 
          </div>
        </div>
      )}

      <div className="italic">
        If the adjusted schedule is not suitable for your demand, you can cancel
        it. Otherwise, you do not need to do anything.
      </div>
    </div>
  );
};

export default AdjustedFlightNotification;
