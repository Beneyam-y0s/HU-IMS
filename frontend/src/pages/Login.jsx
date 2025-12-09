import React, { useState } from "react";
import { useAuth } from "../../context/authContext.jsx";
import { useNavigate } from "react-router";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { Login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("https://localhost:3000/api/auth/login", {
                email,
                password,
            });

            if (response.data.status) {
                await Login(response.data.user, response.data.token);

                if (response.data.role === "admin") {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/customer/dashboard");
                }
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.log(error)
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center h-screen justify-center 
            bg-gradient-to-b from-green-600 from-50% to-gray-100 to-50% space-y-6">
            
            <h2 className="text-3xl text-white font-bold">HU Inventory Management System</h2>

            <div className="border shadow-lg p-6 w-80 bg-white">
                <h2 className="text-2xl font-bold mb-4">Login</h2>

                {error && <div className="bg-red-200 text-red-700 p-2 mb-4 rounded">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            className="w-full px-3 py-2 border"
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            className="w-full px-3 py-2 border"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2"
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
