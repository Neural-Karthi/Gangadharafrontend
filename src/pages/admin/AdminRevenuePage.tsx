import React from 'react';
import { useQuery } from '@tanstack/react-query';
import apiClient from '@/integrations/mongodb/client';
import type { Registration } from '@/integrations/mongodb/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, AlertCircle, IndianRupee, Users } from 'lucide-react';

const courseNames: { [key: string]: string } = {
  'live-workshops': 'Sunday Live Workshops',
  'premium-combo': 'Premium Combo Course',
  'default': 'Sunday Live Workshops',
};

interface RevenueStat {
  courseName: string;
  registrations: number;
  totalRevenue: number;
}

const fetchSuccessfulRegistrations = async (): Promise<Registration[]> => {
  const response = await apiClient.get('/registrations?limit=1000');
  if (response.data.success) {
    // Filter for completed registrations
    return response.data.data.data.filter((reg: Registration) => reg.status === 'completed');
  }
  throw new Error('Failed to fetch registrations');
};

const calculateRevenueStats = (registrations: Registration[]): RevenueStat[] => {
  const stats: { [key: string]: { registrations: number; totalRevenue: number } } = {};

  registrations.forEach(reg => {
    const courseId = reg.course || 'default';
    if (!stats[courseId]) {
      stats[courseId] = { registrations: 0, totalRevenue: 0 };
    }
    stats[courseId].registrations += 1;
    // Use actual amount from the registration
    const amount = reg.amount || 0;
    stats[courseId].totalRevenue += amount;
  });

  return Object.entries(stats).map(([courseId, data]) => ({
    courseName: courseNames[courseId] || courseId || 'Unknown Course',
    registrations: data.registrations,
    totalRevenue: data.totalRevenue,
  })).sort((a, b) => b.totalRevenue - a.totalRevenue);
};

export default function AdminRevenuePage() {
  const { data: registrations, isLoading, isError, error } = useQuery({
    queryKey: ['successfulRegistrations'],
    queryFn: fetchSuccessfulRegistrations,
  });

  const revenueStats = React.useMemo(() => {
    if (!registrations) return [];
    return calculateRevenueStats(registrations);
  }, [registrations]);
  
  const totalRevenue = React.useMemo(() => {
    if (!registrations) return 0;
    return registrations.reduce((acc, reg) => {
      return acc + (reg.amount || 0);
    }, 0);
  }, [registrations]);

  const totalRegistrations = registrations?.length ?? 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full py-10">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-destructive/10 border border-destructive/50 text-destructive rounded-lg p-4 animate-fade-in">
        <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5"/>
            <h3 className="font-semibold">Error fetching revenue data</h3>
        </div>
        <p className="text-sm ml-7">{error instanceof Error ? error.message : String(error)}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <h1 className="text-3xl font-bold">Revenue Analytics</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{(totalRevenue / 100).toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-muted-foreground">
              from {totalRegistrations} successful registrations
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalRegistrations}</div>
            <p className="text-xs text-muted-foreground">
              across all courses
            </p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Revenue by Course</CardTitle>
          <CardDescription>A breakdown of revenue from each course.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead className="text-center">Registrations</TableHead>
                  <TableHead className="text-right">Total Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {revenueStats.length > 0 ? (
                  revenueStats.map((stat) => (
                    <TableRow key={stat.courseName}>
                      <TableCell className="font-medium">{stat.courseName}</TableCell>
                      <TableCell className="text-center">{stat.registrations}</TableCell>
                      <TableCell className="text-right font-semibold">
                        ₹{(stat.totalRevenue / 100).toLocaleString('en-IN')}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                      No revenue data available yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
