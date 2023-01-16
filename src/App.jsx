import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
import HomePage from "pages/homePage"
// import LoginPage from "pages/loginPage"
// import profilePage from "pages/profilePage"

const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/login" element={<LoginPage />} /> */}
          {/* <Route path="/profile/:userId" element={< profilePage />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
