import Heading from '@/Components/ui/typography/Heading';

export function ConfigurationHeader() {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-2">
                <Heading level={3}>Project Configuration Required</Heading>
                <Heading level={6}>
                    Complete the setup process to enable all project features
                </Heading>
            </div>
        </div>
    );
}
