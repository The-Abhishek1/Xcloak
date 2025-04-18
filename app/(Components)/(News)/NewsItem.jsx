import Link from "next/link";
import React from "react";
import Click from "./Click";

export default function NewsItem({
  title,
  description,
  url,
  urlToImage,
}) {

  return (
  <div className=" p-5">
    <div className="p-5 shadow-xl rounded-2xl text-[.8rem] sm:text-[.9rem] flex flex-col items-center gap-5">
        <h1 className="font-bold text-center lg:text-[1rem]">{title}</h1> 
        <img className="h-auto" src={urlToImage} alt={url} />
        <div className="flex flex-col items-center">
        <p className="text-center">{description} </p>
        <Click URL={url}/>
        </div>
    </div>
  </div>
  );
}