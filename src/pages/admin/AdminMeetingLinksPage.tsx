import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/integrations/mongodb/client';
import type { MeetingLink } from '@/integrations/mongodb/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Loader2, Save, Plus, Edit, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const COURSE_OPTIONS = [
  { value: 'live-workshops', label: 'Sunday Live Workshops – Weekly Business & Digital Training (₹299)' },
  { value: 'premium-combo', label: 'Super Premium Live Courses – Intensive Daily Training (₹24,999)' },
];

interface CreateMeetingLinkData {
  course: string;
  link: string;
  date?: string;
  isActive: boolean;
}

const fetchMeetingLinks = async (): Promise<MeetingLink[]> => {
  const response = await apiClient.get('/meeting-links');
  if (response.data.success) {
    return response.data.data;
  }
  throw new Error('Failed to fetch meeting links');
};

const createMeetingLink = async (linkData: CreateMeetingLinkData): Promise<MeetingLink> => {
  const response = await apiClient.post('/meeting-links', linkData);
  if (response.data.success) {
    return response.data.data;
  }
  throw new Error('Failed to create meeting link');
};

const updateMeetingLink = async ({ id, data }: { id: string; data: Partial<CreateMeetingLinkData> }): Promise<MeetingLink> => {
  const response = await apiClient.put(`/meeting-links/${id}`, data);
  if (response.data.success) {
    return response.data.data;
  }
  throw new Error('Failed to update meeting link');
};

const deleteMeetingLink = async (id: string): Promise<void> => {
  const response = await apiClient.delete(`/meeting-links/${id}`);
  if (!response.data.success) {
    throw new Error('Failed to delete meeting link');
  }
};

export default function AdminMeetingLinksPage() {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<CreateMeetingLinkData>({
    course: '',
    link: '',
    date: '',
    isActive: true
  });

  const queryClient = useQueryClient();

  const { data: meetingLinks, isLoading, error } = useQuery({
    queryKey: ['meetingLinks'],
    queryFn: fetchMeetingLinks,
  });

  const createMutation = useMutation({
    mutationFn: createMeetingLink,
    onSuccess: () => {
      toast.success('Meeting link created successfully');
      queryClient.invalidateQueries({ queryKey: ['meetingLinks'] });
      setIsCreating(false);
      setFormData({ course: '', link: '', date: '', isActive: true });
    },
    onError: (error: Error) => {
      toast.error(`Failed to create meeting link: ${error.message}`);
    }
  });

  const updateMutation = useMutation({
    mutationFn: updateMeetingLink,
    onSuccess: () => {
      toast.success('Meeting link updated successfully');
      queryClient.invalidateQueries({ queryKey: ['meetingLinks'] });
      setIsEditing(null);
    },
    onError: (error: Error) => {
      toast.error(`Failed to update meeting link: ${error.message}`);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMeetingLink,
    onSuccess: () => {
      toast.success('Meeting link deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['meetingLinks'] });
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete meeting link: ${error.message}`);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreating) {
      createMutation.mutate({
        course: formData.course,
        link: formData.link,
        date: formData.date || undefined,
        isActive: formData.isActive
      });
    } else if (isEditing) {
      updateMutation.mutate({
        id: isEditing,
        data: {
          course: formData.course,
          link: formData.link,
          date: formData.date || undefined,
          isActive: formData.isActive
        }
      });
    }
  };

  const startEditing = (link: MeetingLink) => {
    setIsEditing(link._id);
    setFormData({
      course: link.course || '',
      link: link.link,
      date: link.date ? new Date(link.date).toISOString().slice(0, 10) : '',
      isActive: link.isActive
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full py-10">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-destructive/10 border border-destructive/50 text-destructive rounded-lg p-4">
        <p>Error loading meeting links: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Meeting Links Management</h1>
        <Button onClick={() => setIsCreating(true)} disabled={isCreating}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Link
        </Button>
      </div>

      {(isCreating || isEditing) && (
        <Card>
          <CardHeader>
            <CardTitle>{isCreating ? 'Create New Meeting Link' : 'Edit Meeting Link'}</CardTitle>
            <CardDescription>
              Configure meeting links for different courses and events.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="course">Course</Label>
                <select
                  id="course"
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  required
                  className="w-full border rounded px-3 py-2 bg-gray-900 text-white"
                >
                  <option value="" className="text-white bg-gray-900">Select course</option>
                  {COURSE_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value} className="text-white bg-gray-900">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="link">Meeting URL</Label>
                <Input
                  id="link"
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="https://meet.google.com/your-meeting-link"
                  required
                />
              </div>
              <div>
                <Label htmlFor="date">Date (optional)</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="isActive"
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
              <Button type="submit" className="w-full font-bold">
                <Save className="h-4 w-4 mr-2" />
                {isCreating ? 'Create Link' : 'Save Changes'}
              </Button>
              <Button type="button" variant="outline" className="w-full mt-2" onClick={() => { setIsCreating(false); setIsEditing(null); }}>
                Cancel
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>All Meeting Links</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Meeting Link</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Active</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {meetingLinks && meetingLinks.length > 0 ? meetingLinks.map(link => (
                <TableRow key={link._id}>
                  <TableCell>{COURSE_OPTIONS.find(opt => opt.value === link.course)?.label || link.course}</TableCell>
                  <TableCell><a href={link.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{link.link}</a></TableCell>
                  <TableCell>{link.date ? new Date(link.date).toLocaleDateString() : '-'}</TableCell>
                  <TableCell>{link.isActive ? 'Yes' : 'No'}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => startEditing(link)}><Edit className="h-4 w-4" /></Button>
                    <Button size="sm" variant="destructive" onClick={() => deleteMutation.mutate(link._id)}><Trash2 className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">No meeting links found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
