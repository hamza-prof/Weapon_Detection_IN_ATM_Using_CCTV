// api.js
import axios from "axios";

// base url
const BASE_URL = "http://localhost:3500";

// login
async function login(email, password) {
  try {
    const response = await axios.post(
      `${BASE_URL}/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

// function to get profile details
async function getProfileDetails(userMail, isAdmin) {
  try {
    const response = await axios.post(
      `${BASE_URL}/getProfileDetails`,
      { userMail, isAdmin },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching profile details:", error);
  }
}

// function to update CCTV IPs
async function updateCCTVIps(userMail, ips) {
  try {
    const response = await axios.put(
      `${BASE_URL}/updateCCTVIps/${userMail}`,
      { ips },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating CCTV IPs:", error);
  }
}

// function to get all user profiles
async function getAllUserProfiles() {
  try {
    const response = await axios.get(`${BASE_URL}/getProfileDetails`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all user profiles:", error);
  }
}

async function addUser(user) {
  console.log(user);
  try {
    const response = await axios.post(
      `${BASE_URL}/getProfileDetails/user`,
      {
        ...user,
        cctvIp: user.cctvIp.split("\n"),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    alert("User cannot be added");
    console.error("Error adding user:", error);
    return null;
  }
}

async function removeUser(userMail) {
  try {
    const response = await axios.post(
      `${BASE_URL}/getProfileDetails/user/remove`,
      { userMail },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    alert("User cannot be removed");
    console.error("Error removing user:", error);
    return null;
  }
}

async function updateAdminDetails(adminMail, fullName, city) {
  try {
    const response = await axios.put(
      `${BASE_URL}/getProfileDetails/admin/update`,
      { fullName, city, adminMail },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating admin details:", error);
  }
}

export {
  login,
  getProfileDetails,
  updateCCTVIps,
  getAllUserProfiles,
  addUser,
  removeUser,
  updateAdminDetails,
};
