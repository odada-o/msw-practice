import UserList from "./components/user/UserList.tsx";
import UserDetail from "./components/user/UserDetail.tsx";
import RegisterForm from "./components/auth/RegisterForm.tsx";
import LoginForm from "./components/auth/LoginForm.tsx";


function App() {

    return (
    <>
      <h1>Mock API width MSW</h1>
        <RegisterForm />
        <LoginForm />
        <UserList />
        <UserDetail />
    </>
  )
}

export default App
