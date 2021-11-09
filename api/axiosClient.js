import axios from "axios";
// https://my-booking-hotel.herokuapp.com/
const axiosClient = axios.create({
  baseURL: "http://192.168.1.141:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosClient;
