import { useState } from "react";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";

const Gpa = () => {
  const [numSubjects, setNumSubjects] = useState(0);
  const [grades, setGrades] = useState([]);
  const [credits, setCredits] = useState([]);
  const [gpa, setGpa] = useState(null);
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalEarnedCredit, setTotalEarnedCredit] = useState(0);

  // Define grade points
  const gradePoints = {
    A: 8,
    "A+": 9,
    O: 10,
    B: 6,
    "B+": 7,
  };

  const handleNumSubjectsChange = (e) => {
    const num = parseInt(e.target.value) || 0;
    setNumSubjects(num);
    setGrades(new Array(num).fill(""));
    setCredits(new Array(num).fill(0));
  };

  const handleGradeChange = (index, value) => {
    const newGrades = [...grades];
    newGrades[index] = value.toUpperCase();
    setGrades(newGrades);
  };

  const handleCreditChange = (index, value) => {
    const newCredits = [...credits];
    newCredits[index] = parseInt(value) || 0;
    setCredits(newCredits);
  };

  const calculateGpa = () => {
    let totalCreditCalc = 0;
    let totalEarnedCreditCalc = 0;

    grades.forEach((grade, index) => {
      const credit = credits[index];
      totalCreditCalc += credit;
      totalEarnedCreditCalc += (gradePoints[grade] || 0) * credit;
    });

    const gpaCalc = totalEarnedCreditCalc / totalCreditCalc;
    setGpa(gpaCalc.toFixed(2));
    setTotalCredit(totalCreditCalc);
    setTotalEarnedCredit(totalEarnedCreditCalc);
  };

  const generatePdf = () => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    doc.text("GPA Calculation Report", 10, 10);
    doc.text(`Date: ${currentDate}`, 10, 20);
    doc.text(`Time: ${currentTime}`, 10, 30);
    doc.text(`Number of Subjects: ${numSubjects}`, 10, 40);
    doc.text(`Total Credits: ${totalCredit}`, 10, 50);
    doc.text(`Total Earned Points: ${totalEarnedCredit}`, 10, 60);
    doc.text(`Your GPA is: ${gpa}`, 10, 70);

    doc.save("GPA_Report.pdf");
  };

  return (
    <>
      <div className="max-w-lg mx-auto p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
          GPA Calculator
        </h1>
        <div className="mb-4">
          <label className="block font-medium mb-2 text-sm sm:text-base">
            Enter the number of subjects:
          </label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={numSubjects}
            onChange={handleNumSubjectsChange}
          />
        </div>
        {Array.from({ length: numSubjects }, (_, index) => (
          <div key={index} className="mb-4">
            <label className="block font-medium mb-2 text-sm sm:text-base">
              Enter grade for subject {index + 1}:
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded mb-2"
              value={grades[index]}
              onChange={(e) => handleGradeChange(index, e.target.value)}
            />
            <label className="block font-medium mb-2 text-sm sm:text-base">
              Enter credit for subject {index + 1}:
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={credits[index]}
              onChange={(e) => handleCreditChange(index, e.target.value)}
            />
          </div>
        ))}
        <button
          className="bg-cyan-900 text-white p-2 rounded w-full mt-4 sm:mt-6 md:mt-8"
          onClick={calculateGpa}
        >
          Calculate GPA
        </button>
        {gpa && (
          <div className="mt-4 sm:mt-6 md:mt-8 text-center">
            <h2 className="text-xl sm:text-2xl font-bold">Your GPA is: {gpa}</h2>
            <p className="mt-2 sm:mt-4">Number of Subjects: {numSubjects}</p>
            <p>Total Credit: {totalCredit}</p>
            <p>Total Earned Points: {totalEarnedCredit}</p>
            <button
              className="bg-cyan-900 text-white p-2 rounded mt-4"
              onClick={generatePdf}
            >
              Download PDF
            </button>
          </div>
        )}
      </div>

      <div className="text-center mt-8">
        <Link to="/">
          <button className="bg-cyan-900 rounded-md px-5 sm:px-7 py-3 sm:py-4 mx-2 font-bold text-3xl sm:text-4xl text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-950 duration-300">
            BACK
          </button>
        </Link>
        <Link to="/Cgpa">
          <button className="bg-cyan-900 rounded-md px-5 sm:px-7 py-3 sm:py-4 mx-2 font-bold text-3xl sm:text-4xl text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-950 duration-300">
            CGPA
          </button>
        </Link>
      </div>
    </>
  );
};

export default Gpa;
