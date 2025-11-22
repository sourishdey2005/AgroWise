"use client";

import { useAuth } from '@/hooks/use-auth';
import FarmerDashboard from '@/components/dashboard/farmer-dashboard';
import AgentDashboard from '@/components/dashboard/agent-dashboard';
import GovernmentDashboard from '@/components/dashboard/government-dashboard';
import BankDashboard from '@/components/dashboard/bank-dashboard';

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    return null; // Or a loading spinner, though layout should handle it
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'farmer':
        return <FarmerDashboard />;
      case 'agent':
        return <AgentDashboard />;
      case 'government':
        return <GovernmentDashboard />;
      case 'bank':
        return <BankDashboard />;
      default:
        return <div>Invalid user role.</div>;
    }
  };

  return <div className="animate-in fade-in duration-500">{renderDashboard()}</div>;
}
