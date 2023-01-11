import { createContext, useReducer } from "react";

export const AuthContext = createContext();

function AuthProvider(props) {

    const [auth, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "SET_AUTH":
                return { ...state, token: action.data }
            case "DLT_AUTH":
                return { token: null, user: null }
            case "SET_USER":
                return { ...state, user: action.data }
            default: return state
        }
    }, {
        token: null,
        user: null
    });
    return (
        <AuthContext.Provider value={{ ...auth, dispatch: dispatch }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider