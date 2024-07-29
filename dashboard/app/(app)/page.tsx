'use client'

import { SiteFooter } from "@/components/Footer";
import Plans from "@/components/Plans";
import { TESTIMONIALS } from "@/constants/TESTIMONIALS";
import TestimonialSlider from "@/components/testimonials/TestimonialsSlider";
import UploadFileCard from "@/components/UploadFileCard";
import Faqs from "@/components/faqs";



export default function Home() {
  return (
    <>
      <header className="text-center text-4xl mt-8 font-bold text-gray-700">Built with <span className="bg-gradient-to-r from-violet-600 to-cyan-500 inline-block text-transparent bg-clip-text">effort ?</span> Share with <span className="bg-gradient-to-r from-violet-600 to-cyan-500 inline-block text-transparent bg-clip-text">ease !</span></header>
      <main className="container">
        <UploadFileCard />
        <TestimonialSlider testimonials={TESTIMONIALS} />
        <Plans />
        <Faqs />
      </main>
      <SiteFooter />
    </>
  );
}
