'use client'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
    const { toast } = useToast();
    const router = useRouter();

    async function getGoogleAuthURL() {
        try {
            const response = await axios.get(`/_api/auth/google/url`);
            const data = response.data;
            console.log(data);
            router.push(data.url);
        } catch (error) {
            const err = error as AxiosError;
            toast({
                title: 'Error fetching Google Auth URL',
                description: err.message,
                variant: 'destructive'
            });
        }
    }

    return (
        <Button onClick={getGoogleAuthURL}>Login with Google
        </Button>
    )
}
