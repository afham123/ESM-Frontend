// import http from 'http'

// require('dotenv').config();
import axios from 'axios';
const constant = require('../constant.js');
const {server_url, API_SECRET_DATA, API_SECRET_KEY} = constant;

export async function loginUser(email, password) {
  try {
    console.log(email, password);
    const response = await axios.post(
      `${server_url}/USER/getUserProfile`, // Replace with your server URL
      { email, password }, // Request body with login data
      {
        headers: {
          'API_SECRET_KEY': API_SECRET_KEY, // Custom headers
          'API_SECRET_DATA': API_SECRET_DATA,
        },
      }
    );
    
    // Process response
    console.log('Login Request sent successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error.response ? error.response.data : error.message);
    throw error;
  }
}


export async function verifyMFA(email, password, MFA_Code) {
  try {
    console.log(email, password, MFA_Code);
    const response = await axios.post(
      `${server_url}/USER/verify_mfa`, // Replace with your server URL
      { email, password, MFA_Code }, // Request body with login data
      {
        headers: {
          'API_SECRET_KEY': API_SECRET_KEY, // Custom headers
          'API_SECRET_DATA': API_SECRET_DATA,
        },
      }
    );
    
    // Process response
    console.log('Login Request sent successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error.response ? error.response.data : error.message);
    throw error;
  }
}