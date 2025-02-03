// API 요청을 가로챌 핸들러들을 정의하는 파일
import { http, HttpResponse } from 'msw'  // 새로운 2.7.0 문법!
import userData from '../data/users.json'

export const userHandlers = [
    // GET /api/users - 사용자 목록 조회
    http.get('/api/users', ({request}) => {
        // URL에서 role 쿼리 파라미터를 가져옴
        const url = new URL(request.url)
        // URLSearchParams 객체를 사용하여 쿼리 파라미터를 가져옴
        const role = url.searchParams.get('role')

        let users = userData.users

        // role 쿼리 파라미터가 존재한다면 해당 역할을 가진 사용자만 필터링
        if(role) {
            users = users.filter(user => user.role === role)
        }

        // 가짜 데이터 응답
        return HttpResponse.json(users)
    }),

    // GET /api/users/:id - 특정 사용자 조회
    http.get('/api/users/:id', ({params}) => {
      const user = userData.users.find(user => user.id === Number(params.id))

        if(!user) {
            return HttpResponse.json({message: '사용자를 찾을 수 없습니다.'}, {status: 404})
        }

        return HttpResponse.json(user)
    }),

    // POST 요청 핸들러 추가
    http.post('/api/users', async ({request}) => {
        // 요청 데이터를 파싱
        const newUser = await request.json()

    // 새로운 사용자 추가
        const user = {
            id: users.length + 1,
            name: newUser.name,
        }

        // 사용자 목록에 추가
        users.push(user)

    // 새로운 사용자 응답
        return HttpResponse.json(user, {status: 201})
    }),

    // DELETE 요청 핸들러 추가
    http.delete('/api/users/:id', async ({params}) => {
        const id = Number(params.id)

        // 해당 id의 사용자가 존재하는지 확인
        const userExists = users.find(user => user.id === id)

        if(!userExists) {
            return HttpResponse.json({message: '사용자를 찾을 수 없습니다.'}, {status: 404})
        }

        // 배열에서 해당 사용자 제거
        users = users.filter(user => user.id !== id)

        // 삭제 응답
        return HttpResponse.json({message: '사용자가 삭제되었습니다.'}, {status: 200})

    })
]