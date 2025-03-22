export function ConfigurationHeader() {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
                <h2 className="text-lg font-semibold text-foreground">
                    Project Configuration Required
                </h2>
                <p className="text-sm text-muted-foreground">
                    Complete the setup process to enable all project features
                </p>
            </div>
        </div>
    );
}
