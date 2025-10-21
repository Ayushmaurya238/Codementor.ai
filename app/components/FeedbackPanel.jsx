import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // or any highlight.js theme

const Feedbackpanel = () => {
  if (!feedback) return null;

  return (
    <div className="w-full max-w-5xl bg-gray-900 border border-gray-800 rounded-2xl shadow-md mt-6 p-6 min-h-[200px]">
      <h2 className="text-xl font-bold mb-4 text-blue-400">
        AI Code Review Feedback 🧠
      </h2>
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {feedback}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default Feedbackpanel
