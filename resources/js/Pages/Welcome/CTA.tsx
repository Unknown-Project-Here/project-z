import { Button } from '@/Components/ui/button';

export default function CTA() {
    return (
        <section className="px-4 py-20 sm:px-6 lg:px-8">
            <div className="container mx-auto text-center">
                <h2 className="mb-4 text-3xl font-bold">
                    Ready to Start Your Next Project?
                </h2>
                <p className="mb-8 text-xl">
                    Join our community of developers and bring your ideas to
                    life.
                </p>
                <Button size="lg" variant="secondary">
                    Sign Up Now
                </Button>
            </div>
        </section>
    );
}
