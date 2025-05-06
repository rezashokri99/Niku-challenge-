import "@/styles/App.css";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ClientPage from "@/pages/ClientPage.tsx";
import WebappPage from "@/pages/WebappPage.tsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/client" element={<ClientPage />} />
                <Route path="/webapp" element={<WebappPage />} />
                <Route path="*" element={<Navigate to="/client" replace />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
