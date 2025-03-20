interface GradientHeaderProps {
    title: string;
    description?: string;
}

export function GradientHeader({ title, description }: GradientHeaderProps) {
    return (
        <div className="relative overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-gradient-to-br from-white via-[hsl(264.7,35%,95%)] to-[hsl(325.5,40%,92%)] p-8 shadow-md transition-all duration-300 hover:shadow-lg dark:from-[hsl(231.4,15.3%,16.4%)] dark:via-[hsl(264.7,20%,18%)] dark:to-[hsl(325.5,25%,20%)]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent opacity-80 dark:opacity-30" />
            <div className="relative">
                <h1 className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                    {title}
                </h1>
                {description && (
                    <p className="mt-2 text-base text-muted-foreground md:text-lg">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}
