
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Check, Handshake, Lightbulb, Calculator, Book, UserCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import schemeData from '@/data/schemes.json';

export default function SchemeCoordinationPage() {
    const { toast } = useToast();
    const [farmerId, setFarmerId] = useState('');
    const [schemeId, setSchemeId] = useState('');
    const [loanAmount, setLoanAmount] = useState(100000);
    const [eligibility, setEligibility] = useState<boolean | null>(null);
    const [combinedBenefit, setCombinedBenefit] = useState<number | null>(null);
    const [recommendedSchemes, setRecommendedSchemes] = useState<string[]>([]);

    const checkEligibility = () => {
        if (!farmerId || !schemeId) {
            toast({ variant: 'destructive', title: 'Please select a farmer and a scheme.' });
            return;
        }
        // Mock eligibility logic
        const isEligible = Math.random() > 0.3;
        setEligibility(isEligible);
        toast({ title: isEligible ? 'Farmer is Eligible' : 'Farmer is Not Eligible' });
    };

    const calculateBenefit = () => {
        if (!farmerId || !schemeId || !loanAmount) {
            toast({ variant: 'destructive', title: 'Please select farmer, scheme, and enter a loan amount.' });
            return;
        }
        // Mock benefit calculation
        const subsidyAmount = 20000; // Mock subsidy
        setCombinedBenefit(loanAmount + subsidyAmount);
    };

    const recommendSchemes = () => {
        if (!farmerId) {
            toast({ variant: 'destructive', title: 'Please select a farmer.' });
            return;
        }
        // Mock recommendation logic
        setRecommendedSchemes([
            "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
            "Kisan Credit Card (KCC) Scheme"
        ]);
        toast({ title: "Recommendations Generated" });
    };

    return (
        <div className="grid gap-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Subsidy & Scheme Coordination</h1>
                <p className="text-muted-foreground">Coordinate loans with government schemes and subsidies.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><UserCheck /> Subsidy Eligibility Checker</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-4 items-end">
                    <Select onValueChange={setFarmerId}>
                        <SelectTrigger><SelectValue placeholder="Select Farmer" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">Ramesh Kumar</SelectItem>
                            <SelectItem value="2">Sita Devi</SelectItem>
                            <SelectItem value="3">Arjun Singh</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select onValueChange={setSchemeId}>
                        <SelectTrigger><SelectValue placeholder="Select Scheme" /></SelectTrigger>
                        <SelectContent>
                            {schemeData.schemes.map(s => <SelectItem key={s.id} value={String(s.id)}>{s.title}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <Button onClick={checkEligibility}><Check className="mr-2 h-4 w-4" /> Check</Button>
                    {eligibility !== null && (
                        <div className={`md:col-span-3 mt-4 text-center font-bold p-2 rounded-md ${eligibility ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {eligibility ? 'Farmer is ELIGIBLE for this subsidy.' : 'Farmer is NOT ELIGIBLE based on current data.'}
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Calculator /> Loan + Subsidy Combined Benefit Estimator</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-4 items-end">
                    <div>
                        <label className="text-sm font-medium">Loan Amount (₹)</label>
                        <Input type="number" value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))} />
                    </div>
                     <div>
                        <label className="text-sm font-medium">Scheme</label>
                        <Select onValueChange={setSchemeId}>
                            <SelectTrigger><SelectValue placeholder="Select Scheme" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">PM-KISAN</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button onClick={calculateBenefit}>Calculate Benefit</Button>
                    {combinedBenefit !== null && (
                        <div className="md:col-span-3 mt-4 text-center">
                            <p className="text-muted-foreground">Estimated Total Benefit (Loan Disbursed + Subsidy)</p>
                            <p className="text-4xl font-bold text-primary">₹{combinedBenefit.toLocaleString('en-IN')}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Lightbulb /> Government Scheme Recommendation Engine</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-4 items-end">
                     <div className="md:col-span-2">
                        <label className="text-sm font-medium">Farmer Profile</label>
                        <Select onValueChange={setFarmerId}>
                            <SelectTrigger><SelectValue placeholder="Select Farmer for Recommendation" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Ramesh Kumar (Punjab, Rice)</SelectItem>
                                <SelectItem value="2">Sita Devi (Maharashtra, Soybean)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button onClick={recommendSchemes}>Recommend</Button>
                    {recommendedSchemes.length > 0 && (
                        <div className="md:col-span-3 mt-4">
                            <Alert>
                                <Book className="h-4 w-4" />
                                <AlertTitle>Recommended Schemes</AlertTitle>
                                <AlertDescription>
                                    <ul className="list-disc list-inside mt-2">
                                        {recommendedSchemes.map(s => <li key={s}>{s}</li>)}
                                    </ul>
                                </AlertDescription>
                            </Alert>
                        </div>
                    )}
                </CardContent>
            </Card>

        </div>
    );
}
