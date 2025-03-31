import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { IndexProject } from '@/types';
import { Link } from '@inertiajs/react';
import { CompleteOnboardingAlert } from './Partials/CompleteOnboardingAlert';

interface ProfileUser {
    username: string;
    created_at: string;
    avatar: string | null;
    onboarded: boolean;
}

interface ProfileProps {
    profileUser: ProfileUser;
    projects: IndexProject[];
    skills: string[];
    isOwnProfile: boolean;
}

export default function Profile({
    profileUser,
    projects,
    skills,
    isOwnProfile,
}: ProfileProps) {
    const formattedJoinDate = new Date(
        profileUser.created_at,
    ).toLocaleDateString();

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">
                        {isOwnProfile
                            ? 'Your Profile'
                            : `${profileUser.username}'s Profile`}
                    </h1>
                    {isOwnProfile && (
                        <Button asChild variant="outline">
                            <Link href={route('settings.edit')}>
                                Edit Profile
                            </Link>
                        </Button>
                    )}
                </div>

                {!profileUser.onboarded && <CompleteOnboardingAlert />}

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>
                                User details and stats
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4 flex items-center space-x-4">
                                <Avatar className="h-20 w-20 bg-primary">
                                    <AvatarImage
                                        src={
                                            profileUser.avatar ||
                                            `https://api.dicebear.com/9.x/open-peeps/svg?seed=${profileUser.username}`
                                        }
                                        alt={profileUser.username}
                                    />
                                    <AvatarFallback>
                                        {profileUser.username.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h2 className="text-2xl font-semibold">
                                        {profileUser.username}
                                    </h2>
                                    <p className="text-sm">
                                        Joined on {formattedJoinDate}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6 grid grid-cols-3 gap-4">
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold">
                                        {projects.length}
                                    </h3>
                                    <p className="text-sm">Projects</p>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold">
                                        {skills.length}
                                    </h3>
                                    <p className="text-sm">Skills</p>
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
                                Programming skills
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
                                                {isOwnProfile
                                                    ? "You haven't added any programming skills yet."
                                                    : "This user hasn't added any programming skills yet."}
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
                        <CardTitle>
                            {isOwnProfile
                                ? 'Your Projects'
                                : `${profileUser.username}'s Projects`}
                        </CardTitle>
                        <CardDescription>
                            {isOwnProfile
                                ? 'All your coding projects'
                                : 'Coding projects shared by this user'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {projects.length > 0 ? (
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
                                            <div className="mt-4">
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <Link
                                                        href={route(
                                                            'projects.show',
                                                            project.id,
                                                        )}
                                                    >
                                                        View Project
                                                    </Link>
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <div className="col-span-full flex flex-col items-center justify-center space-y-4 rounded-lg border border-dashed border-gray-300 bg-gray-50/50 px-6 py-8 text-center">
                                    <div className="space-y-2">
                                        <h3 className="font-medium text-gray-900">
                                            {isOwnProfile
                                                ? 'No projects found'
                                                : 'No projects'}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {isOwnProfile
                                                ? 'Start creating your first project to showcase your work.'
                                                : "This user hasn't created any projects yet."}
                                        </p>
                                        {isOwnProfile && (
                                            <Button
                                                asChild
                                                variant="default"
                                                className="mt-2"
                                            >
                                                <Link
                                                    href={route(
                                                        'projects.create',
                                                    )}
                                                >
                                                    Create Project
                                                </Link>
                                            </Button>
                                        )}
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
