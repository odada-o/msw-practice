import {useEffect, useState} from 'react';
import axios from "axios";

function UserList() {
    const [users, setUsers] = useState([])
    const [newUserName, setNewUserName] = useState('')
    const [loading, setLoading] = useState(true)
    const [successMessage, setSuccessMessage] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchUsers()
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get('/api/users')
            setUsers(res.data)
            setLoading(false)
        } catch (err) {
            setError('데이터를 불러오는데 실패했습니다.')
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    // 사용자 추가
    const handleAddUser = async (e) => {
        e.preventDefault()
        // 만약 이름이 없다면 추가하지 않음
        // trim()은 문자열의 앞뒤 공백을 제거하는 함수
        if(!newUserName.trim()) return

        // 로딩 시작
        setLoading(true)

        try {
        //     post 요청으로 새로운 사용자 추가
            const res = await axios.post('/api/users', {name: newUserName})

        //     새로 추가된 사용자를 사용자 목록에 추가
            setUsers(prevUsers => [...prevUsers, res.data])

        //     새로운 사용자 추가 후 input 초기화
            setNewUserName('')
            setError(null)
        } catch (err) {
            setError('사용자 추가에 실패했습니다.')
        } finally {
            setLoading(false)
        }
    }

    // 사용자 삭제
    const handleDeleteUser = async (userId) => {
        if(!window.confirm('정말 삭제하시겠습니까?')) {
            setLoading(false)
            return
        }

        // 로딩 시작
        setLoading(true)

        try {
            // delete 요청으로 사용자 삭제
            await axios.delete(`/api/users/${userId}`)
            setUsers(prevUsers => prevUsers.filter(user => user.id !== userId))
            setSuccessMessage('사용자가 삭제되었습니다.')
            setTimeout(() => setSuccessMessage(''), 3000)
        } catch (err) {
            setError('사용자 삭제에 실패했습니다.')
        } finally {
            setLoading(false)
        }
    }

    if(loading) return <div>로딩중...</div>
    if(error) return <div>{error}</div>

    return (
        <div>
            <h1>사용자 목록</h1>
            {/* 사용자 추가 */}
            <form onSubmit={handleAddUser}>
                <input
                    type="text"
                    name="name"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder={'이름을 입력하세요'}
                    disabled={loading}
                />
                <button type="submit" disabled={loading}>
                    {loading ? '추가중...' : '사용자 추가'}
                </button>
            </form>

            {/* 에러 */}
            {error && <div>{error}</div>}

            {/* 사용자 목록 */}
            <ul>
                {users.map((user: any) => (
                    <li key={user.id}>
                        {user.id} - {user.name}
                        <button
                            onClick={() => {handleDeleteUser(user.id)}}
                            disabled={loading}
                        >삭제</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;