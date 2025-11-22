"use client";

import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Leaf, Users, BarChart, Banknote, LayoutDashboard, Settings } from 'lucide-react';
import type { User } from '@/lib/types';
import { Logo } from '../shared/logo';

const navItems = {
  farmer: [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '#', icon: Leaf, label: 'My Crops' },
  ],
  agent: [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '#', icon: Users, label: 'Farmers' },
  ],
  government: [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '#', icon: BarChart, label: 'Statistics' },
  ],
  bank: [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '#', icon: Banknote, label: 'Loans' },
  ],
};

export function DashboardSidebar({ user }: { user: User }) {
  const items = navItems[user.role] || [];

  return (
    <TooltipProvider>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-card sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="/dashboard"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Leaf className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">AgroWise</span>
          </Link>
          {items.map((item) => (
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          ))}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
    </TooltipProvider>
  );
}
