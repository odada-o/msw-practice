// src/components/UserDetail.tsx
import { useState } from 'react';
import axios from 'axios';

function UserDetail() {
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchUser = async (e) => {
        e.preventDefault();

        // 입력값 검증
        if (!userId.trim()) {
            setError('사용자 ID를 입력해주세요');
            return;
        }

        setLoading(true);
        setError('');
        setUser(null);

        try {
            const response = await axios.get(`/api/users/${userId}`);
            setUser(response.data);
        } catch (err) {
            if (err.response?.status === 404) {
                setError('사용자를 찾을 수 없습니다.');
            } else {
                setError('사용자 조회 중 오류가 발생했습니다.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">사용자 상세 정보 조회</h1>

            <form onSubmit={fetchUser} className="mb-4">
                <input
                    type="number"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="사용자 ID 입력"
                    className="border p-2 mr-2 rounded"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                >
                    {loading ? '조회 중...' : '조회'}
                </button>
            </form>

            {error && (
                <div className="text-red-600 mb-4">
                    {error}
                </div>
            )}

            {user && (
                <div className="border rounded p-4">
                    <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
                    <div className="space-y-2">
                        <p>ID: {user.id}</p>
                        <p>이메일: {user.email}</p>
                        <p>역할: {user.role}</p>
                        {user.profile && (
                            <>
                                <p>전화번호: {user.profile.phoneNumber}</p>
                                <p>주소: {user.profile.address}</p>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserDetail;