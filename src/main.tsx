import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App.tsx'

async function enableMocking() {
    if (process.env.NODE_ENV !== 'development') {
        return
    }

    const { worker } = await import('./mocks/browser')

    // MSW 시작
    return worker.start({
        onUnhandledRequest: 'bypass', // 모킹되지 않은 요청은 그대로 통과시킴
    })
}

enableMocking().then(() => {
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
})
