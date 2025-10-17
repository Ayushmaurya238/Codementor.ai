

'use client'
import Navbar from "./components/Navbar";
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";

export default function Home() {
  const [shodropdown, setshodropdown] = useState(false)
  const [currlang, setCurrlang] = useState("select language")
  const languages = ["C++", "Python3", "PyPy", "C", "Java", "Javascript", "Kotlin"]
  const handlereview = () => {

  }
  // console.log(shodropdown)
  return (
    <>

      <Navbar />
      <div className="options flex justify-center gap-[35vw]">



        <div className="dropdown show  ">

          <div className=" text-white flex items-center ">
            <div className="w-[10vw]">

            {currlang }
            </div>
            <button onClick={() => { setshodropdown(!shodropdown) }} className="">
              <FaCaretDown className="cursor-pointer" />

            </button>
          </div>


        </div>
        <button className="text-white" onClick={handlereview}>Review code</button>


      </div>
      {shodropdown && (
        <div className="flex pl-[22vw]">
          <ul className="flex flex-col">
            {
              languages.map((languages, index) => {
                return (<div>


                  <li className="hover:bg-gray-800 hover:cursor-default w-[10vw] text-white" onClick={() => { setCurrlang(languages); setshodropdown(!shodropdown) }}>
                    {languages}
                  </li>
                </div>
                )
              })
            }
          </ul>

        </div>

      )

      }
    </>
  );
}
