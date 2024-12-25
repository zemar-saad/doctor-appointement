import React,{useState} from 'react';
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
import { updateAppointementsRoute } from '@/app/_utils/GlobalApi';


function RejectAppointement({ appointement }) {
    const [rejectionReason, setRejectionReason] = useState('');


    const handleSubmit = async () => {
        const appointementId = appointement._id 
    
        try {
          const response = await axios.patch(`${updateAppointementsRoute}/${appointementId}`,{
            status: 'rejected',
            rejectionReason:rejectionReason
    
          })
            if(response.status=true) {
            alert('appointement rejected successfully!');
            window.location.reload()
          } else {
            alert('Failed to reject appointement. Please try again.')
          }
            
        } catch (error) {
          console.error('Error rejecting appointment:', error);
        }
      };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="inline-block rounded bg-transparent px-4 py-2 text-xs font-medium border border-red-500 text-red-500">
           Reject
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently reject this appointement.
          </AlertDialogDescription>
          <div className='mt-5'>
            <label htmlFor="rejectionReason" className='block text-sm font-medium text-gray-700'>Rejection Reason (optional)</label>
            <textarea
              id="Rejection Reason"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
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

export default RejectAppointement;
