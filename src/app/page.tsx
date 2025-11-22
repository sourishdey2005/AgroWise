import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Leaf, Banknote, Users, BarChart } from 'lucide-react';
import { Logo } from '@/components/shared/logo';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <Logo />
          <span className="sr-only">AgroWise</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Contact
          </Link>
          <Button asChild>
            <Link href="/login">
              Login <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/10 dark:to-emerald-900/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline text-primary">
                    Empowering Indian Agriculture with Data-Driven Insights
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    AgroWise is a unified platform connecting Farmers, Agents, Government, and Banks to foster a smarter, more efficient agricultural ecosystem.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/login">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://picsum.photos/seed/agrolanding/600/400"
                  width="600"
                  height="400"
                  alt="Hero"
                  data-ai-hint="farm landscape"
                  className="mx-auto aspect-video overflow-hidden rounded-2xl object-cover sm:w-full lg:order-last lg:aspect-square shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">A Platform for Every Stakeholder</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  AgroWise provides dedicated tools and dashboards for everyone in the agricultural value chain, from the farmer in the field to the policymaker in the government.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-4 lg:max-w-none mt-12">
              <div className="grid gap-1 text-center">
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Leaf className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-lg font-bold">For Farmers</h3>
                <p className="text-sm text-muted-foreground">Crop recommendations, weather alerts, and market prices to maximize yield and profit.</p>
              </div>
              <div className="grid gap-1 text-center">
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Users className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-lg font-bold">For Agents</h3>
                <p className="text-sm text-muted-foreground">Manage farmer relationships, provide timely advisories, and track field reports.</p>
              </div>
              <div className="grid gap-1 text-center">
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <BarChart className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-lg font-bold">For Government</h3>
                <p className="text-sm text-muted-foreground">Monitor crop production, manage subsidies, and publish nationwide advisories.</p>
              </div>
              <div className="grid gap-1 text-center">
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Banknote className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-lg font-bold">For Banks</h3>
                <p className="text-sm text-muted-foreground">Streamline loan applications, assess farmer credit risk, and manage disbursements.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
                Join the Agricultural Revolution
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Ready to harness the power of data for a prosperous agricultural future? Log in to your dashboard.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Button asChild size="lg" className="w-full">
                <Link href="/login">Access Your Dashboard</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 AgroWise. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
