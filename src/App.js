import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTenure, setLoanTenure] = useState('');
  const [prepayment, setPrepayment] = useState('');
  const [emi, setEmi] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  const [breakdown, setBreakdown] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 12 / 100;
    const tenure = parseInt(loanTenure) * 12;
    const emiCalc = (principal * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1);

    const totalPay = emiCalc * tenure;
    const totalInt = totalPay - principal;

    setEmi(emiCalc.toFixed(2));
    setTotalPayment(totalPay.toFixed(2));
    setTotalInterest(totalInt.toFixed(2));

    const breakdownArr = [];
    let balance = principal;
    for (let i = 1; i <= tenure; i++) {
      const interestPaid = balance * rate;
      const principalPaid = emiCalc - interestPaid;
      balance -= principalPaid;
      breakdownArr.push({
        month: i,
        emi: emiCalc.toFixed(2),
        interestPaid: interestPaid.toFixed(2),
        principalPaid: principalPaid.toFixed(2),
        balance: balance.toFixed(2),
      });
    }
    setBreakdown(breakdownArr);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateEMI();
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} transition-all duration-500`}>
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">EMI Calculator</h1>
          <button
            onClick={toggleDarkMode}
            className="bg-indigo-500 text-white px-4 py-2 rounded-md shadow-md flex items-center"
          >
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} size="lg" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-md shadow-lg space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Loan Amount</label>
              <input
                type="number"
                className="w-full px-4 py-2 border dark:bg-gray-700 dark:border-gray-600 rounded-md"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Interest Rate (%)</label>
              <input
                type="number"
                className="w-full px-4 py-2 border dark:bg-gray-700 dark:border-gray-600 rounded-md"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Loan Tenure (Years)</label>
              <input
                type="number"
                className="w-full px-4 py-2 border dark:bg-gray-700 dark:border-gray-600 rounded-md"
                value={loanTenure}
                onChange={(e) => setLoanTenure(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Prepayment Amount (Optional)</label>
              <input
                type="number"
                className="w-full px-4 py-2 border dark:bg-gray-700 dark:border-gray-600 rounded-md"
                value={prepayment}
                onChange={(e) => setPrepayment(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Calculate EMI
          </button>
        </form>

        {emi && (
          <div className="mt-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold">Results</h2>
              <p className="mt-4">EMI: <strong>₹{emi}</strong></p>
              <p>Total Interest Payable: <strong>₹{totalInterest}</strong></p>
              <p>Total Payment (Principal + Interest): <strong>₹{totalPayment}</strong></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
