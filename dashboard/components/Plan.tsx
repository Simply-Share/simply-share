import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function Plan({ title, price, features, primaryColor, intendedAudience }: Plans) {
    return (
        <Card className={`max-w-xs border-2 border-${primaryColor}`}>
            <CardHeader>
                <CardTitle className={`text-3xl font-bold text-${primaryColor}`}>{title}</CardTitle>
                <CardDescription>{intendedAudience}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <h2 className={`text-4xl font-extrabold text-${primaryColor}`}>$ {price}<span className="text-sm font-normal text-black"> / month</span></h2>
                <div>
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                        >
                            <span className={`flex h-2 w-2 translate-y-1 rounded-full bg-${primaryColor}`} />
                            <div className="space-y-1">
                                <p className="text-sm font-semibold leading-none">
                                    {feature}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <Button className={`w-full bg-${primaryColor} border-2 border-transparent hover:bg-transparent hover:border-${primaryColor} hover:text-${primaryColor} hover:text-${primaryColor} transition-colors`}>
                    {`Get ${title}`}
                </Button>
            </CardFooter>
        </Card>
    )
}
