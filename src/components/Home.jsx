import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-cyan-800 min-h-screen flex flex-col justify-between">
      {/* Welcome Heading at the Top */}
      <h1 className="text-cyan-50 font-bold text-5xl sm:text-6xl md:text-7xl text-center p-4">
        WELCOME TO OUR WEBSITE
      </h1>

      <h3 className="text-cyan-50 font-bold text-5xl sm:text-6xl md:text-7xl text-center p-4">
        CGPA AND GPA CALCULATOR
      </h3>

      {/* Main Content */}
      <div className="flex-grow flex flex-col justify-center">
        <div className="max-w-lg mx-auto p-4 sm:p-6 md:p-8">
          <p className="text-white text-2xl sm:text-3xl md:text-4xl text-center">
            Calculate your CGPA and GPA in a single click
          </p>
          <div className="flex justify-center mt-8">
            <Link to="/Gpa">
              <button className="bg-cyan-900 rounded-md px-5 sm:px-7 py-3 sm:py-4 mx-2 font-bold text-3xl sm:text-4xl text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-950 duration-300">
                GPA
              </button>
            </Link>
            <Link to="/Cgpa">
              <button className="bg-cyan-900 rounded-md px-5 sm:px-7 py-3 sm:py-4 mx-2 font-bold text-3xl sm:text-4xl text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-950 duration-300">
                CGPA
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="text-center p-4">
        <h1 className="text-cyan-50 font-bold text-lg sm:text-2xl">
          This website is developed by Selvakumar
        </h1>
        <p className="text-cyan-50 font-bold text-sm sm:text-xl">
          For more queries, contact on LinkedIn: Selvakumar-csbs
        </p>
      </div>
    </div>
  );
}

export default Home;
