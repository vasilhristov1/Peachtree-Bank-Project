import React from "react"

// COMPONENTS
import Typography from "@mui/material/Typography"

// STYLING
import './styling/Header.css'

interface HeaderProps {
  icon: React.ElementType
  text: string
}

const Header: React.FC<HeaderProps> = ({ icon: MuiIcon, text }) => {
  return (
    <div className="header">
      <MuiIcon />
      <Typography variant="h6" mb={2}>{text}</Typography>
    </div>
  )
}

export default Header
