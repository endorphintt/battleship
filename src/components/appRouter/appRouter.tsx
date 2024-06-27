import { Routes, Route, Navigate } from 'react-router-dom'
import { MENU_ROUTE, routes } from './routes'
import c from './appRouter.module.scss'

const AppRouter = () => {
    return (
        <div className={c.router}>
            <Routes>
                {routes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                ))}
                <Route path="*" element={<Navigate to={'/' + MENU_ROUTE} />} />
            </Routes>
        </div>
    )
}

export default AppRouter
