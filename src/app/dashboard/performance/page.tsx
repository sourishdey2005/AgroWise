"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StatCard from '@/components/shared/stat-card';
import { BarChart as BarChartIcon, Star, Trophy, Target } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import performanceData from '@/data/performance.json';

const { visitData, leaderboard } = performanceData;

export default function PerformancePage() {
  const activityScore = 88;
  const satisfactionRating = 4.5;

  return (
    <div className="grid gap-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Performance Metrics</h1>
        <p className="text-muted-foreground">
          Track your activity, goals, and farmer satisfaction.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Monthly Activity Score</CardTitle>
                <Target className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
                 <div className="relative h-24 w-24">
                    <svg className="h-full w-full" viewBox="0 0 36 36">
                        <path
                            className="text-secondary"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            strokeWidth="3.5"
                        />
                        <path
                            className="text-primary"
                            strokeDasharray={`${activityScore}, 100`}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-primary">{activityScore}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
         <StatCard
          title="Resolved Issues"
          value="42"
          icon={<Trophy className="h-6 w-6 text-muted-foreground" />}
          description="Issues resolved this month"
        />
        <StatCard
          title="Farmer Satisfaction"
          value={`${satisfactionRating} / 5`}
          icon={<Star className="h-6 w-6 text-muted-foreground" />}
          description="Average farmer rating"
        />
         <StatCard
          title="Completed Visits"
          value={visitData.reduce((acc, item) => acc + item.completed, 0).toString()}
          icon={<BarChartIcon className="h-6 w-6 text-muted-foreground" />}
          description="Total visits this month"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Field Visits vs Plan</CardTitle>
            <CardDescription>Your weekly field visit completion rate for the past month.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={visitData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                    cursor={{ fill: 'hsl(var(--muted))' }}
                    contentStyle={{ backgroundColor: 'hsl(var(--background))' }}
                />
                <Bar dataKey="scheduled" name="Scheduled" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completed" name="Completed" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Agent Performance Leaderboard</CardTitle>
                <CardDescription>Your ranking among agents in your region.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Rank</TableHead>
                        <TableHead>Agent</TableHead>
                        <TableHead className="text-right">Score</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {leaderboard.map((agent) => (
                        <TableRow key={agent.rank} className={agent.name === 'You' ? 'bg-secondary' : ''}>
                            <TableCell className="font-medium">{agent.rank}</TableCell>
                            <TableCell>{agent.name}</TableCell>
                            <TableCell className="text-right">{agent.score}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
