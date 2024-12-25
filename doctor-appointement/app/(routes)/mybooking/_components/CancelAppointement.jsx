import React from 'react';
import axios from 'axios';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { deleteappointementRoute } from '@/app/_utils/GlobalApi';


function CancelAppointement({ appointement }) {
    
  const handleSubmit = async () => {
    const appointementId = appointement._id
    try {
      await axios.delete(`${deleteappointementRoute}/${appointementId}`);
      
      // Handle successful deletion (e.g., show a success message or refresh data)
      alert('appointement canceled successfully.');
      window.location.reload(); // Refresh the page or update the state to reflect changes
    } catch (error) {
      // Handle error (e.g., show an error message)
      alert('Failed to cancel appointement. Please try again.');
      console.error("Error canceling appointement:", error.message);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="inline-block rounded bg-transparent   px-4 py-2 text-xs font-medium border border-red-500 text-red-500">
          Cancel
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this appointement.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>
            continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CancelAppointement;
