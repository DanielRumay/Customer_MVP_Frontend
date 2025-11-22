import Header from "@/app/components/HomePages/Header";
import Hero from "@/app/components/HomePages/Hero";
import Intro from "@/app/components/HomePages/Intro";
import Benefits from "@/app/components/HomePages/Benefits";
import Footer from "@/app/components/HomePages/Footer";

export default function Home() {
    return (
        <main>
            <Header />
            <Hero />
            <Intro />
            <Benefits />
            <Footer />
        </main>
    );
}

