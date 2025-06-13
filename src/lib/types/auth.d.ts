
declare type User = {
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

} & DatabaseFields


declare interface loginResponse {
    token: string
    user_data: User
}


declare type RegisterFields = {
    name: string,
    email: string,
    password: string,
    phone: string,
    city_id: string,
}

declare type verfiyFields = {
    name: string,
    email: string,
    password: string,
    phone: string,
    city_id: string,
    code: string
}

declare type forgetPasswordFields = {
    phone: string,
}

declare type forgetPasswordVerifyFields = {
    phone: string,
    code: string
}

declare type updatePasswordVerifyFields = {
    phone: string,
    code: string, 
    password: string,
    password_confirmation: string
}