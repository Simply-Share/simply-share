import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Copy, Edit2, Trash2 } from "lucide-react"

export default function Project() {
    return (
        <Card className="w-2/3 my-2">
            <div className="flex items-center justify-between px-5">
                <CardHeader>
                    <CardTitle>Project Name</CardTitle>
                </CardHeader>
                <div className="flex items-center gap-3">
                    <Button variant="outline"><Edit2 className="h-4 w-4" /></Button>
                    <Button variant="outline"><Copy className="h-4 w-4" /></Button>
                    <Button><Trash2 className="h-4 w-4" /></Button>
                </div>
            </div>
        </Card>
    )
}
