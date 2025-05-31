'use client'

import React, { createContext, useContext, useState } from "react";
import useSWR from "swr";
import { fetchWithToken } from "@/api/api";
import { UserLoginType } from "@/types/user";
import { uri } from "@/api/uri";

interface AuthContextType {
    user: UserLoginType;
    isAuthenticated: boolean;
    token: string;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    mutateUser: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode}) {
    const { data: user, error, mutate } = useSWR('/users/whoami/', fetchWithToken);
    const [token, setToken] = useState('');

    const login = async (username: string, password: string) => {
        const res = await fetch(`${uri}/login/`, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({username, password})
        });

        if (!res.ok) throw new Error('Login Falhou');


        const { access, refresh } = await res.json();
        localStorage.setItem("accessToken", access)
        localStorage.setItem("refreshToken", refresh)
        mutate();

        setToken(localStorage.getItem("accessToken") || '')
    }

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        mutate(null)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!user && !error,
                login,
                logout,
                mutateUser: () => mutate()
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)