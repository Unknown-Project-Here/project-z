import ApplicationCard from '@/Components/applications/ApplicationCard';
import Pagination from '@/Components/ui/pagination';
import { useApplicationProps } from '@/hooks/useApplicationProps';
import { ChevronLeft } from 'lucide-react';
import { Button } from '../ui/button';
import Heading from '../ui/typography/Heading';

const ApplicationsList: React.FC = () => {
    const { data, meta } = useApplicationProps();

    if (meta.total < 1) {
        return (
            <div className="flex justify-between gap-4">
                <p>No applications found</p>
                <Button className="w-fit" onClick={() => window.history.back()}>
                    <ChevronLeft className="mr-2 size-4" />
                    Back
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex w-full justify-between">
                <Heading level={3}>View Applications</Heading>
                <Button className="w-fit" onClick={() => window.history.back()}>
                    <ChevronLeft className="mr-2 size-4" />
                    Back
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
