import Image from "next/image";
import Header from "./(Components)/(Common)/Header";
import Content from "./(Components)/(Common)/Content";
import Footer from "./(Components)/(Common)/Footer";

export default function Home() {
  return (
    <div className="flex flex-col from-white via-blue-50 to-white">
    <Header/>
    <Content/>
    <Footer/>
    </div>
  );
}
