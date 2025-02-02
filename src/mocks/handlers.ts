import {http, HttpResponse} from "msw";

export const handlers = [
    http.get('/api/user', async () => {
        return HttpResponse.json({
            id: 1,
            username: 'admin',
            email: 'test@mail.com'
        })
    }),

    http.post('/api/login', async ({request}) => {
        const {username, password} = await request.json();

        if(username === 'admin' && password === 'password') {
            return HttpResponse.json({
                message: 'Login successful'
            })
        } else {
            return HttpResponse.json({
                message: 'Invalid username or password'
            }, {
                status: 401
            })
        }
    })
]