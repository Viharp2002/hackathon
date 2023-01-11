import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { allUsers } from '../../config/api';
import { AdminContext } from '../../context/admin';
import { AuthContext } from '../../context/auth';

function Users() {
// searching functionality

    const Navigate = useNavigate();

    let { token } = useContext(AuthContext);
    let { users, dispatch } = useContext(AdminContext);

    let navigate = async (id) => {
        Navigate("/admin/user/" + id);
    }

    useEffect(() => {

        let fetchUsers = async () => {
            let res = await fetch(allUsers,
                {
                    headers: {
                        "authorization": token
                    }
                });

            let data = await res.json();
            if (data.success) {
                dispatch({ type: "SET_USERS", data: data.msg })
            }
        }
        if (!users) {
            fetchUsers();
        }
    }, [])
    return (
        <div>
            {
                users && users.map((user) => {
                    return (
                        <div key={user._id} onClick={() => navigate(user._id)}>
                            <span>{user.name} </span>
                            <span>{user.mail}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Users