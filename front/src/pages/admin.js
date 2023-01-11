import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Home from '../components/admin/home'
import Schem from '../components/admin/schem'
import Schmes from '../components/admin/schems'
import User from '../components/admin/user'
import UserAppliedSchem from '../components/admin/userAppliedSchem'
import Users from '../components/admin/users'

function Admin() {
    return (
        <>
            {/* nav bar */}
            <Link to="users">users</Link>
            <Link to="schems">schmes</Link>

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/users' element={<Users />} />
                <Route path='/user/:id' element={<User />} />
                <Route path='/schems' element={<Schmes />} />
                <Route path='/schem/:id' element={<Schem />} />
                <Route path='/:uid/:sid' element={<UserAppliedSchem />} />
            </Routes>
        </>
    )
}

export default Admin