import ApplicationCard from '@/Components/applications/ApplicationCard';
import Pagination from '@/Components/ui/pagination';
import { useApplicationProps } from '@/hooks/useApplicationProps';
import { useProjectProps } from '@/hooks/useProjectProps';
import { Link } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '../ui/button';
import Heading from '../ui/typography/Heading';

const ApplicationsList: React.FC = () => {
    const { data, meta } = useApplicationProps();
    const project = useProjectProps();

    const backButton = route('projects.show', {
        project: project.id,
        activeTab: 'members',
    });

    if (meta.total < 1) {
        return (
            <div className="flex justify-between gap-4">
                <p>No applications found</p>
                <Button className="w-fit" asChild>
                    <Link href={backButton}>
                        <ChevronLeft className="mr-2 size-4" />
                        Back
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex w-full justify-between">
                <Heading level={3}>View Applications</Heading>
                <Button className="w-fit" asChild>
                    <Link href={backButton}>
                        <ChevronLeft className="mr-2 size-4" />
                        Back
                    </Link>
                </Button>
            </div>
            {data.map((application) => (
                <ApplicationCard
                    key={application.id}
                    application={application}
                />
            ))}
            <Pagination pagination={meta} perPageOptions={[10, 20, 30, 50]} />
        </div>
    );
};

export default ApplicationsList;
