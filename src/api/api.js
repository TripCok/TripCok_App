import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1', // 공통 API 주소
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;