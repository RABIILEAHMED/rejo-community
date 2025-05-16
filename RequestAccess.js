import React, { useState } from "react";
import axios from "axios";

const RequestAccess = () => {
  const [transactionId, setTransactionId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Send transaction ID to backend
    try {
      const response = await axios.post("http://localhost:5000/api/check-payment", { transactionId });
      
      if (response.data.success) {
        setMessage("Phone-kaaga waa la xaqiijiyey! Waxaad hadda bilaabi kartaa download ka.");
      } else {
        setMessage("Wali Phone-kaaga lama xaqiijin. Fadlan xaqiiji Phone ID-gaaga.");
      }
    } catch (error) {
      setMessage("Waxaa dhacay cilad. Fadlan isku day mar kale.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded shadow-xl">
        <h2 className="text-2xl mb-4">Request Access</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            className="p-2 border border-gray-300 rounded mb-4 w-full"
            placeholder="Gali Transaction ID"
            required
          />
          <button type="submit" className="bg-yellow-500 text-white py-2 px-4 rounded w-full">
            Submit
          </button>
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default RequestAccess;
