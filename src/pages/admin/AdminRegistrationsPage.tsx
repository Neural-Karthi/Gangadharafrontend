import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Trash2, Download, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import apiClient from '@/integrations/mongodb/client';
import type { Registration } from '@/integrations/mongodb/types';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const AdminRegistrationsPage = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRegistrations, setTotalRegistrations] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const fetchRegistrations = async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/registrations?page=${page}&limit=10`);
      const data = response.data.data;
      
      setRegistrations(data.data);
      setTotalPages(data.totalPages);
      setTotalRegistrations(data.total);
      setPageCount(data.totalPages);
    } catch (error) {
      console.error('Error fetching registrations:', error);
      toast.error('Failed to load registrations');
    } finally {
      setLoading(false);
    }
};

const clearAllRegistrations = async () => {
    try {
      await apiClient.delete('/registrations');
      toast.success('All registrations cleared successfully');
      fetchRegistrations(1);
    } catch (error) {
      console.error('Error clearing registrations:', error);
      toast.error('Failed to clear registrations');
  }
};

const generatePDF = async (registrations: Registration[]) => {
  try {
    const doc = new jsPDF();
    doc.text('Registrations', 14, 16);
    const tableColumn = [
      'Name',
      'Email',
      'Phone',
      'Amount',
      'Status',
      'Registered On',
    ];
    const tableRows = registrations.map((reg) => [
      reg.name,
      reg.email,
      reg.phone_number || 'N/A',
      reg.amount && reg.amount > 0 ? `₹${(reg.amount / 100).toLocaleString('en-IN')}` : reg.status === 'pending' ? 'Pending Payment' : reg.status === 'completed' ? '₹2,997' : 'Free Registration',
      reg.status,
      reg.createdAt ? new Date(reg.createdAt).toLocaleString('en-IN') : '',
    ]);
    autoTable(doc, { head: [tableColumn], body: tableRows, startY: 22 });
    doc.save('registrations.pdf');
    toast.success('PDF downloaded!');
  } catch (error) {
    console.error('Error generating PDF:', error);
    toast.error('Failed to generate PDF');
  }
};

  const handleDownloadPDF = async () => {
    try {
      const response = await apiClient.get('/registrations?limit=1000');
      const allRegistrations = response.data.data.data;
      await generatePDF(allRegistrations);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast.error('Failed to download PDF');
    }
  };
  
  const handlePreviousPage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      fetchRegistrations(newPage);
    }
  };

  const handleNextPage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage < pageCount) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      fetchRegistrations(newPage);
    }
  };

  useEffect(() => {
    fetchRegistrations(1);
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading registrations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
      <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
          <div>
                <CardTitle>Registrations</CardTitle>
                <CardDescription>
                  Manage all course registrations and payments
                </CardDescription>
          </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" onClick={handleDownloadPDF}>
              <Download className="mr-2 h-4 w-4" />
                  Export PDF
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                  Clear All
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete all registration data from the database.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        onClick={clearAllRegistrations}
                  >
                    Yes, delete everything
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
              </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[160px]">Name</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden lg:table-cell">Phone</TableHead>
                  <TableHead className="hidden md:table-cell w-[140px]">Profession</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden sm:table-cell text-right">Registered On</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registrations && registrations.length > 0 ? (
                  registrations.map((reg) => (
                      <TableRow key={reg._id} className="transition-colors hover:bg-muted/80">
                      <TableCell>
                        <div className="font-medium">{reg.name}</div>
                        <div className="text-sm text-muted-foreground md:hidden">{reg.email}</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{reg.email}</TableCell>
                      <TableCell className="hidden lg:table-cell">{reg.phone_number || 'N/A'}</TableCell>
                      <TableCell className="hidden md:table-cell">{reg.profession || 'N/A'}</TableCell>
                      <TableCell>
                        <div className="font-semibold">
                          {reg.amount && reg.amount > 0 ? 
                            `₹${(reg.amount / 100).toLocaleString('en-IN')}` : 
                            reg.status === 'pending' ? 'Pending Payment' : 
                              reg.status === 'completed' ? '₹2,997' : 'Free Registration'
                          }
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn("capitalize font-semibold text-xs py-1 px-2.5", {
                              'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700': reg.status === 'completed',
                            'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700': reg.status === 'pending',
                          })}
                        >
                          {reg.status}
                        </Badge>
                      </TableCell>
                        <TableCell className="hidden sm:table-cell text-right">
                          {format(new Date(reg.createdAt), 'PPp')}
                        </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No registrations found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {pageCount > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between pt-6 gap-4">
              <div className="text-sm text-muted-foreground">
                Showing page <strong>{currentPage}</strong> of <strong>{pageCount}</strong>
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#" 
                      onClick={handlePreviousPage}
                      className={cn(currentPage === 1 && 'pointer-events-none opacity-50')}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={handleNextPage}
                      className={cn(currentPage === pageCount && 'pointer-events-none opacity-50')}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default AdminRegistrationsPage;
