import Image from "next/image";
import Header from "./(components)/Header";
import Footer from "./(components)/Footer";

export default function Home() {
  return (
    <>
    <Header/>
    <div className="absolute w-full bottom-0">
    <Footer/>
    </div>
    
    </>
  );
}
