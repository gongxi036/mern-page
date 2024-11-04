import { Box, useColorModeValue } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import HomePage from './pages/HomePage.jsx'
import CreatePage from './pages/CreatePage.jsx'

function App() {
  return (
    <Box minH={'100vh'} bg={ useColorModeValue('gray.100', 'gray.900') }>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='create' element={<CreatePage />} />
      </Routes>
    </Box>
  )
}

export default App
