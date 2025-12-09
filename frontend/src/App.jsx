import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TasksPage from "./components/TasksPage.jsx";
import TaskPage from "./components/TaskPage.jsx";
import WellcomePage from "./components/WellcomePage.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

function App() {
    
    return (
        <BrowserRouter>
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<WellcomePage/>}/>
                        <Route path="/tasks" element={<TasksPage/>}/>
                        <Route path="/task/:id" element={<TaskPage/>}/>
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    )
}


export default App
