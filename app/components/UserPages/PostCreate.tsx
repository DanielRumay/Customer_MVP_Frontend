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
        <div className="max-w-xl mx-auto bg-white p-6 mt-10 rounded-xl shadow border">
            <h2 className="text-2xl font-semibold mb-6">Crear nuevo post</h2>

            {message && (
                <p className="mb-4 text-center text-blue-600 font-medium">
                    {message}
                </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

                {/* TÍTULO */}
                <div>
                    <label className="font-medium block mb-1">Título</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border p-3 rounded-lg"
                        placeholder="Ej: Busco profesor de Calculo II"
                        required
                    />
                </div>

                {/* CATEGORÍA */}
                <div>
                    <label className="font-medium block mb-1">Categoría</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border p-3 rounded-lg"
                        placeholder="Ej: Matemáticas"
                    />
                </div>

                {/* DESCRIPCIÓN */}
                <div>
                    <label className="font-medium block mb-1">Descripción</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border p-3 rounded-lg min-h-[120px]"
                        placeholder="Describe qué tipo de profesor o clase necesitas..."
                        required
                    />
                </div>

                {/* SUBIR IMAGEN */}
                <div>
                    <label className="font-medium block mb-1">Imagen (opcional)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                        className="w-full border p-3 rounded-lg"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50" >
                    {loading ? "Creando..." : "Crear post"}
                </button>
            </form>
        </div>
    );
}