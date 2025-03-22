import { Input } from '@/Components/ui/input';
import Heading from '@/Components/ui/typography/Heading';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { useState } from 'react';

function InviteUser() {
    const [query, setQuery] = useState('');
    const [debouncedQuery] = useDebouncedValue(query, 500);

    return (
        <div className="space-y-4 p-4">
            <Heading level={2}>Invite User</Heading>
            <Input
                placeholder="Search for a user"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <Input
                readOnly
                value={debouncedQuery}
                className="pointer-events-none cursor-not-allowed"
            />
        </div>
    );
}

export default InviteUser;
