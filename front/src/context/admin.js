import { createContext, useReducer } from "react";

import React from 'react'

export const AdminContext = createContext();
function AdminProvider(props) {

    let [admin, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "SET_SCHEMS":
                return { ...state, schems: action.data };
            case "ADD_SCHEM":
                return { ...state, schems: [action.data, ...state.schems] };
            case "DLT_SCHEM":
                return { ...state, schems: state.schems.filter(schem => schem._id != action.data) };
            case "UPDATE_SCHEM":
                return {
                    ...state, schems: state.schems.map((schem) => {
                        if (schem._id == action.id)
                            return action.data
                        return schem
                    })
                }


            case "SET_USERS":
                return {
                    ...state, users: action.data
                }
            case "VERIFY_USER":
                return {
                    ...state, users: state.users.map((user) => {
                        if (user._id == action.id) {
                            return {
                                ...user,
                                isVerified: true
                            }
                        }
                        return user;
                    })
                }
            default:
                return state;
        }
    }, {
        schems: null,
        users: null
    })
    return (
        <AdminContext.Provider value={{ ...admin, dispatch }}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminProvider