import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '../auth/AuthContext'
import type { ReactNode } from 'react'

// COMPONENTS
import LoginPage from '../pages/LoginPage'
import { Dashboard } from '../pages/Dashboard'
import { TransactionPage } from '../pages/TransactionPage'

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/transactions/:id" element={<PrivateRoute><TransactionPage /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
