import { useState } from "react";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";

function Cgpa() {
  const [numSem, setNumSem] = useState(0);
  const [credits, setCredits] = useState([]);
  const [earnedGpas, setEarnedGpas] = useState([]);
  const [cgpa, setCgpa] = useState(0);
  const [printInfo, setPrintInfo] = useState(null);

  const handleNumSemChange = (e) => {
    setNumSem(parseInt(e.target.value) || 0);
  };

  const handleCreditChange = (index, value) => {
    const updatedCredits = [...credits];
    updatedCredits[index] = parseFloat(value) || 0;
    setCredits(updatedCredits);
  };

  const handleEarnedGpaChange = (index, value) => {
    const updatedEarnedGpas = [...earnedGpas];
    updatedEarnedGpas[index] = parseFloat(value) || 0;
    setEarnedGpas(updatedEarnedGpas);
  };

  const calculateCgpa = () => {
    const totalCredit = credits.reduce((sum, credit) => sum + credit, 0);
    const totalEarnedGpa = earnedGpas.reduce(
      (sum, earnedGpa, index) => sum + earnedGpa * credits[index],
      0
    );

    if (totalCredit > 0) {
      const cgpaCalc = totalEarnedGpa / totalCredit;
      setCgpa(cgpaCalc.toFixed(2));

      // Capture date and time
      const now = new Date();
      const dateTime = now.toLocaleString();

      // Set print info
      setPrintInfo({
        cgpa: cgpaCalc.toFixed(2),
        dateTime: dateTime,
      });
    } else {
      setCgpa(0);
      setPrintInfo(null);
    }
  };

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text("CGPA Calculator Result", 20, 20);
    if (printInfo) {
      doc.text(`CGPA: ${printInfo.cgpa}`, 20, 30);
      doc.text(`Date & Time: ${printInfo.dateTime}`, 20, 40);
    }
    doc.save("CGPA_Result.pdf");
  };

  return (
    <>
      <div className="max-w-lg mx-auto p-4 sm:p-6 md:p-8 ">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
          CGPA Calculator
        </h1>
        <label>Enter Number of Semesters:</label>
        <input
          type="number"
          className="w-full p-2 border rounded mb-4"
          value={numSem}
          onChange={handleNumSemChange}
        />
        <div>
          {Array.from({ length: numSem }, (_, index) => (
            <div key={index} className="mb-4">
              <label>Enter Credits for Semester {index + 1}:</label>
              <input
                type="number"
                className="w-full p-2 border rounded mb-2"
                onChange={(e) => handleCreditChange(index, e.target.value)}
              />
              <label>Enter Earned GPA for Semester {index + 1}:</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                onChange={(e) => handleEarnedGpaChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
        <button
          className="bg-cyan-900 rounded-md px-4 py-2 w-full text-white font-bold"
          onClick={calculateCgpa}
        >
          Calculate CGPA
        </button>
        {cgpa > 0 && (
          <div className="mt-4 text-center">
            <h2 className="text-xl font-bold">Your CGPA is: {cgpa}</h2>
            {printInfo && (
              <div className="mt-2">
                <p>Date & Time: {printInfo.dateTime}</p>
                <button
                  className="mt-4 bg-cyan-900 rounded-md px-4 py-2 text-white font-bold"
                  onClick={downloadPdf}
                >
                  Download PDF
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="text-center mt-8">
        <Link to="/">
          <button className="bg-cyan-900 rounded-md px-5 sm:px-7 py-3 sm:py-4 mx-2 font-bold text-3xl sm:text-4xl text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-950 duration-300">
            BACK
          </button>
        </Link>
        <Link to="/Gpa">
          <button className="bg-cyan-900 rounded-md px-5 sm:px-7 py-3 sm:py-4 mx-2 font-bold text-3xl sm:text-4xl text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-950 duration-300">
            GPA
          </button>
        </Link>
      </div>
    </>
  );
}

export default Cgpa;
