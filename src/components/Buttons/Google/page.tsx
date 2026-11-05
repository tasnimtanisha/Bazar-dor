import { signIn } from '@/lib/auth-client';
import React from 'react';
import { FcGoogle } from 'react-icons/fc'; 

const GoogleButton = () => {
  const handleGoogleSignIn = async() => {
    const data = await signIn.social({
      provider: 'google',
    })
    // Implement Google sign-in logic here
    try {
      console.log('Google sign-in clicked',data);
    } catch (error) {
      console.error('Error occurred during Google sign-in:', error);  
    }
  };

  return (
    <button onClick={handleGoogleSignIn} className="flex items-center justify-center gap-2 w-full py-2.5 px-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200 text-sm">
      <FcGoogle className="text-xl shrink-0" />
      <span className="whitespace-nowrap text-gray-800">
        <span className="font-bold">Google</span> দিয়ে চালিয়ে যান
      </span>
    </button>
  );
};

export default GoogleButton;