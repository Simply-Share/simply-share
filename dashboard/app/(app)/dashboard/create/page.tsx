'use client'

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { supportedFileTypes } from "@/constants/SUPPORTED_FILES"
import axios, { AxiosError } from "axios"
import { User } from "next-auth"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"

export default function CreateProjectPage() {
    const { data: session } = useSession();
    const { toast } = useToast();
    const user = session?.user as User;

    const onSubmit = async (data: any) => {
        const fileType = data.fileType;

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/upload`, { file: data.file[0], fileType }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${user?.accessToken}`,
                },
            });

            console.log(response.data);

        } catch (error) {
            const err = error as AxiosError;
            toast({
                title: "An error occurred",
                description: err?.message,
                variant: 'destructive'
            })
        }
    }

    const form = useForm()

    return (
        <div className="max-w-72 mt-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
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
                    <Button type="submit">Create Project</Button>
                </form>
            </Form>
        </div>
    )
}


