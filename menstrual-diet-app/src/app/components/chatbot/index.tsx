import { useState } from "react";

export default function Home() {
  const prompt = (() => {
    const daysInCurrentCycle = localStorage.getItem("daysInCurrentCycle") || "1";
    const age = localStorage.getItem("age") || "23";
    const averageCycleLength = localStorage.getItem("averageCycleLength") || "28";

    return `Using this context (but without mentioning these numbers in your response): The person is on day ${daysInCurrentCycle} of a ${averageCycleLength}-day cycle and is ${age} years old. Generate nutrition, health, and lifestyle recommendations for their current phase in the menstrual cycle. Focus solely on providing relevant advice.`;
  })();

  const [output, setOutput] = useState("");

  const generateText = async () => {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: prompt }),
      });

      const data = await response.json();

      if (response.ok) {
        setOutput(data.output);
      } else {
        setOutput(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Format the output text
  const formatOutput = (text) => {
    if (!text) return "";

    return (
      text
        // Remove asterisks
        .replace(/\*/g, "")
        // Format sections
        .split("\n")
        .map((line) => {
          if (line.includes(":")) {
            const [title, content] = line.split(":");
            if (content) {
              return `<div class="mb-2"><strong>${title}:</strong>${content}</div>`;
            }
            return `<h3 class="font-semibold text-lg mt-4 mb-2">${title}:</h3>`;
          }
          return line;
        })
        .join("")
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
      <div className="z-10 max-w-5xl w-full items-center justify-center space-y-4">
        {!output && (
          <div className="w-full flex justify-center mb-8">
            <button
              type="button"
              onClick={generateText}
              className="rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
            >
              Get Recommendation
            </button>
          </div>
        )}
        {output && (
          <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-lg">
            <div className="text-gray-700 space-y-2" dangerouslySetInnerHTML={{ __html: formatOutput(output) }} />
          </div>
        )}
      </div>
    </main>
  );
}
