import Link from "next/link";

export default function Header() {
    return (
        <header className="flex items-center justify-between px-8 py-5 bg-white shadow-sm sticky top-0 z-50">
            <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-gray-800">Tutorify</h2>
            </div>

            <nav className="flex gap-6 text-gray-700">
                <Link href="/login" className="hover:text-indigo-600 transition">
                    Inicio de Sesión
                </Link>
                <Link href="/register" className="hover:text-indigo-600 transition">
                    Registro
                </Link>
            </nav>
        </header>
    );
}