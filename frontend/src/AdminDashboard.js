// AdminDashboard.js
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEllipsisH,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import AddUserForm from "./AddUserForm";
import { getAllUserProfiles, removeUser } from "./utils/api";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [showMenu, setShowMenu] = useState(null);

  const handleMenuClick = (index) => {
    setShowMenu(index === showMenu ? null : index);
  };

  useEffect(() => {
    (async () => {
      const allUsers = await getAllUserProfiles();
      setUsers(allUsers);
    })();
  }, []);

  const handleAddUser = (newUser) => {
    console.log("New user added:", newUser);
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleDelete = async (userMail) => {
    const result = await removeUser(userMail);
    if (result) {
      alert("User removed successfully");
      // Fetch updated users list
      const allUsers = await getAllUserProfiles();
      setUsers(allUsers);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-8 flex flex-col md:flex-row">
        {/* User Table */}
        <div className="bg-white shadow-md rounded-lg mt-6 md:w-2/3 md:mr-4 overflow-auto">
          <table className="min-w-full leading-normal">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <FontAwesomeIcon icon={faUser} className="mr-2" /> Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  City
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Password
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  CCTV IP
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id || index}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {user.name}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {user.city}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {user.email}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {user.password}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {Array.isArray(user.cctvIp)
                      ? user.cctvIp.map((value, idx) => (
                          <div key={idx}>{value}</div>
                        ))
                      : user.cctvIp}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                    <div className="relative inline-block text-left">
                      <FontAwesomeIcon
                        icon={faEllipsisH}
                        className="text-gray-500 cursor-pointer"
                        onClick={() => handleMenuClick(index)}
                      />
                      {showMenu === index && (
                        <div className="absolute z-20 right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                          <div className="py-1">
                            <button
                              onClick={() => {
                                // Handle update action
                                setShowMenu(null);
                              }}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              <FontAwesomeIcon icon={faEdit} className="mr-2" />
                              Update
                            </button>
                            <button
                              onClick={() => {
                                setShowMenu(null);
                                handleDelete(user.email);
                              }}
                              className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="mr-2"
                              />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add User Form */}
        <div className="mt-6 md:mt-6 md:w-1/3">
          <AddUserForm onAddUser={handleAddUser} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
