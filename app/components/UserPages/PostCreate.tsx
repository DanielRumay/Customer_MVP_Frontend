"use client";

import { useState } from "react";
import { uploadImage } from "@/lib/uploadImage";

export default function CreateForm() {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        let imageUrl = "";

        try {
            // SUBIR IMAGEN A SUPABASE
            if (imageFile) {
                imageUrl = await uploadImage(imageFile);
            }

            // ENVIAR AL BACKEND (USA TU ROUTE: /api/post/create)
            const res = await fetch("/api/post/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    category,
                    content: description,
                    imagenUrl: imageUrl,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setMessage(data.message || "Error al crear el post");
                setLoading(false);
                return;
            }

            // Reset form
            setTitle("");
            setCategory("");
            setDescription("");
            setImageFile(null);
            setMessage("Post creado correctamente 🎉");

        } catch (error) {
            console.error(error);
            setMessage("Error inesperado al crear post.");
        }

        setLoading(false);
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-8 mt-12 rounded-2xl shadow-xl border border-indigo-100">

            {/* TÍTULO PRINCIPAL */}
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
                Crear nuevo post
            </h2>

            {/* MENSAJE */}
            {message && (
                <p className="mb-6 text-center text-indigo-600 font-semibold bg-indigo-50 p-3 rounded-lg">
                    {message}
                </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* TÍTULO */}
                <div>
                    <label className="font-semibold text-gray-800 block mb-2">Título</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-indigo-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        placeholder="Ej: Busco profesor de Cálculo II"
                        required
                    />
                </div>

                {/* CATEGORÍA */}
                <div>
                    <label className="font-semibold text-gray-800 block mb-2">Categoría</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border border-indigo-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        placeholder="Ej: Matemáticas"
                    />
                </div>

                {/* DESCRIPCIÓN */}
                <div>
                    <label className="font-semibold text-gray-800 block mb-2">Descripción</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border border-indigo-300 p-3 rounded-lg min-h-[130px]
                    focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        placeholder="Describe qué tipo de profesor o clase necesitas..."
                        required
                    />
                </div>

                {/* SUBIR IMAGEN */}
                <div>
                    <label className="font-semibold text-gray-800 block mb-2">Imagen (opcional)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                        className="w-full border border-indigo-300 p-3 rounded-lg
                    bg-indigo-50 file:bg-indigo-600 file:text-white file:border-none
                    file:px-4 file:py-2 file:rounded-lg file:mr-4 hover:file:bg-indigo-700"
                    />
                </div>

                {/* BOTÓN */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white p-3 rounded-xl font-semibold
                hover:bg-indigo-700 transition disabled:bg-indigo-300 disabled:cursor-not-allowed"
                >
                    {loading ? "Creando..." : "Crear post"}
                </button>
            </form>
        </div>
    );
}