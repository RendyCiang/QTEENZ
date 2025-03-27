import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from './useAuth';
import { useMutation } from '@tanstack/react-query';

const useRegisterVendor = () => {
    const navigate = useNavigate();
    const {login} = useAuth();
    
    const registerVendorMutation = useMutation({
        mutationFn: async(credentials: )
    }) 
  return (
    <div>useRegisterVendor</div>
  )
}

export default useRegisterVendor