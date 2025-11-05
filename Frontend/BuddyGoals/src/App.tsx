import './App.css'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import AuthPage from './Pages/AuthPage';
import Home from './Pages/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { GlobalLoader } from './Components/GlobalLoader';
import { Login } from './Pages/Auth/Login';
import { Register } from './Pages/Auth/Register';
import { Profile } from './Pages/Profile';
import { Explore } from './Pages/Explore';
import { Community } from './Pages/Community';
import { Settings } from './Pages/Settings';
import { Chat } from './Pages/Chat';
import { MainLayout } from './Components/MainLayout';
import Todo from  './Pages/Todo';
import { TodoDetail } from './Pages/Todo/TodoDetail';
import { ProtectedRoute } from './Components/ProtectedRoute';


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
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Navigate to="home" replace />} />
                <Route path="home" element={<Home />} />
                <Route path="explore" element={<Explore />} />
                <Route path="community" element={<Community />} />
                <Route path="settings" element={<Settings />} />
                <Route path="chats" element={<Chat />} />
                <Route path="profile" element={<Profile />} />
                <Route path="todo" element={<Todo />}>
                  <Route path=":id" element={<TodoDetail/>} />
                </Route>
              </Route>
            </Route>
            <Route path="/auth" element={<AuthPage />} >
              <Route index element={<Navigate to="login" replace />} />
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
