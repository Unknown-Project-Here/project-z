import CTA from './Welcome/CTA';
import Features from './Welcome/Features';
import Footer from './Welcome/Footer';
import Header from './Welcome/Header';
import Hero from './Welcome/Hero';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header />
            <main>
                <Hero />
                <Features />
                <CTA />
            </main>
            <Footer />
        </div>
    );
}
