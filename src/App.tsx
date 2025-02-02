import {useEffect, useState} from 'react'
import './App.css'

function App() {
    const [user, setUser] = useState<{name: string; email: string} | null>(null)

    useEffect(() => {
        fetch('/api/user')
            .then((res) => res.json())
            .then((data) => setUser(data))
    }, [])

    return (
    <>
      <h1>Mock API width MSW</h1>
        {user ? (
            <div>
                <h2>Welcome {user.username}</h2>
                <p>Email: {user.email}</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
        ) : (
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        )}
    </>
  )
}

export default App
