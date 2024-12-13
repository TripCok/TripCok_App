import axios from 'axios';

// const sv_api = "192.168.0.18";
const sv_api = "52.79.199.83";
// const sv_api = "192.168.0.27";

// Axios 인스턴스 생성
const api = axios.create({

    baseURL: `http://${sv_api}:9090/api/v1`, // 공통 API 주소
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;