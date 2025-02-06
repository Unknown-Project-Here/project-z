import { OnboardingItem } from '@/components/onboarding/types';

export const languages: Record<string, OnboardingItem[]> = {
    'Web Development': [
        { name: 'JavaScript', icon: '⚡️', logo: '/icons/javascript.svg' },
        { name: 'TypeScript', icon: '💪', logo: '/icons/typescript.svg' },
        { name: 'HTML', icon: '🌐', logo: '/icons/html5.svg' },
        { name: 'CSS', icon: '🎨', logo: '/icons/css.svg' },
        { name: 'PHP', icon: '🐘', logo: '/icons/php.svg' },
        { name: 'Ruby', icon: '💎', logo: '/icons/ruby.svg' },
    ],
    'Mobile Development': [
        { name: 'Swift', icon: '🍎', logo: '/icons/swift.svg' },
        { name: 'Kotlin', icon: '📱', logo: '/icons/kotlin.svg' },
        { name: 'Java', icon: '☕️', logo: '/icons/java.svg' },
        { name: 'Objective-C', icon: '🎯' },
        { name: 'Dart', icon: '🎯' },
    ],
    'Systems Programming': [
        { name: 'C', icon: '⚙️', logo: '/icons/c.svg' },
        { name: 'C++', icon: '⚡️', logo: '/icons/cplusplus.svg' },
        { name: 'Rust', icon: '🦀', logo: '/icons/rust.svg' },
        { name: 'Go', icon: '🚀', logo: '/icons/go.svg' },
    ],
    'Data Science': [
        { name: 'Python', icon: '🐍', logo: '/icons/python.svg' },
        { name: 'R', icon: '📊', logo: '/icons/r.svg' },
        { name: 'Julia', icon: '📈', logo: '/icons/julia.svg' },
        { name: 'MATLAB', icon: '🔢' },
    ],
    Database: [
        { name: 'SQL', icon: '🗄️' },
        { name: 'MySQL', icon: '📚', logo: '/icons/mysql.svg' },
        { name: 'PostgreSQL', icon: '💾', logo: '/icons/postgresql.svg' },
        { name: 'SQLite', icon: '🔧', logo: '/icons/sqlite.svg' },
        { name: 'MongoDB', icon: '🔧', logo: '/icons/mongodb.svg' },
        { name: 'Redis', icon: '🔧', logo: '/icons/redis.svg' },
        { name: 'MariaDB', icon: '🔧', logo: '/icons/mariadb.svg' },
        { name: 'Cassandra', icon: '🔧', logo: '/icons/apachecassandra.svg' },
        { name: 'Elasticsearch', icon: '🔧', logo: '/icons/elasticsearch.svg' },
        { name: 'Neo4j', icon: '🔧', logo: '/icons/neo4j.svg' },
    ],
};
