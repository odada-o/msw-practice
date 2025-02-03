import { http, HttpResponse, delay } from 'msw'
import userData from '../data/users.json'

let users = userData.users

export const authHandlers = [
    // login handler
    http.post('/api/login', async ({request}) => {
        const {email, password} = await request.json()

        // 의도적으로 약간의 지연 추가
        await delay(500)

        // 사용자 조회
        const user = users.find(user => user.email === email)

        if(!user || user.password !== password) {
            return new HttpResponse((
                JSON.stringify({message: '이메일 또는 비밀번호가 일치하지 않습니다.'}),
                {status: 401}
            ))
        }

        // 비밀번호 제외하고 응답
        const {password: _, ...userWithoutPassword} = user

        return HttpResponse.json({
            user: userWithoutPassword,
            token: `fake-jwt-token.${user.id}`
        })

    }),

    // 회원가입 핸들러 추가
    http.post('/api/register', async ({request}) => {
        const newUser = await request.json()

        await delay(500)

        // 이메일 중복 체크
        if (users.some(user => user.email === newUser.email)) {
            return new HttpResponse(
                JSON.stringify({ message: '이미 사용 중인 이메일입니다.' }),
                { status: 400 }
            )
        }

        // 새 사용자 생성
        const user = {
            id: users.length + 1,
            ...newUser,
            role: 'USER'
        }

        users.push(user)

        // 비밀번호는 제외하고 응답
        const { password: _, ...userWithoutPassword } = user

        return HttpResponse.json({
            user: userWithoutPassword,
            token: `fake-jwt-token-${user.id}`
        }, { status: 201 })
    })
]