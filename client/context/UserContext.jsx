import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_API_URL;

axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [token, setToken] = useState(
        localStorage.getItem("token") || null
    );

    // CHECK AUTH
    const checkAuth = async () => {

        try {

            const { data } = await axios.get('/api/v1/user/home');

            if (data.success) {
                setUser(data.user);
            }

        } catch (error) {

            toast.error(error.response?.data?.message || error.message);
        }
    };

    // LOGIN
    const login = async (email, password) => {

        try {

            const { data } = await axios.post(
                '/api/v1/user/login',
                { email, password }
            );

            if (data.success) {

                setUser(data.user);

                setToken(data.token);

                axios.defaults.headers.common['Authorization'] =
                    `Bearer ${data.token}`;

                localStorage.setItem("token", data.token);

                toast.success(data.message);
            }

        } catch (error) {

            toast.error(error.response?.data?.message || error.message);
        }
    };

    // SIGNUP
    const signUp = async (name, email, password) => {

        try {

            const { data } = await axios.post(
                '/api/v1/user/register',
                { name, email, password }
            );

            if (data.success) {

                toast.success(data.message);
            }

        } catch (error) {

            toast.error(error.response?.data?.message || error.message);
        }
    };

    // LOGOUT
    const logout = () => {

        localStorage.removeItem("token");

        setUser(null);

        setToken(null);

        delete axios.defaults.headers.common['Authorization'];

        toast.success("Logged out successfully");
    };

    useEffect(() => {

        if (token) {

            axios.defaults.headers.common['Authorization'] =
                `Bearer ${token}`;

            checkAuth();
        }

    }, [token]);

    const value = {
        axios,
        user,
        token,
        login,
        signUp,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};