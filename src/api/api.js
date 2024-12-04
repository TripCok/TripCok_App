import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
    baseURL: 'http://192.168.0.18:9090/api/v1', // 공통 API 주소
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;