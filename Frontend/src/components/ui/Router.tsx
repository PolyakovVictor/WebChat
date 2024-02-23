import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from '../screens/Main/MainPage'

const Router = () => {
    return <BrowserRouter>
        <Routes>
            <Route element={<MainPage />} path='/' />

            <Route element={<div>Not found</div>} path='*'/>
        </Routes>
    </BrowserRouter>
}

export default Router