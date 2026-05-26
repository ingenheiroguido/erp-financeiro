import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import MainLayout from "./Layout/MainLayout"

import Login from "./pages/Login"

import Financeiro from "./pages/Financeiro"

import Estoque from "./pages/Estoque"
import Settings from "./pages/settings"

import DashboardCards from "./components/DashboardCards"

import ProtectedRoute from "./auth/ProtectedRoute"

// import FloatingSettings from "./components/FloatingSettings"

export default function App() {

  return (

    <BrowserRouter>

      {/* BOTÃO FLUTUANTE */}
      {/* <FloatingSettings /> */}

      <Routes>

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* DASHBOARD */}
        <Route
          path="/"
          element={
            <ProtectedRoute>

              <MainLayout>

                <DashboardCards />

              </MainLayout>

            </ProtectedRoute>
          }
        />

        {/* FINANCEIRO */}
        <Route
          path="/financeiro"
          element={
            <ProtectedRoute>

              <MainLayout>

                <Financeiro />

              </MainLayout>

            </ProtectedRoute>
          }
        />

        {/* ESTOQUE */}
        <Route
          path="/estoque"
          element={
            <ProtectedRoute>

              <MainLayout>

                <Estoque />

              </MainLayout>

            </ProtectedRoute>
          }
        />

        {/* CONFIGURAÇÕES */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute>

              <MainLayout>

                <Settings />

              </MainLayout>

            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  )
}