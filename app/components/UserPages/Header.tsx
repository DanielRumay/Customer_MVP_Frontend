import Link from "next/link";

export default function Header() {
    return (
        <header className="flex items-center justify-between px-8 py-4 bg-white shadow-md sticky top-0 z-50 border-b border-indigo-100">

            {/* Logo */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-sm">
                    T
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                    Tutorify
                </h2>
            </div>

            {/* Navigation */}
            <nav className="flex gap-8 text-gray-700 font-medium">
                <NavItem href="/dashboard">Home</NavItem>
                <NavItem href="/dashboard">Messages</NavItem>
                <NavItem href="/profile">Profile</NavItem>
            </nav>
            <div>
            </div>
        </header>
    );
}

function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="relative group transition"
        >
            <span className="group-hover:text-indigo-600">{children}</span>

            {/* Animated underline */}
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
        </Link>
    );
}