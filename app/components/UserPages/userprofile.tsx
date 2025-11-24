"use client";

import { useEffect, useState } from "react";

export default function UserProfile() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        async function loadUser() {
            const res = await fetch("/api/user/profile");
            const data = await res.json();
            setUser(data);
        }
        loadUser();
    }, []);

    if (!user) return <p className="text-center mt-10">Cargando...</p>;

    return (
        <div className="max-w-xl mx-auto mt-10 space-y-6">
            <div className="rounded-xl shadow-md p-6 border border-gray-100">
                <p className="font-semibold">{user.name}</p>
                <p className="text-gray-500">@{user.username}</p>
                <p className="text-gray-700">Email: {user.email}</p>
            </div>
        </div>
    );
}
