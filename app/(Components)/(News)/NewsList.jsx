"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsItem from "./NewsItem";

export default function NewsList() {
  const [articles, SetArticles] = useState([]);
  const [target, setTarget] = useState("cybersecurity");

const getArticles = async (target) => {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${target}&apiKey=e2dcb3fca6e24269aa4dd18e332bb9d7`
    );
    SetArticles(response.data.articles);
};
  useEffect(() => {
    getArticles();
  }, []);
  return (
    <div className="flex flex-col items-center">
      <div className=" flex flex-row gap-5 items-center mt-10 text-[.9rem]">
      <input value={target} onChange={(e)=>{
          setTarget(e.target.value)
        }} className=' border-black text-gray-800 border-[2px] p-2 w-[14rem] sm:w-[20rem] text-center text-[.8rem] outline-none' type='text' placeholder='Enter the Topic to View'/>
        <button onClick={() => {
          getArticles(target)
          setTarget("")
        }} className="bg-gray-900 text-white cursor-pointer py-2 px-7 rounded hover:bg-gray-800">Search</button>
      </div>
    <div className="md:grid grid-cols-2">
      {articles.map((article,id) => {
        return (
          <div key={id}>
            <NewsItem
              title={article.title}
              description={article.description}
              url={article.url}
              urlToImage={article.urlToImage}
            ></NewsItem>
          </div>
        );
      })}
    </div>
    </div>
  );
}