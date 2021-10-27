import axiosClient from "./axiosClient";
const hotelApi = {
  getAll: () => {
    const url = "/hotels";
    return axiosClient.get(url);
  },
  getHotelById: (id) => {
    const url = `/hotels/${id}`;
    return axiosClient.get(url);
  },
  getAllRoomsByIdHotel: (idHotel) => {
    const url = `/hotels/${idHotel}/rooms`;
    return axiosClient.get(url);
  },
  getRoomById: (id) => {
    const url = `/rooms/${id}`;
    return axiosClient.get(url);
  },
};
export default hotelApi;
