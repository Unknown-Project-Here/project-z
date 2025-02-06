import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ContactDetailsForm({
    className = '',
    contact,
}: {
    className?: string;
    contact: {
        id?: number;
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
    };
}) {
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            first_name: contact.first_name,
            last_name: contact.last_name,
            email: contact.email,
            phone: contact.phone,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('contacts.update', contact.id));
    };

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Contact Details</CardTitle>
                <CardDescription>
                    Update contact information.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={submit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="first_name">First Name</Label>
                        <Input
                            id="first_name"
                            value={data.first_name}
                            onChange={(e) => setData('first_name', e.target.value)}
                            required
                        />
                        {errors.first_name && (
                            <Alert variant="destructive">
                                <AlertDescription>
                                    {errors.first_name}
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="last_name">Last Name</Label>
                        <Input
                            id="last_name"
                            value={data.last_name}
                            onChange={(e) => setData('last_name', e.target.value)}
                            required
                        />
                        {errors.last_name && (
                            <Alert variant="destructive">
                                <AlertDescription>
                                    {errors.last_name}
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        {errors.email && (
                            <Alert variant="destructive">
                                <AlertDescription>
                                    {errors.email}
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            type="tel"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            required
                        />
                        {errors.phone && (
                            <Alert variant="destructive">
                                <AlertDescription>
                                    {errors.phone}
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            Save
                        </Button>

                        {recentlySuccessful && (
                            <p className="text-sm">Saved.</p>
                        )}
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
