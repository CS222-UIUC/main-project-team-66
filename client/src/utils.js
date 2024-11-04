import { toast } from 'react-toastify';

// Error popups that appear when issues with registration or login

export const handleSuccess = (msg)=> {
    toast.success(msg, {
        position: 'top-right'
    })
}

export const handleError = (msg)=> {
    toast.error(msg, {
        position: 'top-right'
    })
}
