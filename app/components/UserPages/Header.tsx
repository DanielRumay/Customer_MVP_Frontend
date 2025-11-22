import Link from "next/link";

export default function Header() {
    return (
        <header className="flex items-center justify-between px-8 py-5 bg-white shadow-sm sticky top-0 z-50">
            <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-gray-800">Tutorify</h2>
            </div>

            <nav className="flex gap-6 text-gray-700">
                <Link href="/dashboard" className="hover:text-indigo-600 transition">
                    Home
                </Link>
                <Link href="/messages" className="hover:text-indigo-600 transition">
                    Messages
                </Link>
                <Link href="/profile" className="hover:text-indigo-600 transition">
                    Profile
                </Link>
            </nav>
        </header>
    );
}