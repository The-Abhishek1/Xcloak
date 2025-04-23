import Link from "next/link";
import React from "react";
import Click from "./Click";

export default function NewsItem({
  title,
  description,
  url,
  urlToImage,
  publishedAt
}) 

{
  const isoString = new Date(publishedAt)
  const date = new Date(isoString);
  const onlyDate = date.toLocaleDateString(); 

return (
  <div className="p-5  flex flex-col items-center  bg-gradient-to-br h-auto">
    <div className="p-5 text-[0.8rem] bg-white shadow-2xl rounded-2xl flex flex-col gap-5">
      
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <h2 className="font-bold text-center sm:text-left text-blue-800">{title}</h2> 
        <p className=" text-gray-500">📅 Published At: <span className="font-medium">{onlyDate}</span></p>
      </div>

      <img
        className="w-full 2xl:max-h-[650px] md:max-h-[450] max-h-[300px] rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
        src={urlToImage}
        alt="news"
      />

      <div className="text-center px-2">
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>

      <div className="flex justify-center">
        <Click URL={url} />
      </div>
    </div>
  </div>
  );
}