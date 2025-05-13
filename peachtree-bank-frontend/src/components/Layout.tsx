import { useAuth } from '../auth/AuthContext'
import { useNavigate } from 'react-router-dom'
import type { ReactNode } from 'react'

// COMPONENTS
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

export const Layout = ({ children }: { children: ReactNode }) => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Box padding={2}>
      <Box display="flex" justifyContent="flex-end" marginBottom={2}>
        <Button variant="outlined" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      {children}
    </Box>
  )
}
