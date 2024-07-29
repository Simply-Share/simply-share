import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { FAQS as faqs } from "@/constants/FAQS"

export default function Faqs() {
    return (
        <div className="container mt-16">
            <h1 className="text-center text-3xl font-bold text-gray-700">Frequently Asked Questions</h1>
            <Accordion type="single" collapsible className="max-w-2xl mx-auto mt-6 mb-10">
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index + 1}`}>
                        <AccordionTrigger className="text-md hover:no-underline">{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}
