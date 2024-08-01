import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUpload,
  FaRegEdit,
  FaSpinner,
} from "react-icons/fa";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    shopName: "",
    divisionName: "",
    districtName: "",
    subDistrictName: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const status = "active";

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

  const handleUpload = (e) => {
    e.preventDefault();
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      alert("Profile picture uploaded successfully!");
    }, 2000);
  };

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <div className="container px-2 lg:px-7 pt-5">
      <h2 className="text-xl py-2 font-bold">Profile</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <div className="flex flex-col bg-[#e2e2e2] shadow-md rounded-lg p-4 mb-6 relative">
            <h3 className="text-lg font-medium mb-6">Profile Picture</h3>
            <div className="flex items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-white">
                <img
                  src="http://localhost:3000/images/admin.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4">
                <form onSubmit={handleUpload}>
                  <label className="bg-[#f29f6731] text-[#1e1e2c] font-semibold py-2 px-4 rounded-full flex items-center cursor-pointer">
                    <FaUpload className="mr-2" /> Upload
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleUpload}
                    />
                  </label>
                </form>
                {isUploading && (
                  <div className="ml-4">
                    <FaSpinner className="animate-spin text-[#1e1e2c]" />
                  </div>
                )}
              </div>
            </div>
            <span
              className="p-[6px] bg-[#c28f6d] rounded hover:shadow-lg hover:shadow-slate-300 cursor-pointer absolute right-4 top-4"
              onClick={toggleEdit}
            >
              <FaRegEdit />
            </span>
          </div>
          <div className="bg-[#e2e2e2] shadow-md rounded-lg p-4 mb-6">
            <div className="flex flex-col gap-2 p-7 m-2 relative bg-[#f29f6731] rounded-md">
              <div className="flex gap-2">
                <span className="text-medium font-semibold">Name: </span>
                <span>Soufiane Boukhari</span>
              </div>
              <div className="flex gap-2">
                <span className="text-medium font-semibold">Email: </span>
                <span>soufianeboukhari@gmail.com</span>
              </div>
              <div className="flex gap-2">
                <span className="text-medium font-semibold">Role: </span>
                <span>Seller</span>
              </div>
              <div className="flex gap-2">
                <span className="text-medium font-semibold">Status: </span>
                <span>Active</span>
              </div>
              <div className="flex gap-2">
                <span className="text-medium font-semibold">
                  Payment Account:
                </span>
                <p>
                  {status === "active" ? (
                    <span className="text-xs bg-[#55d43531] cursor-pointer font-normal ml-2 px-2 py-0.5 rounded">
                      Pending
                    </span>
                  ) : (
                    <span className="text-xs bg-[#3542d431] cursor-pointer font-normal ml-2 px-2 py-0.5 rounded">
                      Click Active
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#e2e2e2] shadow-md rounded-lg p-4 mb-6">
            <div className="flex flex-col gap-2 p-7 m-2 relative bg-[#f29f6731] rounded-md">
              <div className="flex gap-2">
                <span className="text-medium font-semibold">Shop Name: </span>
                <span>HMM</span>
              </div>
              <div className="flex gap-2">
                <span className="text-medium font-semibold">Division: </span>
                <span>Meknes</span>
              </div>
              <div className="flex gap-2">
                <span className="text-medium font-semibold">District: </span>
                <span>Hamria</span>
              </div>
              <div className="flex gap-2">
                <span className="text-medium font-semibold">Region: </span>
                <span>Fez-Meknes</span>
              </div>
            </div>
          </div>
        </div>

        {isEdit && (
          <div className=" w-full">
            <div className="bg-[#e2e2e2] shadow-md rounded-lg p-4 mb-6 flex-1">
              <h3 className="text-xl font-semibold mb-4">Update Profile</h3>
              <form onSubmit={handleProfileSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="shopName"
                    className="block text-[#1e1e2c] mb-1"
                  >
                    Shop Name
                  </label>
                  <div className="bg-white flex items-center border border-gray-50 rounded-lg p-2">
                    <FaUser className="text-[#1e1e2c] mr-2" />
                    <input
                      id="shopName"
                      name="shopName"
                      type="text"
                      className="w-full outline-none"
                      placeholder="Shop Name"
                      onChange={handleProfileChange}
                      value={profileData.shopName}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="divisionName"
                    className="block text-[#1e1e2c] mb-1"
                  >
                    Division Name
                  </label>
                  <div className="bg-white flex items-center border border-gray-50 rounded-lg p-2">
                    <FaUser className="text-[#1e1e2c] mr-2" />
                    <input
                      id="divisionName"
                      name="divisionName"
                      type="text"
                      className="w-full outline-none"
                      placeholder="Division Name"
                      onChange={handleProfileChange}
                      value={profileData.divisionName}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="districtName"
                    className="block text-[#1e1e2c] mb-1"
                  >
                    District Name
                  </label>
                  <div className="bg-white flex items-center border border-gray-50 rounded-lg p-2">
                    <FaUser className="text-[#1e1e2c] mr-2" />
                    <input
                      id="districtName"
                      name="districtName"
                      type="text"
                      className="w-full outline-none"
                      placeholder="District Name"
                      onChange={handleProfileChange}
                      value={profileData.districtName}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="subDistrictName"
                    className="block text-[#1e1e2c] mb-1"
                  >
                    Sub-District Name
                  </label>
                  <div className="bg-white flex items-center border border-gray-50 rounded-lg p-2">
                    <FaUser className="text-[#1e1e2c] mr-2" />
                    <input
                      id="subDistrictName"
                      name="subDistrictName"
                      type="text"
                      className="w-full outline-none"
                      placeholder="Sub-District Name"
                      onChange={handleProfileChange}
                      value={profileData.subDistrictName}
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
            <div className="bg-[#e2e2e2] shadow-md rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold mb-4">Change Password</h3>
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
                      className="w-full outline-none"
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
                      className="w-full outline-none"
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
                      className="w-full outline-none"
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
        )}
      </div>
    </div>
  );
};

export default Profile;
