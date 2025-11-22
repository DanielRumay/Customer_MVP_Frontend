"use client"

import React, { useState } from "react";
import {useRouter} from "next/navigation";

export default function RegisterForm(){
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");
        setSuccessMsg("");

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Error en el registro.");
            }

            setSuccessMsg("Registro exitoso");
            router.push("/login")
        } catch (err: any) {
            setErrorMsg(err.message || "Error desconocido.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border border-gray-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Crear Cuenta
                </h2>

                {errorMsg && (
                    <p className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                        {errorMsg}
                    </p>
                )}
                {successMsg && (
                    <p className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-sm">
                        {successMsg}
                    </p>
                )}

                <form onSubmit={handleRegister} className="space-y-5">

                    <div>
                        <label className="block text-gray-700 mb-1">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={form.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="Tu nombre"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Usuario</label>
                        <input
                            type="text"
                            name="username"
                            required
                            value={form.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="Nombre de usuario"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Correo</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="ejemplo@gmail.com"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            required
                            minLength={6}
                            value={form.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="******"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition font-semibold"
                    >
                        {loading ? "Registrando..." : "Registrarse"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-5">
                    ¿Ya tienes cuenta?{" "}
                    <a
                        href="/main/login"
                        className="text-indigo-600 hover:underline font-medium"
                    >
                        Inicia sesión
                    </a>
                </p>
            </div>
        </div>
    );
}