import './App.css'
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom'
import AuthPage from './Pages/AuthPage';
import Home from './Pages/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { GlobalLoader } from './Components/GlobalLoader';
import { Login } from './Pages/Auth/Login';
import { Register } from './Pages/Auth/Register';


function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <GlobalLoader />
          <Toaster position="top-right" reverseOrder={false} />
          <Routes>
            {/* Default redirect to /home */}
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} >
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route path="*" element={<div className="p-6 text-center">404 - Page Not Found</div>} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
