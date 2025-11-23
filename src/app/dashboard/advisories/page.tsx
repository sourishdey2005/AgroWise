
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import AdminAdvisoryTool from '@/components/dashboard/gov/admin-advisory-tool';
import { Kanban, FileUp, ArrowRight, Flag, PlusCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';

const escalatedIssues = [
    { id: 1, issue: "Widespread pest attack", village: "Rampur", agent: "Vijay Verma", status: "Pending Review" },
    { id: 2, issue: "Critical water shortage", village: "Sitapur", agent: "Anjali Mehta", status: "Actioned" },
    { id: 3, issue: "MSP procurement issue", village: "Ludhiana", agent: "Rajesh Gupta", status: "Pending Review" },
    { id: 4, issue: "Counterfeit fertilizer sales", village: "Guntur", agent: "Sandeep Reddy", status: "Actioned" },
    { id: 5, issue: "Locust swarm spotted", village: "Jaisalmer", agent: "Vijay Verma", status: "Pending Review" },
    { id: 6, issue: "Irrigation canal breach", village: "Tanjore", agent: "Anjali Mehta", status: "Actioned" },
    { id: 7, issue: "Delayed subsidy payment", village: "Amravati", agent: "Rajesh Gupta", status: "Pending Review" },
    { id: 8, issue: "Disease outbreak in poultry", village: "Hisar", agent: "Sandeep Reddy", status: "Actioned" },
    { id: 9, issue: "Hailstorm damage assessment", village: "Shimla", agent: "Vijay Verma", status: "Pending Review" },
    { id: 10, issue: "Poor seed quality complaint", village: "Warangal", agent: "Anjali Mehta", status: "Actioned" },
    { id: 11, issue: "Soil erosion concern", village: "Idukki", agent: "Rajesh Gupta", status: "Pending Review" },
    { id: 12, issue: "Storage facility fire", village: "Indore", agent: "Sandeep Reddy", status: "Actioned" },
    { id: 13, issue: "Unseasonal rainfall damage", village: "Kurnool", agent: "Vijay Verma", status: "Pending Review" },
    { id: 14, issue: "Wild animal crop damage", village: "Mysore", agent: "Anjali Mehta", status: "Actioned" },
    { id: 15, issue: "Labor shortage for harvest", village: "Nashik", agent: "Rajesh Gupta", status: "Pending Review" },
    { id: 16, issue: "Electricity supply issue for pumps", village: "Erode", agent: "Sandeep Reddy", status: "Actioned" },
    { id: 17, issue: "Road access blocked to mandi", village: "Solan", agent: "Vijay Verma", status: "Pending Review" },
    { id: 18, issue: "Adulterated pesticide reports", village: "Bathinda", agent: "Anjali Mehta", status: "Actioned" },
    { id: 19, issue: "Cold storage malfunction", village: "Agra", agent: "Rajesh Gupta", status: "Pending Review" },
    { id: 20, issue: "Cattle disease outbreak", village: "Anand", agent: "Sandeep Reddy", status: "Actioned" },
];

const initialTasks = {
    todo: [
        { id: 1, title: "Review Punjab drought report" },
        { id: 4, title: "Analyze fertilizer subsidy data" },
        { id: 7, title: "Plan for Kharif season preparedness" },
        { id: 8, title: "Check on PM-KISAN disbursal status" },
        { id: 9, title: "Evaluate new soil health card proposals" },
    ],
    inProgress: [
        { id: 2, title: "Draft MSP policy update for pulses" },
        { id: 5, title: "Coordinate with banks for KCC saturation drive" },
        { id: 10, title: "Finalize pest advisory for cotton belt" },
        { id: 11, title: "Organize webinar on new irrigation tech" },
    ],
    done: [
        { id: 3, title: "Approve Q2 subsidy disbursal" },
        { id: 6, title: "Launch new crop insurance scheme portal" },
        { id: 12, title: "Submit report on West Bengal flood damage" },
        { id: 13, title: "Release funds for drought relief in Rajasthan" },
        { id: 14, title: "Conduct training for new field agents" },
    ],
};

export default function AdvisoriesPage() {
    const { toast } = useToast();
    const [tasks, setTasks] = useState(initialTasks);
    const [newTask, setNewTask] = useState('');

    const handleGenerateReport = () => {
        toast({
            title: 'Report Generated',
            description: 'The selected report has been created and is ready for download (mock).',
        });
    };
    
    const handleAddTask = () => {
        if (newTask.trim()) {
            const newTodo = { id: Date.now(), title: newTask.trim() };
            setTasks(prev => ({
                ...prev,
                todo: [...prev.todo, newTodo]
            }));
            setNewTask('');
        }
    };


    return (
        <div className="grid gap-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Advisories &amp; Governance Tools</h1>
                <p className="text-muted-foreground">
                    Create advisories, manage escalated issues, and oversee governance tasks.
                </p>
            </div>

            <AdminAdvisoryTool />

            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Flag /> Agent Issue Escalations</CardTitle>
                        <CardDescription>Critical issues escalated by field agents for immediate attention.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Issue</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {escalatedIssues.map(issue => (
                                    <TableRow key={issue.id}>
                                        <TableCell className="font-medium">{issue.issue}</TableCell>
                                        <TableCell>{issue.village}</TableCell>
                                        <TableCell>
                                            <Badge variant={issue.status === 'Actioned' ? 'secondary' : 'destructive'}>{issue.status}</Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><FileUp /> Report Generator</CardTitle>
                        <CardDescription>Generate district or state-wise reports on demand.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Select>
                                <SelectTrigger><SelectValue placeholder="Select Report Type" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="yield">Crop Yield Report</SelectItem>
                                    <SelectItem value="subsidy">Subsidy Utilization</SelectItem>
                                    <SelectItem value="market">Market Price Analysis</SelectItem>
                                    <SelectItem value="weather">Weather Impact Report</SelectItem>
                                    <SelectItem value="pest">Pest Outbreak Report</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select>
                                <SelectTrigger><SelectValue placeholder="Select Region" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All India</SelectItem>
                                    <SelectItem value="andaman-nicobar">Andaman & Nicobar Islands</SelectItem>
                                    <SelectItem value="andhra-pradesh">Andhra Pradesh</SelectItem>
                                    <SelectItem value="arunachal-pradesh">Arunachal Pradesh</SelectItem>
                                    <SelectItem value="assam">Assam</SelectItem>
                                    <SelectItem value="bihar">Bihar</SelectItem>
                                    <SelectItem value="chandigarh">Chandigarh</SelectItem>
                                    <SelectItem value="chhattisgarh">Chhattisgarh</SelectItem>
                                    <SelectItem value="dadra-nagar-haveli">Dadra & Nagar Haveli and Daman & Diu</SelectItem>
                                    <SelectItem value="delhi">Delhi</SelectItem>
                                    <SelectItem value="goa">Goa</SelectItem>
                                    <SelectItem value="gujarat">Gujarat</SelectItem>
                                    <SelectItem value="haryana">Haryana</SelectItem>
                                    <SelectItem value="himachal-pradesh">Himachal Pradesh</SelectItem>
                                    <SelectItem value="jammu-kashmir">Jammu & Kashmir</SelectItem>
                                    <SelectItem value="jharkhand">Jharkhand</SelectItem>
                                    <SelectItem value="karnataka">Karnataka</SelectItem>
                                    <SelectItem value="kerala">Kerala</SelectItem>
                                    <SelectItem value="ladakh">Ladakh</SelectItem>
                                    <SelectItem value="lakshadweep">Lakshadweep</SelectItem>
                                    <SelectItem value="madhya-pradesh">Madhya Pradesh</SelectItem>
                                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                                    <SelectItem value="manipur">Manipur</SelectItem>
                                    <SelectItem value="meghalaya">Meghalaya</SelectItem>
                                    <SelectItem value="mizoram">Mizoram</SelectItem>
                                    <SelectItem value="nagaland">Nagaland</SelectItem>
                                    <SelectItem value="odisha">Odisha</SelectItem>
                                    <SelectItem value="puducherry">Puducherry</SelectItem>
                                    <SelectItem value="punjab">Punjab</SelectItem>
                                    <SelectItem value="rajasthan">Rajasthan</SelectItem>
                                    <SelectItem value="sikkim">Sikkim</SelectItem>
                                    <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                                    <SelectItem value="telangana">Telangana</SelectItem>
                                    <SelectItem value="tripura">Tripura</SelectItem>
                                    <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                                    <SelectItem value="uttarakhand">Uttarakhand</SelectItem>
                                    <SelectItem value="west-bengal">West Bengal</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button className="w-full" onClick={handleGenerateReport}>
                            Generate Report <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Kanban /> Officer Task Board</CardTitle>
                    <CardDescription>Track governance-related tasks and initiatives.</CardDescription>
                </CardHeader>
                <CardContent className="grid lg:grid-cols-3 gap-6">
                    {Object.entries(tasks).map(([status, taskItems]) => (
                        <div key={status} className="space-y-4 rounded-lg bg-secondary/50 p-4">
                            <h3 className="font-semibold text-center capitalize">{status === 'inProgress' ? 'In Progress' : status}</h3>
                            <div className="space-y-3 min-h-[150px]">
                                {taskItems.map(task => (
                                    <Card key={task.id} className="p-3 shadow-sm">
                                        <p className="font-semibold text-sm">{task.title}</p>
                                    </Card>
                                ))}
                            </div>
                            {status === 'todo' && (
                                <div className="flex gap-2">
                                    <Input 
                                        placeholder="Add a new task..."
                                        value={newTask}
                                        onChange={(e) => setNewTask(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                                    />
                                    <Button size="icon" onClick={handleAddTask}><PlusCircle className="w-4 h-4" /></Button>
                                </div>
                            )}
                        </div>
                    ))}
                </CardContent>
            </Card>

        </div>
    );
}
