import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const res = await fetch("http://localhost:8080/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();

        if (!res.ok) {
            return NextResponse.json(
                { message: data.message || "Error en el inicio de sesion" },
                { status: res.status }
            );
        }

        const response = NextResponse.json({ message: "Login exitoso" }, { status: 200 });
        response.cookies.set("token", data.token, {
            httpOnly: true,
            secure: false,
            path: "/",
            maxAge: 60 * 60 * 24,
        });
        return response;

    } catch (err) {
        return NextResponse.json({ message: err }, { status: 500 });
    }
}