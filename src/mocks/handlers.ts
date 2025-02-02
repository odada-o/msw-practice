// API 요청을 가로챌 핸들러들을 정의하는 파일
import { http, HttpResponse } from 'msw'  // 새로운 2.7.0 문법!

export const handlers = [
    // 간단한 GET 요청 핸들러 예시
    http.get('/api/users', () => {
        // 가짜 데이터 응답
        return HttpResponse.json([
            { id: 1, name: '김철수' },
            { id: 2, name: '이영희' },
        ])
    }),
]