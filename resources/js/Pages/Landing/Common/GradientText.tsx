interface GradientTextProps {
    children: React.ReactNode;
}

export function GradientText({ children }: GradientTextProps) {
    return (
        <span className="relative inline-block">
            <span className="absolute inset-0 -z-10 translate-y-1/4 rotate-1 bg-gradient-to-r from-white/20 via-white/20 to-white/20 blur-xl"></span>
            <span className="relative bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {children}
            </span>
        </span>
    );
}
