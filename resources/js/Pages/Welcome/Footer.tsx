import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="container mx-auto flex flex-col items-center justify-between md:flex-row">
                <div className="mb-4 md:mb-0">
                    © 2023 ProjectHub. All rights reserved.
                </div>
                <nav className="flex space-x-4">
                    <Link href="#">Terms</Link>
                    <Link href="#">Privacy</Link>
                    <Link href="#">Contact</Link>
                </nav>
            </div>
        </footer>
    );
}
