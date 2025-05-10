import React, { useEffect, useState } from "react";
import axios from "axios";
import UserDetails from "../../components/UserDetails";

const URL = "http://localhost:8000/api/users";

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await axios.get(URL);

                if (response.data) {
                    const usersArray = Array.isArray(response.data) ? response.data : response.data.users;
                    setUsers(usersArray && Array.isArray(usersArray) ? usersArray : []);
                } else {
                    setUsers([]);
                }
            } catch (err) {
                console.error("Error fetching users:", err);
                setError("Failed to fetch users. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (loading)
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-12 h-12 border-4 border-indigo-500 rounded-full animate-spin border-t-transparent"></div>
                <p className="ml-4 text-gray-600">Loading users...</p>
            </div>
        );

    if (error)
        return (
            <div className="flex items-center max-w-2xl p-4 mx-auto mt-8 text-red-700 bg-red-100 rounded-lg">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                </svg>
                {error}
            </div>
        );

    return (
        <div className="max-w-6xl p-8 mx-auto">
            <header className="mb-12 text-center">
                <h1 className="mb-6 text-3xl font-semibold text-gray-800">User Management</h1>

                <div className="p-8 text-white transition-shadow duration-300 shadow-lg rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:shadow-xl">
                    <div className="flex items-center justify-center gap-4">
                        <div className="p-4 rounded-full bg-white/10">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-10 h-10"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
                                />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm opacity-90">Total Users</p>
                            <h2 className="text-4xl font-bold">{users.length}</h2>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex flex-col gap-4">
                {users.length > 0 ? (
                    users.map((user, index) => (
                        <div
                            key={user._id}
                            className={`w-full ${index !== users.length - 1 ? "border-b border-gray-200" : ""}`}
                        >
                            <UserDetails user={user} />
                        </div>
                    ))
                ) : (
                    <div className="py-12 text-center">
                        <img
                            src="/empty-state.svg"
                            alt="No users"
                            className="w-48 mx-auto mb-6 opacity-70"
                        />
                        <p className="text-lg text-gray-500">No users found in the system</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default UsersPage;
