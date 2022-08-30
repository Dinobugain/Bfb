import M from 'materialize-css'
let useToast = {
    error: async(message) =>{
        console.log(message)
        M.toast({html: message, classes: 'rounded'});
    }
}

export default useToast