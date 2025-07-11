
import React from 'react';
import { FileText } from 'lucide-react';

export default function AdminDocumentsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 animate-fade-in-up">
      <FileText className="h-24 w-24 text-muted-foreground/50 mb-6" strokeWidth={1} />
      <h1 className="text-3xl font-bold mb-2">Document Management</h1>
      <p className="text-lg text-muted-foreground">This feature is coming soon.</p>
      <p className="text-sm text-muted-foreground mt-1">Stay tuned for updates!</p>
    </div>
  );
}
