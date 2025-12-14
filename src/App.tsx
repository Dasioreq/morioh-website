import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Game from "./pages/Game.tsx"
import PathError from './pages/404.tsx';

export default function App() {
    return <>
        <BrowserRouter>
            <Routes>
                <Route path = "/" element = { <Navigate to = "/game"/> }/>
                <Route path = "/game" element = { <Game/> }/>
                <Route path = "*" element = { <PathError/> }/>
            </Routes>
        </BrowserRouter>
    </>
}
