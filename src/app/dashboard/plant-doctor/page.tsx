"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function PlantDoctorPage() {
  return (
    <div className="grid gap-6">
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>AI Plant Doctor</CardTitle>
          <CardDescription>
            Use your phone's camera to detect plant diseases and get instant recommendations.
            Point your camera at the affected plant area and the AI will analyze it.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://agri-doctor-kappa.vercel.app/"
              width="100%"
              height="800"
              allow="camera; microphone"
            ></iframe>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
