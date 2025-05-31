'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await login(username, password)
            router.push("/")
        } catch (error) {
            alert("Error no login")
            console.log("Error: ", error)
        }
    }

    // return (
    //     <form onSubmit={handleSubmit}>
    //       <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuário" />
    //       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
    //       <button  className="btn btn-primary"type="submit">Entrar</button>
    //     </form>
    //   );

    return (
        <div
          className="bg-no-repeat bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1951&q=80)",
          }}
        >
          <div className="absolute bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0"></div>
            <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
                <div className="flex-col flex self-center p-10 sm:max-w-5xl xl:max-w-2xl z-10">
                    <div className="self-start hidden lg:flex flex-col text-white">
                        {/* <img src="" alt="" className="mb-3" /> */}
                        <h1 className="mb-3 font-bold text-5xl">Bem-Vindo ao My Grana</h1>
                        <p className="pr-3">
                            Aqui você consegue controle total das suas finanças pessoais, de um jeito simples e visual.
                            Organize seus gastos, acompanhe entradas e planeje seu futuro financeiro com facilidade.

                        </p>
                    </div>
                </div>
                <div className="flex justify-center self-center z-10">
                    <div className="p-12 bg-white mx-auto rounded-2xl w-100">
                        <div className="mb-4">
                            <h3 className="font-semibold text-2xl text-gray-800">Login</h3>
                            <p className="text-gray-500">Por favor, faça seu login.</p>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 tracking-wide">
                                Nome de usuário
                                </label>
                                <input
                                    className="w-full text-gray-800 text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Usuário"
                                />

                            </div>
                            <div className="space-y-2">
                                <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                                Senha
                                </label>
                                <input
                                    className="w-full text-gray-800 content-center text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Senha"
                                />

                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember_me"
                                        name="remember_me"
                                        type="checkbox"
                                        className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-800">
                                        Lembre-me
                                    </label>
                                </div>
                                <div className="text-sm">
                                    <a href="#" className="text-green-400 hover:text-green-500">
                                        Esqueceu sua senha?
                                    </a>
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center bg-green-400 hover:bg-green-500 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
                                >
                                    Entrar
                                </button>
                            </div>
                        </form>
                        <div className="pt-5 text-center text-gray-400 text-xs">
                        <span>
                            Copyright © 2025{" "}
                            <a
                            href="https://codepen.io/uidesignhub"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green hover:text-green-500"
                            >
                            Habby
                            </a>
                        </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
      
}