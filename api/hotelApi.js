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
    const url = `/hotels/${idHotel}/rooms?sort=updatedAt:desc`;
    return axiosClient.get(url);
  },
  getRoomById: id => {
    const url = `/rooms/${id}`;
    return axiosClient.get(url);
  },
  getServiceByHotelId: id => {
    const url = `/hotels/${id}/services`;
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
  create: (formData, token) => {
    const url = `/hotels`;
    // console.log(formData.values(), 'formData.....');
    return axiosClient.post(url, formData, {
      headers: {
        'Content-Type': `multipart/form-data`,
        Authorization: `Bearer ${token}`,
      },
    });
  },
  update: (formData, token, id) => {
    const url = `/hotels/${id}`;
    return axiosClient.patch(url, formData, {
      headers: {
        'Content-Type': `multipart/form-data`,
        Authorization: `Bearer ${token}`,
      },
    });
  },
  delete: (id, token) => {
    const url = `/hotels/${id}`;
    return axiosClient.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
export default hotelApi;
