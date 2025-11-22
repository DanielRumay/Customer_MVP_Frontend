import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Token no encontrado" },
                { status: 401 }
            );
        }

        const res = await fetch("http://localhost:8080/api/v1/post/all", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();

        if (!res.ok) {
            return NextResponse.json(
                { message: data.message || "Error al obtener posts" },
                { status: res.status }
            );
        }

        return NextResponse.json(data);

    } catch (err) {
        return NextResponse.json(
            { message: "Error interno", error: String(err) },
            { status: 500 }
        );
    }
}