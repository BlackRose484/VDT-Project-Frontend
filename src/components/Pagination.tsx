import React from "react"; 
import classNames from "classnames"; 

interface PaginationProps {
  total_page: number; // The total number of pages available for pagination
  current_page: number; // The current active page
  changePage: (page: number) => void; // Function to change the page when a page number is clicked
  nextPage: () => void; // Function to go to the next page
  prevPage: () => void; // Function to go to the previous page
}

export const Pagination: React.FC<PaginationProps> = ({
  total_page,
  current_page,
  changePage,
  nextPage,
  prevPage,
}) => {
  return (
    <div className="flex justify-center items-center gap-2 my-5">
      {/* Previous Page Button */}
      <button
        onClick={prevPage}
        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-[#D8EBFE]"
      >
        Previous
      </button>
      
      {/* Loop through the total number of pages and create buttons */}
      {Array(total_page)
        .fill(0) 
        .map((_, index) => {
          const pageNumber = index + 1; // Page numbers start from 1
          const isActive = current_page === pageNumber; // Check if the current page is the one being mapped
          
          return (
            <div key={index}>
              <button
                onClick={() => changePage(pageNumber)} 
                className={classNames(
                  "py-2 px-4 leading-tight hover:bg-[#D8EBFE] hover:text-gray-700 rounded-lg", 
                  {
                    "bg-[#D8EBFE] text-gray-700": isActive, 
                    "bg-gray-200 text-gray-800": !isActive, 
                  }
                )}
              >
                {pageNumber} 
              </button>
            </div>
          );
        })}
      
      {/* Next Page Button */}
      <button
        onClick={nextPage} 
        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-[#D8EBFE]"
      >
        Next
      </button>
    </div>
  );
};
