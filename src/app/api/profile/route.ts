import { JSON_HEADER } from "@/lib/constants/api.constant";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


export async function GET( req: NextRequest ) {

    const token = await getToken({ req })
    
    
    const response = await fetch(process.env.NEXT_PUBLIC_API + '/auth/profile' , {
        method:"GET" , 
        headers: {
            ...JSON_HEADER ,
            Authorization: `Bearer ${token?.token}`,
        }
    })


    const payload = await response.json();
    return NextResponse.json(payload);
    
}