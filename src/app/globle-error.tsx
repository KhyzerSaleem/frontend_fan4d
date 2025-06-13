'use client' // Error boundaries must be Client Components

export default function Error({ error, reset, }: { error: Error & { digest?: string }; reset: () => void }) {

    return (
        <html>
            <body>
                <main>
                    <h2>Something went wrong! {error.message} </h2>
                    <button
                        onClick={
                            // Attempt to recover by trying to re-render the segment
                            () => reset()
                        }
                    >
                        Try again
                    </button>
                </main>
            </body>
        </html>
    )
}