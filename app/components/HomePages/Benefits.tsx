export default function Benefits() {
    const items = [
        {
            icon: "groups",
            title: "Tutoría Personalizada",
            text: "Atención individual adaptada a tus necesidades reales.",
        },
        {
            icon: "auto_stories",
            title: "Mejora de Habilidades",
            text: "Técnicas avanzadas para estudiar mejor y más rápido.",
        },
        {
            icon: "trending_up",
            title: "Confianza y Resultados",
            text: "Incrementa tu seguridad y observa mejoras auténticas.",
        },
    ];

    return (
        <section className="bg-white py-20 px-8 text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Beneficios Clave</h3>
            <p className="max-w-xl mx-auto text-gray-600 mb-12">
                Nuestra metodología se centra en tres pilares fundamentales para garantizar tu éxito.
            </p>

            <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                {items.map((b) => (
                    <div
                        key={b.title}
                        className="p-8 bg-gray-100 rounded-xl shadow hover:shadow-lg transition"
                    >
            <span className="material-symbols-outlined text-5xl text-indigo-600 mb-4">
              {b.icon}
            </span>
                        <h4 className="text-xl font-semibold mb-2">{b.title}</h4>
                        <p className="text-gray-600">{b.text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}