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
import { IndexProject } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
export default function Dashboard() {
    const { auth } = usePage().props;

    const formattedJoinDate = new Date(
        auth.user.created_at,
    ).toLocaleDateString();

    const isOnboardingComplete = auth.user.onboarded;

    const skills: string[] = [];

    const projects: IndexProject[] = [];

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
                                        Joined on {formattedJoinDate}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6 grid grid-cols-3 gap-4">
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold">0</h3>
                                    <p className="text-sm">
                                        Projects Completed
                                    </p>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold">0</h3>
                                    <p className="text-sm">Lines of Code</p>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold">0</h3>
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
                                {skills.length > 0 ? (
                                    skills.map((skill) => (
                                        <Badge key={skill}>{skill}</Badge>
                                    ))
                                ) : (
                                    <div className="flex w-full flex-col items-center justify-center space-y-4 rounded-lg border border-dashed border-gray-300 bg-gray-50/50 px-6 py-8 text-center">
                                        <div className="space-y-2">
                                            <h3 className="font-medium text-gray-900">
                                                No skills added
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                Complete your profile to add
                                                your programming skills and
                                                expertise.
                                            </p>
                                        </div>
                                    </div>
                                )}
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
                            {projects?.length > 0 ? (
                                projects.map((project) => (
                                    <Card key={project.id}>
                                        <CardHeader>
                                            <CardTitle>
                                                {project.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm">
                                                {project.description}
                                            </p>
                                            {project.skill_level && (
                                                <Badge
                                                    className="mt-2"
                                                    variant={
                                                        project.skill_level ===
                                                        'beginner'
                                                            ? 'success'
                                                            : 'secondary'
                                                    }
                                                >
                                                    {project.skill_level}
                                                </Badge>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <div className="col-span-full flex flex-col items-center justify-center space-y-4 rounded-lg border border-dashed border-gray-300 bg-gray-50/50 px-6 py-8 text-center">
                                    <div className="space-y-2">
                                        <h3 className="font-medium text-gray-900">
                                            No projects found
                                        </h3>
                                        <p className="pb-2 text-sm text-gray-500">
                                            Start creating your first project to
                                            showcase your work.
                                        </p>
                                        <Button
                                            asChild
                                            variant="default"
                                            className="w-fit"
                                        >
                                            <Link
                                                href={route('projects.create')}
                                            >
                                                Create Project
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
