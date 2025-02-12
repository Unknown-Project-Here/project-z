import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { router, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props;

    const projects = [
        {
            id: 1,
            name: 'Project Alpha',
            description: 'A revolutionary AI-powered code generator',
        },
        {
            id: 2,
            name: 'Beta Framework',
            description: 'Lightweight and fast web framework',
        },
        {
            id: 3,
            name: 'Gamma Analytics',
            description: 'Real-time data analytics platform',
        },
    ];

    const stats = {
        projectsCompleted: 15,
        linesOfCode: 50000,
        contributions: 230,
    };

    const isOnboardingComplete = auth.user.onboarded;

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">
                        Welcome, {auth.user.username}!
                    </h1>
                    <Button
                        onClick={() =>
                            router.visit(route('profile.onboarding'))
                        }
                        variant="outline"
                    >
                        {isOnboardingComplete
                            ? 'Edit Profile'
                            : 'Complete Profile'}
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>
                                Your personal details and stats
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4 flex items-center space-x-4">
                                <Avatar className="h-20 w-20 bg-primary">
                                    <AvatarImage
                                        src={`https://api.dicebear.com/9.x/open-peeps/svg?seed=${auth.user.username}`}
                                        alt={auth.user.username}
                                    />
                                    <AvatarFallback>
                                        {auth.user.username.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h2 className="text-2xl font-semibold">
                                        {auth.user.username}
                                    </h2>
                                    <p>{auth.user.email}</p>
                                    <p className="text-sm">
                                        Joined on{' '}
                                        {new Date().toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6 grid grid-cols-3 gap-4">
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold">
                                        {stats.projectsCompleted}
                                    </h3>
                                    <p className="text-sm">
                                        Projects Completed
                                    </p>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold">
                                        {stats.linesOfCode.toLocaleString()}
                                    </h3>
                                    <p className="text-sm">Lines of Code</p>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold">
                                        {stats.contributions}
                                    </h3>
                                    <p className="text-sm">Contributions</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Skills</CardTitle>
                            <CardDescription>
                                Your top programming skills
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                <Badge>JavaScript</Badge>
                                <Badge>React</Badge>
                                <Badge>Node.js</Badge>
                                <Badge>Python</Badge>
                                <Badge>Git</Badge>
                                <Badge>SQL</Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Your Projects</CardTitle>
                        <CardDescription>
                            Recent coding projects you've worked on
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {projects.map((project) => (
                                <Card key={project.id}>
                                    <CardHeader>
                                        <CardTitle>{project.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm">
                                            {project.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
