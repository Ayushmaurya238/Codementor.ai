"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

const Monaco = ({currlang}) => {
  const [code, setCode] = useState("//Paste your code here...");
   const languageMap = {
    "C++": "cpp",
    Python3: "python",
    PyPy: "python",
    C: "c",
    Java: "java",
    Javascript: "javascript",
    Kotlin: "kotlin",
  };
  const mappedLang = languageMap[currlang] || "markdown";

  return (
    <div className="flex flex-col items-center p-4 bg-gray-950 text-white">
      <h2 className="text-xl font-semibold mb-4">Monaco Editor Test</h2>

      <div className="border border-gray-700 rounded-xl shadow-lg w-[800px]">
        <MonacoEditor
          height="500px"
          theme="vs-dark"
          language={mappedLang}
          value={code}
          onChange={(value) => setCode(value || "")}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
          }}
        />
      </div>
    </div>
  );
};

export default Monaco;
