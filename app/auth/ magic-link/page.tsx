import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const MagicLinkVerifyPage: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');

    useEffect(() => {
        const verifyMagicLink = async () => {
            const token = searchParams?.get('token');

            if (!token) {
                setStatus('error');
                return;
            }

            try {
                // Replace with your API endpoint
                const res = await fetch('/api/auth/verify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token }),
                });

                if (res.ok) {
                    setStatus('success');
                    // setCookie('token', token, 3); // Set cookie for 1 day
                    setTimeout(() => router.push('/dashboard'), 1500);
                } else {
                    setStatus('error');
                }
            } catch {
                setStatus('error');
            }
        };

        verifyMagicLink();
    }, [router]);

    return (
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            {status === 'verifying' && <p>Verifying your magic link...</p>}
            {status === 'success' && <p>Magic link verified! Redirecting...</p>}
            {status === 'error' && <p>Invalid or expired magic link.</p>}
        </div>
    );
};

export default MagicLinkVerifyPage;