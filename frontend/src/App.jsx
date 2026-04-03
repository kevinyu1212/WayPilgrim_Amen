import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Bible from "./pages/Bible";
import Prayer from "./pages/Prayer";
import PrayerWrite from "./pages/PrayerWrite";
import PrayerDetail from "./pages/PrayerDetail"; // 👈 추가됨

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/bible" element={<Bible />} />
          <Route path="/prayer" element={<Prayer />} />
          <Route path="/prayer/write" element={<PrayerWrite />} />
          <Route path="/prayer/:id" element={<PrayerDetail />} /> {/* 👈 상세 페이지 경로 추가 */}
        </Routes>
      </MainLayout>
    </Router>
  );
}
export default App;