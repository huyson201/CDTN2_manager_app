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
  getHotelOfStaffId: (id, token) => {
    const url = `/staffs/${id}/hotels`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getStaffByUserId: (id) => {
    const url = `/staffs?user_uuid=${id}`;
    return axiosClient.get(url);
  },
  createStaff: (name, email, phone, staffRole, hotelId, token) => {
    const url = `/staffs`;
    return axiosClient.post(
      url,
      {
        user_name: name,
        user_email: email,
        user_password: '123123',
        user_phone: phone,
        staff_role: staffRole,
        hotel_id: hotelId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },
  updateStaff: (id, staffRole, token) => {
    const url = `/staffs/${id}`;
    return axiosClient.patch(
      url,
      {
        role: staffRole,
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
