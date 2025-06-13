'use server';

const BASE_URL = process.env.NEXT_PUBLIC_API;


export const directOrderAction = async (formData: FormData) => {
  
    // Create a FormData object

    // Send the request
    const response = await fetch(BASE_URL + '/direct-order', {
        method: "POST" ,
        body: formData ,
    });

    const payload = await response.json();
    
    
    return payload;
};

