import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

export function Home() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Scrcpy GUI</h1>
        
        <div className="space-y-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              greet();
            }}
            className="space-y-4"
          >
            <div>
              <input
                id="greet-input"
                onChange={(e) => setName(e.currentTarget.value)}
                placeholder="Enter a name..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Greet
            </button>
          </form>
          
          {greetMsg && (
            <div className="p-4 bg-green-100 border border-green-400 rounded-md">
              <p className="text-green-800">{greetMsg}</p>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>Use the navigation above to access different features</p>
        </div>
      </div>
    </div>
  );
}
