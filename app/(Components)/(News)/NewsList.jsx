"use client"
import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Chill from "./Chill";



export default function NewsList() {
  const [articles, SetArticles] = useState([]);
  const [target, setTarget] = useState("cybersecurity");
  const [loader, setLoader] = useState(true);

  const getArticles = async (target) => {
  await fetch('/api/news', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ target }),
        })
  .then(res => res.json())
  .then((data) =>{
    console.log(data)
    if(data.failure == true){
    setLoader(true)  
    }
    else{
    SetArticles(data.articles)
    setLoader(false)
    }
  })
  .catch(err => console.error(err));
  }
  useEffect(() => {
    getArticles(target);
    setTarget("")
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

      {
        loader ? <Chill/> :
    <div className="md:grid lg:grid-cols-2 2xl:grid-cols-3 items-center">
      {articles.map((article,id) => {
        return (
          <div key={id}>
            <NewsItem
              title={article.title}
              description={article.description}
              url={article.url}
              urlToImage={article.urlToImage}
              publishedAt={article.publishedAt}
            ></NewsItem>
          </div>
        );
      })}
    </div>  }
    </div>
  );
}