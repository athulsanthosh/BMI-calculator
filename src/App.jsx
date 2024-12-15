import { useState } from 'react';
import './App.css';

function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');

  // Function to calculate BMI
  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = height / 100; // Convert cm to meters
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(bmiValue);

      // Determine BMI category
      if (bmiValue < 18.5) {
        setBmiCategory('Underweight');
      } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
        setBmiCategory('Normal weight');
      } else if (bmiValue >= 25 && bmiValue < 29.9) {
        setBmiCategory('Overweight');
      } else {
        setBmiCategory('Obesity');
      }
    }
  };

  // Reset the form
  const resetForm = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
    setBmiCategory('');
  };

  // Function to calculate the gauge width percentage
  const getGaugePercentage = () => {
    if (!bmi) return 0;
    const bmiValue = parseFloat(bmi);
    
    // Scale the gauge from 18.5 to 30 (Underweight, Normal, Overweight, Obesity)
    if (bmiValue < 18.5) {
      return (bmiValue / 18.5) * 25; // Underweight: 0 to 25% of the gauge
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      return ((bmiValue - 18.5) / (24.9 - 18.5)) * 50 + 25; // Normal weight: 25 to 75%
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      return ((bmiValue - 25) / (29.9 - 25)) * 15 + 75; // Overweight: 75 to 90%
    } else {
      return 100; // Obesity: 90 to 100%
    }
  };

  return (
    <div className="App">
      <div className="container d-flex justify-content-center align-items-center">
        <div className="card p-5 shadow-lg rounded-lg">
          <h1 className="text-center text-light mb-4">BMI Calculator</h1>
          <div className="mb-4">
            <label htmlFor="weight" className="form-label text-light">Weight (kg):</label>
            <input
              className="form-control input-field"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter your weight"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="height" className="form-label text-light">Height (cm):</label>
            <input
              className="form-control input-field"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter your height"
            />
          </div>
          <div className="d-flex justify-content-between mb-4">
            <button onClick={calculateBMI} className="btn btn-primary w-48">Calculate</button>
            <button onClick={resetForm} className="btn btn-secondary w-48">Reset</button>
          </div>
          {bmi && (
            <div className="result text-center text-light">
              <h2>Your BMI: {bmi}</h2>
              <p>Category: {bmiCategory}</p>

              {/* BMI Gauge */}
              <div className="gauge-container">
                <div className="gauge-bar">
                  <div
                    className="gauge-progress"
                    style={{ width: `${getGaugePercentage()}%` }}
                  ></div>
                </div>
                <p className="gauge-label">{bmiCategory}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
