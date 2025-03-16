import { Button } from '@/Components/ui/button';

export default function Hero() {
    return (
        <section className="px-4 py-20 sm:px-6 lg:px-8">
            <div className="container mx-auto flex flex-col items-center gap-12 lg:flex-row">
                <div className="space-y-8 lg:w-1/2">
                    <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
                        Find Your Perfect <span>Coding Collaboration</span>
                    </h1>
                    <p className="text-xl">
                        Connect with developers, manage projects, and build
                        amazing software together. Your next big project starts
                        here.
                    </p>
                    <div className="flex space-x-4">
                        <Button size="lg">Get Started</Button>
                        <Button size="lg" variant="outline">
                            Learn More
                        </Button>
                    </div>
                </div>
                <div className="lg:w-1/2">
                    <img
                        src="https://media1.tenor.com/m/uBcbvnuP3K0AAAAd/lil-yachty-drake.gif"
                        alt="Collaboration Illustration"
                        width={600}
                        height={400}
                        className="rounded-lg shadow-xl"
                    />
                </div>
            </div>
        </section>
    );
}
