export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
            <div className="text-center">
                <p>© 2024 Tutorify. Todos los derechos reservados.</p>
                <div className="flex justify-center gap-6 mt-4">
                    <a href="#" className="hover:text-white transition">Política de Privacidad</a>
                    <a href="#" className="hover:text-white transition">Términos de Servicio</a>
                </div>
            </div>
        </footer>
    );
}