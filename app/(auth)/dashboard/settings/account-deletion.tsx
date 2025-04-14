'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Trash2, Loader2 } from 'lucide-react';
import { startTransition, useActionState } from 'react';
import { deleteAccount } from '@/app/(login)/actions';

type ActionState = {
    error?: string;
    success?: string;
};

export default function AccountDeletion() {
    const [deleteState, deleteAction, isDeletePending] = useActionState<
        ActionState,
        FormData
    >(deleteAccount, { error: '', success: '' });

    const handleDeleteSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        startTransition(() => {
            deleteAction(new FormData(event.currentTarget));
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Delete Account</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-500 mb-4">
                    Account deletion is non-reversable. Please proceed with caution.
                </p>
                <form onSubmit={handleDeleteSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="delete-password" className="mb-2">
                            Confirm Password
                        </Label>
                        <Input
                            id="delete-password"
                            name="password"
                            type="password"
                            required
                            minLength={8}
                            maxLength={100}
                        />
                    </div>
                    {deleteState.error && (
                        <p className="text-red-500 text-sm">{deleteState.error}</p>
                    )}
                    <Button
                        type="submit"
                        variant="destructive"
                        className="bg-red-600 hover:bg-red-700"
                        disabled={isDeletePending}
                    >
                        {isDeletePending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            <>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Account
                            </>
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
