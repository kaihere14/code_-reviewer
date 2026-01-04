import React from "react";

const DetailOne = () => {
  return (
    <div  className="w-full flex px-15 mt-32">
      <div className="left w-full ">
         <h1 className="text-7xl font-light mb-4">
              Everything you <br />
        </h1>   
        <h1 className="text-7xl font-light mb-4">
            need to <span className="italic font-serif underline">review code</span>
        </h1>   
      </div>
      <div className="right flex  flex-col items-end text-lg font-light justify-end leading-8 w-full text-[16px] text-gray-400">
        <div>
          Review code, <span>catch</span> issues early,
        </div>
        <div>and keep feedback in context —</div>
        <div>without slowing your team down.</div>
      </div>
    </div>
  );
};

export default DetailOne;
