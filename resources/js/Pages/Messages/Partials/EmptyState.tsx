interface EmptyStateProps {
    title: string;
    description: string;
}

export const EmptyState = ({ title, description }: EmptyStateProps) => (
    <div className="col-span-full flex flex-1 items-center justify-center text-gray-500">
        <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border border-dashed border-gray-300 bg-gray-50/50 px-6 py-8 text-center">
            <div className="space-y-2">
                <h3 className="font-medium text-gray-900">{title}</h3>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
        </div>
    </div>
);
