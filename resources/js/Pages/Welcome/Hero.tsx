import { Button } from '@/Components/ui/button';

export default function Hero() {
    return (
        <section className="bg-gradient-to-b from-white to-gray-100 px-4 py-20 dark:from-gray-800 dark:to-gray-900 sm:px-6 lg:px-8">
            <div className="container mx-auto flex flex-col items-center gap-12 lg:flex-row">
                <div className="space-y-8 lg:w-1/2">
                    <h1 className="text-4xl font-extrabold leading-tight text-gray-900 dark:text-white sm:text-5xl">
                        Find Your Perfect{' '}
                        <span className="text-indigo-600 dark:text-indigo-400">
                            Coding Collaboration
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
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
                        src="/placeholder.svg?height=400&width=600"
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
