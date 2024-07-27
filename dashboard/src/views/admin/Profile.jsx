import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaUpload } from "react-icons/fa";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(profileData, null, 2));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(passwordData, null, 2));
  };

  return (
    <div className="container px-2 lg:px-7 pt-5">
      <h2 className="text-xl py-2 font-bold">Profile</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <div className="bg-[#e2e2e2] shadow-md rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium mb-4">Profile Picture</h3>
            <div className="flex items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-white">
                <img
                  src="http://localhost:3000/images/admin.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4">
                <button className="bg-[#f29f6731] text-[#1e1e2c] font-semibold py-2 px-4 rounded-full flex items-center">
                  <FaUpload className="mr-2" /> Upload
                </button>
              </div>
            </div>
          </div>

          <div className="bg-[#e2e2e2] shadow-md rounded-lg p-4 flex-1">
            <h3 className="text-xl font-semibold mb-4">Update Profile</h3>
            <form onSubmit={handleProfileSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-[#1e1e2c] mb-1">
                  Name
                </label>
                <div className="bg-white flex items-center border border-gray-50 rounded-lg p-2">
                  <FaUser className="text-[#1e1e2c] mr-2" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="w-full outline-none placeholder-black"
                    placeholder="Name"
                    onChange={handleProfileChange}
                    value={profileData.name}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-[#1e1e2c] mb-1">
                  Email
                </label>
                <div className="bg-white flex items-center border border-gray-50 rounded-lg p-2">
                  <FaEnvelope className="text-[#1e1e2c] mr-2" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="w-full outline-none placeholder-black"
                    placeholder="Email"
                    onChange={handleProfileChange}
                    value={profileData.email}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-[#f29f6731] text-[#1e1e2c] font-semibold py-2 px-4 rounded-full"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>

        <div className="bg-[#e2e2e2] shadow-md rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-4">Change Password</h3>
          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-4">
              <label
                htmlFor="currentPassword"
                className="block text-[#1e1e2c] mb-1"
              >
                Current Password
              </label>
              <div className="bg-white flex items-center border border-gray-50 rounded-lg p-2">
                <FaLock className="text-[#1e1e2c] mr-2" />
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  className="w-full outline-none placeholder-black"
                  placeholder="Current Password"
                  onChange={handlePasswordChange}
                  value={passwordData.currentPassword}
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-[#1e1e2c] mb-1"
              >
                New Password
              </label>
              <div className="bg-white flex items-center border border-gray-50 rounded-lg p-2">
                <FaLock className="text-[#1e1e2c] mr-2" />
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  className="w-full outline-none placeholder-black"
                  placeholder="New Password"
                  onChange={handlePasswordChange}
                  value={passwordData.newPassword}
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-[#1e1e2c mb-1"
              >
                Confirm Password
              </label>
              <div className="bg-white flex items-center border border-gray-50 rounded-lg p-2">
                <FaLock className="text-[#1e1e2c] mr-2" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="w-full outline-none placeholder-black"
                  placeholder="Confirm Password"
                  onChange={handlePasswordChange}
                  value={passwordData.confirmPassword}
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-[#f29f6731] text-[#1e1e2c] font-semibold py-2 px-4 rounded-full"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
