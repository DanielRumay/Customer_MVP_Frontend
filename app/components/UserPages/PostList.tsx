"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Post = {
    userName: string;
    title: string;
    content: string;
    imagenUrl: string;
};

export default function PostList() {
    const [posts, setPosts] = useState<Post[]>([]);

    const fetchPosts = async () => {
        try {
            const res = await fetch("/api/post/list");
            const data = await res.json();
            setPosts(data);
        } catch (err) {
            console.error("Error:", err);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="max-w-2xl mx-auto mt-10 space-y-8 px-4">

            {/* Mostrar mensaje si no hay posts */}
            {posts.length === 0 && (
                <p className="text-center text-gray-500">
                    No hay posts aún. ¡Crea uno nuevo!
                </p>
            )}

            {posts.map((post) => (
                <div
                    key={post.title}
                    className="rounded-2xl shadow-md p-6 border border-indigo-100
                               bg-white hover:shadow-xl transition-all duration-300"
                >
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-5">
                        {/* Avatar con inicial */}
                        <div className="w-12 h-12 bg-indigo-600 text-white flex items-center justify-center
                                        rounded-full text-lg font-bold shadow-sm">
                            {post.userName.charAt(0).toUpperCase()}
                        </div>

                        <div>
                            <p className="font-semibold text-gray-800">{post.userName}</p>
                            <p className="text-sm text-gray-500">Publicado recientemente</p>
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold mb-3 text-indigo-700">
                        {post.title}
                    </h2>

                    {/* Imagen si existe */}
                    {post.imagenUrl && (
                        <div className="overflow-hidden rounded-xl mb-4 shadow-sm">
                            <Image
                                src={post.imagenUrl}
                                alt={post.title}
                                height={400}
                                width={650}
                                className="rounded-xl object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    )}

                    {/* Description */}
                    <p className="text-gray-700 leading-relaxed">
                        {post.content}
                    </p>

                    {/* Divider */}
                    <div className="border-t mt-5 pt-4 border-indigo-100" />

                    {/* Footer */}
                    <div className="flex justify-end">
                        <button className="text-indigo-600 font-medium hover:underline">
                            Contactar →
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}