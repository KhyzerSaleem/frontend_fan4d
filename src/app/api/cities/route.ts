import { JSON_HEADER } from "@/lib/constants/api.constant";
import { NextRequest, NextResponse } from "next/server";


export async function GET( req: NextRequest ) {

    const locale = req.cookies.get('NEXT_LOCALE')?.value || "ar"
    
  
    
    const response = await fetch(process.env.NEXT_PUBLIC_API + '/helpers/cities' , {
        method:"GET" , 
        headers: {
            ...JSON_HEADER, 
            lang : locale
        }
    })


    const payload = await response.json();
    return NextResponse.json(payload);
    
}