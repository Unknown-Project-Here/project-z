import CTA from './Welcome/CTA';
import Features from './Welcome/Features';
import Footer from './Welcome/Footer';
import Hero from './Welcome/Hero';

export default function Welcome() {
    return (
        <div className="min-h-screen">
            <main>
                <Hero />
                <Features />
                <CTA />
            </main>
            <Footer />
        </div>
    );
}
