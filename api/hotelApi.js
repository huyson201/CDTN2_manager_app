import axiosClient from './axiosClient';
const hotelApi = {
  getAll: () => {
    const url = '/hotels';
    return axiosClient.get(url);
  },
  getHotelById: id => {
    const url = `/hotels/${id}`;
    return axiosClient.get(url);
  },
  getAllRoomsByIdHotel: idHotel => {
    const url = `/hotels/${idHotel}/rooms`;
    return axiosClient.get(url);
  },
  getRoomById: id => {
    const url = `/rooms/${id}`;
    return axiosClient.get(url);
  },
  getHotelsOfOwner: (id, token) => {
    const url = `/users/${id}/hotels`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  
 
};
export default hotelApi;
