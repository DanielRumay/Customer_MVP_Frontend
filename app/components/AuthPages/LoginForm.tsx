"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();

    const [form, setForm] = useState({
        user: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Credenciales incorrectas.");
            }

            router.push("/dashboard");

        } catch (err: any) {
            setErrorMsg(err.message || "Error de conexión.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border border-gray-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Iniciar Sesión
                </h2>

                {errorMsg && (
                    <p className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                        {errorMsg}
                    </p>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    {/* Usuario */}
                    <div>
                        <label className="block text-gray-700 mb-1">Usuario</label>
                        <input
                            type="text"
                            name="user"
                            required
                            value={form.user}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="Tu usuario"
                        />
                    </div>

                    {/* Contraseña */}
                    <div>
                        <label className="block text-gray-700 mb-1">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            required
                            value={form.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="******"
                        />
                    </div>

                    {/* Botón */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition font-semibold"
                    >
                        {loading ? "Ingresando..." : "Iniciar Sesión"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-5">
                    ¿No tienes cuenta?{" "}
                    <a href="/register" className="text-indigo-600 hover:underline font-medium">
                        Regístrate
                    </a>
                </p>
            </div>
        </section>
    );
}
