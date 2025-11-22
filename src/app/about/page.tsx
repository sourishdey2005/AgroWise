import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary/50">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <Logo />
          <span className="sr-only">AgroWise</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <div className="container mx-auto py-12 md:py-24 px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <Card className="rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline text-primary">
                  About AgroWise
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-lg text-muted-foreground">
                <p>
                  AgroWise is a pioneering digital platform designed to revolutionize the agricultural landscape of India. Our mission is to bridge the information gap and foster seamless collaboration among the key stakeholders of the agricultural ecosystem: the farmers who feed the nation, the agents who guide them, the government bodies that support them, and the financial institutions that fund them.
                </p>
                <p>
                  We believe that data is the most critical nutrient for modern farming. By providing real-time, actionable insights on weather, soil health, crop management, and market prices, we empower farmers to make informed decisions, enhance productivity, and secure their livelihoods.
                </p>
                <h3 className="text-2xl font-bold text-foreground font-headline">Our Vision</h3>
                <p>
                  Our vision is to create a self-sustaining, technology-driven agricultural community where every participant is equipped with the right tools and knowledge to thrive. We aim to build a transparent, efficient, and profitable ecosystem that contributes to national food security and the prosperity of rural India.
                </p>
                <p>
                  Join us on our journey to cultivate a smarter future for Indian agriculture.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
