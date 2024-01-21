import { Routes, Route } from 'react-router-dom'

import { SignIn } from '../pages/SignIn'
import { SignInUp } from '../pages/SignInUp'

export function AuthRoutes() {

    return (
        <Routes>
           <Route path="/" element={<SignIn/>}/>
           <Route path="/Register" element={<SignInUp/>}/>
        </Routes>
    )
}
