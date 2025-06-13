
import { Footer, Header } from "@/components/layout";


export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return <>
        <Header />
        <main>
            {children}
        </main>
        <Footer />
    </>
}
