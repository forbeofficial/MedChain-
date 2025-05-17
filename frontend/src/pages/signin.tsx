import { useState } from "react"
import axios from "axios";

export default function signin() {
const [phone,setPhone]=useState('');
const [password,setPassword]=useState('');
const [error,setError]=useState('');
const [loading,setLoading]=useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      phone,
      password,
    });

    localStorage.setItem('token', response.data.token); 
    window.location.href = '/dashboard';
  } catch (error: any) {
    const message = error.response?.data?.error || error.message || 'Login failed';
    setError(message);
  } finally {
    setLoading(false);
  }
};
  return (
    <>
         <div className="max-w-md mx-auto p-6 bg-white rounded shadow">

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt=""
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Star_of_life2.svg/250px-Star_of_life2.svg.png"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>


       <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form  onSubmit={handleSubmit} action="#" method="POST" className="space-y-6">
        <div>
        <label
          htmlFor="phoneNumber"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Phone Number
        </label>
        <div className="mt-2">
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            autoComplete="tel"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
          />
        </div>
      </div>
   


            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            {error && (
              <div className="text-sm text-red-500 font-medium text-center">{error}</div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}

                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
              {loading ? 'Logging in...' : 'Login'}

              </button>
            </div>

          </form>
        </div>
      </div>
      </div>
    </>
  )
}