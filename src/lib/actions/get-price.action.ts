'use server';

const BASE_URL = process.env.NEXT_PUBLIC_API;


export const getpriceAction = async (formData: FormData) => {
    // console.log('server actions invoked');

    // Create a FormData object

    // Send the request
    const response = await fetch(BASE_URL + '/get-price', {
        method: "POST" ,
        body: formData ,
    });

    const payload = await response.json();
    
    return payload;
};

