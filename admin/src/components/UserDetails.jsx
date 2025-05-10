import React from "react";
import userprop from "@/assets/userprop.png";
import { Trash } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserDetails = ({ user }) => {
    const { userName, email, mobile, isAdmin, _id } = user;
    const navigate = useNavigate();

    const deleteHandler = async () => {     
        try {
            await axios.delete(`http://localhost:8000/api/users/${_id}`);
            navigate("/users");
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="flex items-center w-full p-4 transition-shadow duration-200 bg-white rounded-lg shadow-sm hover:shadow-md gap-x-">
            {/* User Avatar */}
            <div className="w-[10%] min-w-[50px]">
                <img
                    src={userprop}
                    alt="User"
                    className="object-cover w-8 h-8 border-2 border-gray-200 rounded-full"
                />
            </div>

            {/* User Name */}
            <div className="w-[25%] min-w-[150px] pl-4">
                <p className="font-medium text-gray-900 truncate">
                    {userName}
                </p>
            </div>

            {/* Email */}
            <div className="w-[30%] min-w-[200px]">
                <p className="text-gray-600 truncate" title={email}>
                    {email}
                </p>
            </div>

            {/* Mobile */}
            <div className="w-[20%] min-w-[120px]">
                <p className="text-gray-600">{mobile}</p>
            </div>

            {/* Admin Badge */}
            <div className="w-[15%]">
                {isAdmin && (
                    <span className="px-3 py-1 text-xs font-semibold text-orange-700 bg-orange-100 rounded-full">
                        Admin
                    </span>
                )}
            </div>

            {/* Delete Button */}
            <div className="w-[10%] text-right">
                <button 
                    onClick={deleteHandler}
                    className="p-2 text-gray-400 transition-colors rounded-full hover:text-red-600 hover:bg-red-50"
                    aria-label="Delete user"
                >
                    <Trash size={18} />
                </button>
            </div>
        </div>
    );
};

export default UserDetails;