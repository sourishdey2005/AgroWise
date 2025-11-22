import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import StatCard from "../shared/stat-card";
import { HandCoins, Hourglass, CheckCircle, XCircle } from "lucide-react";
import { LoanApplication } from "@/lib/types";
import loanData from "@/data/loans.json";
import Link from "next/link";

const loans: LoanApplication[] = loanData.applications;

const getStatusVariant = (status: LoanApplication['status']) => {
  switch (status) {
    case 'pending':
      return 'secondary';
    case 'approved':
      return 'default';
    case 'rejected':
      return 'destructive';
  }
};

const totalLoans = loans.length;
const pendingLoans = loans.filter(l => l.status === 'pending').length;
const approvedLoans = loans.filter(l => l.status === 'approved').length;
const rejectedLoans = loans.filter(l => l.status === 'rejected').length;

export default function BankDashboard() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Applications"
          value={totalLoans.toString()}
          icon={<HandCoins className="h-6 w-6 text-muted-foreground" />}
          description="Total loan applications received"
        />
        <StatCard
          title="Pending Review"
          value={pendingLoans.toString()}
          icon={<Hourglass className="h-6 w-6 text-muted-foreground" />}
          description="Applications awaiting approval"
        />
        <StatCard
          title="Approved Loans"
          value={approvedLoans.toString()}
          icon={<CheckCircle className="h-6 w-6 text-muted-foreground" />}
          description="This fiscal year"
        />
        <StatCard
          title="Rejected Loans"
          value={rejectedLoans.toString()}
          icon={<XCircle className="h-6 w-6 text-muted-foreground" />}
          description="This fiscal year"
        />
      </div>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Recent Loan Applications</CardTitle>
          <CardDescription>A snapshot of the most recent applications. For more details, visit the Loan Management section.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Farmer Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loans.slice(0, 3).map((loan) => (
                <TableRow key={loan.id}>
                  <TableCell className="font-medium">{loan.farmerName}</TableCell>
                  <TableCell>₹{loan.amount.toLocaleString('en-IN')}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(loan.status)}>
                      {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/dashboard/bank/loan-management">Review</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
