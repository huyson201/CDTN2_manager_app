import axiosClient from './axiosClient';
const serviceApi = {
  getService: () => {
    const url = '/services';
    return axiosClient.get(url);
  },
  updateHotelService: (id, hotel_id, service_id, token) => {
    const url = `/hotel-services/${id}`;
    return axiosClient.patch(
      url,
      {hotel_id: hotel_id, service_id: service_id},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },
};
export default serviceApi;
