import { Github } from "lucide-react";

export function SiteFooter() {
    return (
        <footer className="py-6 md:px-8 md:py-0 bg-gradient-to-r from-violet-600 to-indigo-600">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p className="text-balance text-center leading-loose text-muted-foreground md:text-left text-white">
                    Built with ❤️ by{" "}
                    <a
                        href={'#'}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-4"
                    >
                        Ch*t Lovers
                    </a>
                    .
                </p>
                <div>
                    <a
                        href={'#'}
                        target="_blank"
                        rel="noreferrer"
                        className="text-white hover:text-gray-200 hover:underline hover:underline-offset-4"
                    >
                        Privacy Policy
                    </a>
                    <span className="text-white mx-2">•</span>
                    <a
                        href={'#'}
                        target="_blank"
                        rel="noreferrer"
                        className="text-white hover:text-gray-200 hover:underline hover:underline-offset-4"
                    >
                        Terms of Service
                    </a>
                </div>
            </div>
        </footer>
    )
}