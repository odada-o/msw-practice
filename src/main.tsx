import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App.tsx'

if (import.meta.env.MODE === 'development') {
    import('./mocks/browser')
        .then(({ worker }) => worker.start())
        .catch((err) => console.error('MSW Failed', err));
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
