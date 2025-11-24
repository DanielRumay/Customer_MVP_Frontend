import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
        const body = await req.json();

        const res = await fetch(`${apiUrl}/api/v1/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();

        if (!res.ok) {
            return NextResponse.json(
                { message: data.message || "Error en el registro" },
                { status: res.status }
            );
        }

        return NextResponse.json(data, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: err }, { status: 500 });
    }
}