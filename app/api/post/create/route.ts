import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Token no encontrado" },
                { status: 401 }
            );
        }

        const body = await req.json();

        const backendRes = await fetch(`${apiUrl}/api/v1/post/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });

        const data = await backendRes.json();
        return NextResponse.json(data, { status: backendRes.status });
    } catch (error) {
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}