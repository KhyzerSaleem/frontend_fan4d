import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JSON_HEADER } from "./lib/constants/api.constant";

export const authOptions: NextAuthOptions = {

    pages: {
        signIn: '/auth/login',
        signOut: '/auth/login',
        error: '/auth/login'
    },

    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                
                // تحقق من أن credentials ليس undefined
                if (!credentials || !credentials.email || !credentials.password) {
                    throw new Error("Email or password is missing.");
                }


                const baseUrl = process.env.NEXT_PUBLIC_API + '/auth/login';

                // استخدام FormData بدلاً من JSON.stringify
                const formData = new FormData();
                formData.append('email', credentials.email);
                formData.append('password', credentials.password);

                const response = await fetch(baseUrl, {
                    method: 'POST',
                    cache: 'no-store',
                    body: formData, // إرسال FormData في الـ body
                    headers: {
                        ...JSON_HEADER
                    }
                });

                const payload = await response.json();



                // return the user if login was successful
                if (payload.status === 200) {
                    return {
                        id: payload.data.id ,
                        token: payload?.data?.token,
                        ...payload?.data?.user_data
                    }
                }

                // Otherwies, throw the error returned form backend
                throw new Error(payload.message)

            }
        })
    ],

    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.token = user.token
                token.name = user.name
                token.email = user.email
                token.country_code = user.country_code
                token.image = user.image
                token.points = user.points
                token.gender = user.gender
                token.date_of_birth = user.date_of_birth
                token.city_id = user.city_id
                token.is_active = user.is_active
                token.age = user.age
            }


            // كل الداتا دي اتحفظت في ال توكن 
            return token
        },

        session: ({ session, token }) => {
            session.name = token.name || ''
            session.email = token.email || ''
            session.country_code = token.country_code
            session.image = token.image
            session.points = token.points
            session.gender = token.gender
            session.date_of_birth = token.date_of_birth
            session.city_id = token.city_id
            session.is_active = token.is_active
            session.age = token.age
            // حفظنا كل الداتا في السيشن ماعدا ال توكن

            return session
        }
    }

}