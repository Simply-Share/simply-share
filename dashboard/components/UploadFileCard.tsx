'use client'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { supportedFileTypes } from "@/constants/SUPPORTED_FILES"
import { fileToBase64 } from "@/helpers/encodeFile"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteFromLocalStorage, saveToLocalStorage } from "@/helpers/localStorageMethods"
import { useRef } from "react"


export default function UploadFileCard() {

    const form = useForm();

    const formRef = useRef<HTMLFormElement>(null);

    const onSubmit = async (data: any) => {
        const fileType = data.fileType;
        const file = data.file[0];
        const projectName = data.name;
        console.log("hello")
        try {
            const encodedFile = await fileToBase64(file);
            if (!encodedFile) return;
            saveToLocalStorage(projectName, encodedFile, fileType);
        } catch (error) {
            console.error(error);
        } finally {
            form.reset();
        }
    }
    
    const handleContinue = () => {
        formRef.current?.dispatchEvent(new Event('submit'));
    }

    return (
        <Card className="mx-auto mt-10 w-2/3">
            <CardHeader>
                <CardTitle>Create project</CardTitle>
                {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" ref={formRef}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-black">Project Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="resilient-hawk" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="file"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-black">Upload your file</FormLabel>
                                    <FormControl>
                                        <Input onChange={(e) => {
                                            field.onChange(e.target.files);
                                        }} type="file" accept=".pdf" value={field.value?.[0]?.filename} onBlur={field.onBlur} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="fileType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>File Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a file type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                supportedFileTypes.map((type) => (
                                                    <SelectItem key={type} value={type}>
                                                        {type}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="outline">Deploy</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>You must Sign In to continue</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        You must be authenticated to deploy your project. Click continue to Sign In. Dont worry we will save your current data.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel onClick={()=>deleteFromLocalStorage()}>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleContinue}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </form>
                </Form>
            </CardContent>

        </Card>
    )
}
