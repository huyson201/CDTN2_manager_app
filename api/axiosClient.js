import axios from "axios";
// https://my-booking-hotel.herokuapp.com/
//   baseURL: "http://192.168.1.7:3000/",
const axiosClient = axios.create({
  baseURL: "https://my-booking-hotel.herokuapp.com/",
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosClient;
