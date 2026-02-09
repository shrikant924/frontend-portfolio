import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../features/auth/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';

interface LoginForm {
  username: string;
  password: string;
}

const Login = () => {
  const [loginApi] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputData, setInputData] = useState<LoginForm>({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const doLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginApi(inputData).unwrap();

      dispatch(setCredentials(response));

      alert('Logged in successfully');

      navigate('/');
    } catch (error: any) {
      alert(error?.data || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

        {/* Form */}
        <form onSubmit={doLogin} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-gray-600 mb-1 text-sm font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={inputData.username}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={inputData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
            />
          </div>

          {/* Remember me */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="accent-blue-500" />
              Remember me
            </label>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
          >
            Log in
          </button>

          {/* Signup Link */}
          <div className="text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
