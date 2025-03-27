import { Head } from '@inertiajs/react';
import { Header } from './Common/Header';
import { FeaturesSection } from './Section/FeaturesSection';
import { Footer } from './Section/Footer';
import { HeroSection } from './Section/HeroSection';
import { HowItWorksSection } from './Section/HowItWorksSection';
import { TestimonialsSection } from './Section/TestimonialsSection';
import { WaitlistSection } from './Section/WaitlistSection';

export default function Landing() {
    return (
        <>
            <Head title="Project Hub - Project collaboration, simplified" />
            <main className="min-h-screen bg-zinc-900 text-zinc-100">
                <Header />
                <HeroSection />
                <FeaturesSection />
                <HowItWorksSection />
                <TestimonialsSection />
                <WaitlistSection />
                <Footer />
            </main>
        </>
    );
}
