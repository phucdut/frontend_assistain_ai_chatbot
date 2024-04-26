import Image from "next/image";
import "@/app/globals.css";
import Link from "next/link";
import AllVersionChatGPTs from "./get-all-select-versions-chatGPT";

const menuLinks = ["Knowledge base", "Prompt", "Customize", "Performance"];

const Headers = () => {
  return (
    <header className="mb-10">
      <div className=" flex items-center justify-start">
        <AllVersionChatGPTs />
        <ul className=" flex items-center justify-between gap-9  font-normal leading-normal text-[14px] pl-9">
          {menuLinks.map((link) => (
            <li key={link}>
              <Link href={"#"}>{link}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Headers;
