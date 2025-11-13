import { useState } from "react";
import "./App.css";
import { TestPage } from "./pages/Test";
import { Home } from "./pages/Home.tsx";

type Page = 'home' | 'test';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('test');

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              <button
                onClick={() => setCurrentPage('home')}
                className={`inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium ${
                  currentPage === 'home'
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setCurrentPage('test')}
                className={`inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium ${
                  currentPage === 'test'
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Phase 1 Tests
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      {currentPage === 'home' && <Home />}
      {currentPage === 'test' && <TestPage />}
    </div>
  );
}

export default App;
