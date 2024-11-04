const { toast } = require('react-toastify');

// Error popups that appear when issues with registration or login

const handleSuccess = (msg)=> {
    toast.success(msg, {
        position: 'top-right'
    })
}

const handleError = (msg)=> {
    toast.error(msg, {
        position: 'top-right'
    })
}

module.exports = { handleSuccess, handleError };