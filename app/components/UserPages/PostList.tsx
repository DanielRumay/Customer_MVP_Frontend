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
        <div className="max-w-2xl mx-auto mt-10 space-y-6">
            {posts.map((post) => (
                <div
                    key={post.title}
                    className="rounded-xl shadow-md p-6 border border-gray-100"
                >
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                        <div>
                            <p className="font-semibold">{post.userName}</p>
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-bold mb-2">{post.title}</h2>
                    <Image
                        src={post.imagenUrl}
                        alt={post.title}
                        height={400}
                        width={650}
                    />
                    {/* Description */}
                    <p className="text-gray-700 leading-relaxed">
                        {post.content}
                    </p>

                </div>
            ))}
        </div>
    );
}