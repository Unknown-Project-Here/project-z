import ApplicationCard from '@/Components/applications/ApplicationCard';
import Pagination from '@/Components/ui/pagination';
import { useApplicationProps } from '@/hooks/useApplicationProps';

const ApplicationsList: React.FC = () => {
    const { data, meta } = useApplicationProps();

    return (
        <div className="flex flex-col gap-4 p-4">
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
