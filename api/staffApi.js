import axiosClient from './axiosClient';
const staffApi = {
  getStaffByHotelId: (id, token) => {
    const url = `/hotels/${id}/staffs`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  createStaff: (name,email,password,phone,staffRole,hotelId, token) => {
    const url = `/staffs`;
    return axiosClient.post(
      url,
      {
        user_name: 'huy son',
        user_email: 'huyson2010@gmail.com',
        user_password: '123123',
        user_role: 2,
        user_phone: '016541745',
        staff_role: 2,
        hotel_id: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },
  deleteStaffById: (id, token) => {
    const url = `/staffs/${id}`;
    return axiosClient.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
export default staffApi;
