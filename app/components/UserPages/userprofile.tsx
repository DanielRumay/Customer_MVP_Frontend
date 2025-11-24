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

    if (!user)
        return (
            <p className="text-center mt-10 text-gray-500 animate-pulse">
                Cargando perfil...
            </p>
        );

    return (
        <div className="max-w-xl mx-auto mt-12 px-4">
            <div className="rounded-2xl shadow-md p-8 border border-indigo-100 bg-white">

                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow">
                        {user.name?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                        <p className="text-indigo-600 font-medium">@{user.username}</p>
                    </div>
                </div>

                {/* Divider */}
                <hr className="border-indigo-100 my-4" />

                {/* Info Section */}
                <div className="space-y-3">
                    <p className="text-gray-700">
                        <span className="font-semibold text-gray-900">Email:</span>{" "}
                        {user.email}
                    </p>
                </div>
            </div>
        </div>
    );
}
