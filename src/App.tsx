import './App.css'
import AppRouter from './components/appRouter/appRouter'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
    return (
        <Router>
            <div className="App">
                <AppRouter />
            </div>
        </Router>
    )
}

export default App
