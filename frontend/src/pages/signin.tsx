import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setuserType] = useState('patient'); 
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Login API call
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        phone,
        password,
        userType
      });

      const token = response.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('userType', userType); 

      // Dashboard fetch
      const dashboardRes = await axios.get("http://localhost:5000/api/auth/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Dashboard Data:", dashboardRes.data);
      navigate("/dashboard");

    } catch (err: any) {
      console.error(err);
      const message = err.response?.data?.error || err.response?.data?.message || err.message || 'Login failed';
      setError(message);
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Sign in</h2>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full mt-1 px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
            User Type
          </label>
          <select
            id="userType"
            value={userType}
            onChange={(e) => setuserType(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded"
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mt-1 px-3 py-2 border rounded"
          />
        </div>

        {error && <div className="text-sm text-red-600">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
