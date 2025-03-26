import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

const HeroSection = () => {
  return (
    <section className="w-full h-screen flex flex-col justify-center items-center pt-36 md:pt-48 pb-10 px-4">
        <div className="space-y-6 text-center">
            <div className="space-y-6 mx-auto">
                <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title">Your AI Career Coach for
                    <br/>
                    Professional Success
                </h1>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                    Advance your career with personalized guidance, inetrview prep, and AI-powered tools for job success.
                </p>
            </div>

            <div className="flex justify-center space-x-4">
                <Link href='/sign-up'>
                    <Button size="lg" className="px-8">Get Started</Button>
                </Link>
            </div>
        </div>
    </section>
  )
}

export default HeroSection