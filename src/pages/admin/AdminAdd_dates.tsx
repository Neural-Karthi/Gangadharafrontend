import { useState, useEffect } from 'react';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const AdminAdd_dates = () => {
  const [loading, setLoading] = useState(false);
  const [webinars, setWebinars] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    mrp: '',
    Specialprice: '',
  });

  const fetchWebinars = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch('http://82.29.162.228/api/webinar', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) setWebinars(data.data);
    } catch (error) {
      console.error('Error fetching webinars:', error);
    }
  };

  useEffect(() => {
    fetchWebinars();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch('http://localhost:5000/api/webinar/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setFormData({ date: '', startTime: '', endTime: '', mrp: '', Specialprice: '' });
        setShowForm(false);
        fetchWebinars();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error('Error adding webinar:', err);
      alert('Failed to add webinar');
    } finally {
      setLoading(false);
    }
  };

  const currentDateTime = new Date();
  const getEndDateTime = (w) => new Date(`${w.date}T${w.endTime}`);

  const ongoingWebinars = webinars.filter(
    (w) => getEndDateTime(w) >= currentDateTime && !w.isFeatured
  );

  const completedWebinars = webinars.filter((w) => w.isFeatured);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto space-y-6">

        {/* Workshop Form */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Workshops</CardTitle>
                <CardDescription>
                  Manage all your online workshops here
                </CardDescription>
              </div>
              <Button variant="destructive" onClick={() => setShowForm(prev => !prev)}>
                {showForm ? "Close Form" : "ADD New Webinar"}
              </Button>
            </div>
          </CardHeader>

          {showForm && (
            <CardContent>
              <form onSubmit={handleSubmit} className="w-full space-y-4">
                <div>
                  <Label className="block mb-1">Date</Label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full border bg-white text-black border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <Label className="block mb-1">Start Time</Label>
                    <input
                      type="time"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleChange}
                      className="w-full border bg-white text-black border-gray-300 rounded-md p-2"
                      required
                    />
                  </div>
                  <div className="w-1/2">
                    <Label className="block mb-1">End Time</Label>
                    <input
                      type="time"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleChange}
                      className="w-full border bg-white text-black border-gray-300 rounded-md p-2"
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <Label>MRP Amount (₹)</Label>
                    <Input
                      type="number"
                      name="mrp"
                      value={formData.mrp}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="w-1/2">
                    <Label>Special Price Amount (₹)</Label>
                    <Input
                      type="number"
                      name="Specialprice"
                      value={formData.Specialprice}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Submit Workshop
                </Button>
              </form>
            </CardContent>
          )}
        </Card>

         {/* Completed Webinars (Featured Only) */}
        <Card>
          <CardHeader><CardTitle>Ongoing Webinars</CardTitle></CardHeader>
          <CardContent>
            {completedWebinars.length > 0 ? (
              completedWebinars.map((w) => (
                <div key={w._id} className="border p-3 rounded mb-2">
                  <p><strong>Date:</strong> {w.date}</p>
                  <p><strong>Time:</strong> {w.startTime} - {w.endTime}</p>
                  <p><strong>MRP:</strong> ₹{w.mrp}</p>
                  <p><strong>Special Price:</strong> ₹{w.Specialprice}</p>
                </div>
              ))
            ) : <p>No ongoing webinars.</p>}
          </CardContent>
        </Card>

        {/* Ongoing Webinars */}
        <Card>
          <CardHeader><CardTitle>Completed Webinars</CardTitle></CardHeader>
          <CardContent>
            {ongoingWebinars.length > 0 ? (
              ongoingWebinars.map((w) => (
                <div key={w._id} className="border p-3 rounded mb-2">
                  <p><strong>Date:</strong> {w.date}</p>
                  <p><strong>Time:</strong> {w.startTime} - {w.endTime}</p>
                  <p><strong>MRP:</strong> ₹{w.mrp}</p>
                  <p><strong>Special Price:</strong> ₹{w.Specialprice}</p>
                </div>
              ))
            ) : <p>No completed webinars.</p>}
          </CardContent>
        </Card>

       
      </div>
    </div>
  );
};

export default AdminAdd_dates;
