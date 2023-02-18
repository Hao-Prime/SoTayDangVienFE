import React, { createContext, useEffect, useReducer } from 'react'
// import jwtDecode from 'jwt-decode'
import axios from "axios";
import { MatxLoading } from 'app/components'
import Services from 'app/services'

const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null,
}

// const isValidToken = (access_token) => {
//     if (!access_token) {
//         return false
//     }

//     const decodedToken = jwtDecode(access_token)
//     const currentTime = Date.now() / 1000
//     return decodedToken.exp > currentTime
// }

const setSession = (access_token) => {
    if (access_token) {
        localStorage.setItem('access_token', access_token)
        axios.defaults.headers.common.Authorization = `Bearer ${access_token}`
    } else {
        localStorage.removeItem('access_token')
        delete axios.defaults.headers.common.Authorization
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated, user } = action.payload

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user,
            }
        }
        case 'LOGIN': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        }
        case 'REGISTER': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => { },
    logout: () => { },
    register: () => Promise.resolve(),
})

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const login = (access_token, user) => {

        setSession(access_token)
        dispatch({
            type: 'LOGIN',
            payload: {
                user: user,
            },
        })
    }

    const register = async (email, username, password) => {
        const response = await axios.post('/api/auth/register', {
            email,
            username,
            password,
        })

        const { access_token, user } = response.data

        setSession(access_token)

        dispatch({
            type: 'REGISTER',
            payload: {
                user,
            },
        })
    }

    const logout = () => {
        setSession(null)
        dispatch({ type: 'LOGOUT' })
    }

    useEffect(() => {
        ; (async () => {
            try {
                const access_token = window.localStorage.getItem('access_token')

                if (access_token) {
                    setSession(access_token)
                    const response = await Services.getTaiKhoanService().getBanThan()
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: true,
                            user: response.data,
                        },
                    })
                } else {
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    })
                }
            } catch (err) {
                // console.error(err)
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                })
            }
        })()
    }, [])

    if (!state.isInitialised) {
        return <MatxLoading />
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
