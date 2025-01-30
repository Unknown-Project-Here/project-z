import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="bg-gray-100 px-4 py-8 dark:bg-gray-800 sm:px-6 lg:px-8">
            <div className="container mx-auto flex flex-col items-center justify-between md:flex-row">
                <div className="mb-4 text-gray-600 dark:text-gray-300 md:mb-0">
                    © 2023 ProjectHub. All rights reserved.
                </div>
                <nav className="flex space-x-4">
                    <Link
                        href="#"
                        className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                    >
                        Terms
                    </Link>
                    <Link
                        href="#"
                        className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                    >
                        Privacy
                    </Link>
                    <Link
                        href="#"
                        className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                    >
                        Contact
                    </Link>
                </nav>
            </div>
        </footer>
    );
}
