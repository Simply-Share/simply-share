'use client'

import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useCallback, useEffect, useState } from "react";

function CallbackPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const code = searchParams.get('code');
    const { toast } = useToast();
    const [isGettingToken, setIsGettingToken] = useState(false);

    const getAccessToken = useCallback(async () => {
        setIsGettingToken(true);
        try {
            const result = await signIn('credentials', { code, redirect: false });

            if (result?.error) {
                throw new Error(result.error);
            }

            toast({
                title: 'Sign In was successful',
            });

            router.replace('/');

        } catch (error) {
            const err = error as Error;
            toast({
                title: 'Error fetching Access Token',
                description: err.message,
                variant: 'destructive'
            })
        } finally {
            setIsGettingToken(false);
        }
    }, [code, toast]);

    useEffect(() => {
        if (code) {
            getAccessToken();
        }
    }, [code, getAccessToken]);

    return (
        <div className="flex items-center justify-center">
            {isGettingToken && <Loader2 className="w-12 h-12 animate-spin" />}
        </div>
    )
}

export default function Page() {
    return (<Suspense fallback={<>Loading</>}>
        <CallbackPage />
    </Suspense>)
}
