import { Button } from '@/Components/ui/button';
import { Link } from '@inertiajs/react';

export default function Header() {
    return (
        <header className="w-full bg-white px-4 py-4 shadow-sm dark:bg-gray-800 sm:px-6 lg:px-8">
            <div className="container mx-auto flex items-center justify-between">
                <Link
                    href="/"
                    className="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
                >
                    ProjectHub
                </Link>
                <nav className="hidden space-x-4 md:flex">
                    <Link
                        href="#features"
                        className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                    >
                        Features
                    </Link>
                    <Link
                        href="#"
                        className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                    >
                        Pricing
                    </Link>
                    <Link
                        href="#"
                        className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                    >
                        About
                    </Link>
                </nav>
                <div className="flex space-x-2">
                    <Link href={route('login')}>
                        <Button variant="outline">Log in</Button>
                    </Link>
                    <Link href={route('register')}>
                        <Button>Sign up</Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
