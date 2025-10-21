'use client';


import { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import Monaco from "./components/Monaco";
import Navbar from "./components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import Feedbackpanel from "./components/Feedbackpanel";
export default function Home() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [currLang, setCurrLang] = useState("Select Language");
  const languages = ["C++", "Python3", "PyPy", "C", "Java", "Javascript", "Kotlin"];
  const [feedback, setFeedback] = useState("")
  const commentmap = {
    "C++": "//",
    Python3: "#",
    PyPy: "#",
    C: "//",
    Java: "//",
    Javascript: "//",
    Kotlin: "#",
  }

  const [code, setcode] = useState(commentmap[currLang] ? commentmap[currLang] : "//" + "paste your code here...")
  useEffect(() => {
    setcode((commentmap[currLang] ? commentmap[currLang] : "//") + "paste your code here...")

  }, [currLang])


  const handleReview = async() => {
    if(currLang==="Select Language"){
      alert("Please select the language of your code");
    }
    try{

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      const raw = JSON.stringify({
        "code": { code },
        "lang": { currLang }
      });
      
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
      
      const res= await fetch("/api/review/", requestOptions)
      const data=await res.json()
    if(data.success){
      setFeedback(data.feedback)
    }
    else{
      setFeedback("Error getting the feedback ...")
    }
  }
  catch(err){
    setFeedback("server error. Please try again")

  }
  

    // setFeedback("I am giving the feedback")
  };

  return (
    <>
      <Navbar />

      {/* Page Wrapper */}
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center px-4 pt-10">

        {/* Controls */}
        <div className="w-full max-w-5xl flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">

          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center justify-between w-[180px] px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition cursor-pointer"
            >
              <span className="">{currLang}</span>
              <FaCaretDown className="ml-2 " />
            </button>

            <AnimatePresence>
              {showDropdown && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden"
                >
                  {
                    languages.map((lang, index) => {
                      return (
                        <div key={index} className=" flex flex-col gap-1 ">
                          <li onClick={() => { setCurrLang(lang); setShowDropdown(!showDropdown) }} className="cursor-pointer hover:bg-gray-600 pl-3">
                            {lang}
                          </li>

                        </div>
                      )
                    })
                  }
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Review Button */}
          <button
            onClick={handleReview}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold shadow-md transition cursor-pointer"
          >
            Review Code ⚡
          </button>
        </div>

        {/* Editor Container */}
        <div className="w-full max-w-5xl bg-gray-900 border border-gray-800 rounded-2xl shadow-lg p-4">
          <Monaco defaultLanguage={currLang} code={code} setCode={setcode} />
        </div>

        {/* Placeholder for feedback section (to add later) */}
        <Feedbackpanel feedback={feedback}/>

      </div>
    </>
  );
}
