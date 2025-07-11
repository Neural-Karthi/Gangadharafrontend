import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Users, DollarSign, TrendingUp, Calendar, LogOut, Settings, FileText, Link } from 'lucide-react';
import { toast } from 'sonner';
import apiClient from '@/integrations/mongodb/client';

interface DashboardStats {
  totalRegistrations: number;
  totalRevenue: number;
  pendingPayments: number;
  completedPayments: number;
}

const AdminDashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalRegistrations: 0,
    totalRevenue: 0,
    pendingPayments: 0,
    completedPayments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [countResponse, registrationsResponse] = await Promise.all([
          apiClient.get('/registrations/count'),
          apiClient.get('/registrations?limit=1000')
        ]);

        const totalRegistrations = countResponse.data.data.count;
        const registrations = registrationsResponse.data.data.data;

        const totalRevenue = registrations
          .filter((reg: any) => reg.status === 'completed')
          .reduce((sum: number, reg: any) => sum + (reg.amount / 100), 0);

        const pendingPayments = registrations.filter((reg: any) => reg.status === 'pending').length;
        const completedPayments = registrations.filter((reg: any) => reg.status === 'completed').length;

        setStats({
          totalRegistrations,
          totalRevenue,
          pendingPayments,
          completedPayments,
      });
      } catch (error) {
        console.error('Error fetching stats:', error);
        toast.error('Failed to load dashboard statistics');
    } finally {
        setLoading(false);
    }
  };

    fetchStats();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/admin/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const handleResetPassword = async () => {
    if (!user?.email) {
      toast.error('User email not available');
      return;
    }

    try {
      await apiClient.post('/auth/reset-password', { email: user.email });
      toast.success('Password reset instructions sent to your email');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to send reset email');
    }
  };

  if (loading) {
  return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
  );
}

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.email}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleResetPassword}>
              <Settings className="h-4 w-4 mr-2" />
              Reset Password
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
          </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRegistrations}</div>
              <p className="text-xs text-muted-foreground">
                All time registrations
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString('en-IN')}</div>
              <p className="text-xs text-muted-foreground">
                From completed payments
              </p>
            </CardContent>
          </Card>

          <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
              <div className="text-2xl font-bold">{stats.pendingPayments}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting payment
              </p>
          </CardContent>
        </Card>

          <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Payments</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedPayments}</div>
              <p className="text-xs text-muted-foreground">
                Successful transactions
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Manage Registrations
            </CardTitle>
              <CardDescription>
                View and manage all course registrations
              </CardDescription>
          </CardHeader>
          <CardContent>
              <Button 
                className="w-full" 
                onClick={() => navigate('/admin/registrations')}
              >
                View Registrations
              </Button>
          </CardContent>
        </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Link className="h-5 w-5 mr-2" />
                Meeting Links
            </CardTitle>
              <CardDescription>
                Manage workshop meeting links
              </CardDescription>
          </CardHeader>
          <CardContent>
              <Button 
                className="w-full" 
                onClick={() => navigate('/admin/meeting-links')}
              >
                Manage Links
              </Button>
          </CardContent>
        </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Revenue Analytics
            </CardTitle>
              <CardDescription>
                View detailed revenue reports
              </CardDescription>
          </CardHeader>
          <CardContent>
              <Button 
                className="w-full" 
                onClick={() => navigate('/admin/revenue')}
              >
                View Reports
              </Button>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
