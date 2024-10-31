import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import userContext from "../context/userContext";
import { useContext } from "react";

export default function Register() {
    const {userName, setUserName} = useContext(userContext)

    const [newUserName, setnewUserName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false); 
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    async function Authenticate() {
        try {
            const response = await axios.post('/api/users/authenticate', { newUserName, password });
            if (response.data === "NoUser") {
                setMessage("Invalid Username or password");
            }
            if (response.data === "InvalidPassword") {
                setMessage("Invalid Username or password");
            }
            if (response.data === "Success") {
                setMessage("Logged in successfully! Redirecting... ");
                setUserName(newUserName)
                
                setTimeout(() => {
                    navigate("/articles");
                }, 2000); 
            }
        } catch (error) {
            setMessage("Error logging user in. Please try again.", error);
        }
    }

    return (
        <section className="h-screen flex items-center justify-center bg-gray-900">
            <div className="w-full max-w-6xl px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between bg-gray-800 rounded-lg shadow-lg p-8 lg:p-12">
                    <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
                        <img
                            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="w-full rounded-lg"
                            alt="Sample image"
                        />
                    </div>
                    <div className="w-full lg:w-1/2">
                        <h1 className="text-3xl mb-8 font-mono text-white text-center lg:text-left">Login</h1>
                        <form className="space-y-4">
                            <input
                                type="text"
                                placeholder="Username"
                                size="lg"
                                onChange={(e) => {
                                    setnewUserName(e.target.value);
                                }}
                                className="w-full p-4 text-2xl bg-gray-700 text-white font-mono rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                            />

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Password"
                                    className="w-full p-4 text-2xl bg-gray-700 text-white font-mono rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                                    size="lg"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div
                                    className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <FaEyeSlash className="text-white size-10" /> : <FaEye className="text-white size-10 " />}
                                </div>
                            </div>

                            <div className="text-center">
                                <button
                                    type="button"
                                    className="w-full text-2xl rounded-lg bg-gray-700 px-6 py-3 font-semibold uppercase leading-normal text-white shadow-md hover:bg-gray-600 focus:bg-gray-800 transition duration-200"
                                    onClick={() => {
                                        if (newUserName !== '' && password !== '') {
                                            Authenticate();
                                        } else {
                                            setMessage("Please enter all fields");
                                        }
                                    }}
                                >
                                    Login
                                </button>
                                <p className="mt-4 text-lg text-red-500 font-semibold">{message}</p>

                                <p className="mt-4 text-lg text-gray-300">
                                    Create an account now -{" "}
                                    <Link to="/signup" className="text-blue-600 text-xl underline transition duration-150 ease-in-out hover:text-gray-300">
                                        Register
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
