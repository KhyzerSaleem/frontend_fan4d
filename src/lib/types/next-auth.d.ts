/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {

    /**
 * The shape of the user object returned in the OAuth providers' `profile` callback,
 * or the second parameter of the `session` callback, when using a database.
 */
    interface User extends DatabaseFields {
        token:string
        name: string,
        email: string,
        country_code: number,
        phone: number,
        image: string,
        email_verified_at: string,
        platform: string,
        login_code: number,
        points: number,
        gender: string,
        date_of_birth: number,
        value_added_certificate: string,
        value_added_certificate_file: string,
        company_name: string,
        job_name: string,
        refer_code: number,
        city_id: string,
        manual_deleted: number,
        is_active: number,
        age: number
    }

    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface Session extends Omit<User , "token" > {

    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface JWT extends User {

    }
}