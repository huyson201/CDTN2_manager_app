import axios from 'axios'

const addressApi = axios.create({
    baseURL: "https://api.mysupership.vn/v1/partner",
    headers: {
        "Content-Type": "application/json",
    },
})


const addressUtil = {
    getProvince: function () {
        return addressApi.get('/areas/province')

    },
    getDistrict: function (provinceCode) {
        return addressApi.get(`/areas/district?province=${provinceCode}`)
    },
    getCommune: function (districtCode) {
        return addressApi.get(`/areas/commune?district=${districtCode}`)
    }
}

export default addressUtil