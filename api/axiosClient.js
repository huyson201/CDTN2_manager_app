import axios from "axios";
// https://my-booking-hotel.herokuapp.com/
//   baseURL: "http://192.168.1.7:3000/",
const axiosClient = axios.create({
  baseURL: "http://192.168.1.141:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosClient;
