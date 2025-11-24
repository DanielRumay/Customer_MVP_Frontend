import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";


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

        // Decodificar JWT
        let decoded: any;
        try {
            decoded = jwtDecode(token);
        } catch (err) {
            return NextResponse.json(
                { message: "Token inválido" },
                { status: 400 }
            );
        }

        const userId = decoded?.id;
        console.log("🔹 ID obtenido del token:", userId);

        if (!userId) {
            return NextResponse.json(
                { message: "El token no contiene ID" },
                { status: 400 }
            );
        }

        const url = `http://localhost:8080/api/v1/user/getuser/${userId}`;

        const backendRes = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await backendRes.json();

        return NextResponse.json(data, { status: backendRes.status });

    } catch (error) {

        return NextResponse.json(
            { error: "Internal error", detail: String(error) },
            { status: 500 }
        );
    }
}
