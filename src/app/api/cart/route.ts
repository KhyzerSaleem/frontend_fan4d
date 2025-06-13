import { JSON_HEADER } from "@/lib/constants/api.constant";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


export async function GET( req: NextRequest ) {

    const locale = req.cookies.get('NEXT_LOCALE')?.value || "ar"
    
    const token = await getToken({ req })
   
    
    const response = await fetch(process.env.NEXT_PUBLIC_API + '/cart' , {
        method:"GET" , 
        headers: {
            ...JSON_HEADER, 
            lang : locale, 
            Authorization: `Bearer ${token?.token}`,
        }
    })


    const payload = await response.json();
    return NextResponse.json(payload);
    
}