'use server';

const BASE_URL = process.env.NEXT_PUBLIC_API;

export const registerAction = async (fields: RegisterFields) => {
    

    // إنشاء كائن FormData
    const formData = new FormData();
    Object.keys(fields).forEach(key => {
        formData.append(key, fields[ key as keyof RegisterFields ]);
    });

    // إرسال الطلب
    const response = await fetch(BASE_URL + '/auth/sign_up', {
        method: "POST",
        body: formData,
    });

    // قراءة البيانات من الاستجابة
    const payload = await response.json();

    return payload;
};

export const verifyAction = async (fields: verfiyFields) => {
    

    // إنشاء كائن FormData
    const formData = new FormData();
    Object.keys(fields).forEach(key => {
        formData.append(key, fields[ key as keyof verfiyFields ]);
    });

    // إرسال الطلب
    const response = await fetch(BASE_URL + '/auth/sign_up/verify', {
        method: "POST",
        body: formData,
    });

    // قراءة البيانات من الاستجابة
    const payload = await response.json();

    return payload;
};


export const forgetPasswordAction = async (fields: forgetPasswordFields) => {
 

    // إنشاء كائن FormData
    const formData = new FormData();
    Object.keys(fields).forEach(key => {
        formData.append(key, fields[ key as keyof forgetPasswordFields ]);
    });

    // إرسال الطلب
    const response = await fetch(BASE_URL + '/auth/forget_password', {
        method: "POST",
        body: formData,
    });

    // قراءة البيانات من الاستجابة
    const payload = await response.json();

    return payload;
};


export const forgetPasswordVerifyAction = async (fields: forgetPasswordVerifyFields) => {

    // إنشاء كائن FormData
    const formData = new FormData();
    Object.keys(fields).forEach(key => {
        formData.append(key, fields[ key as keyof forgetPasswordVerifyFields ]);
    });

    // إرسال الطلب
    const response = await fetch(BASE_URL + '/auth/forget_password/verify', {
        method: "POST",
        body: formData,
    });

    // قراءة البيانات من الاستجابة
    const payload = await response.json();

    return payload;
};


export const updatePasswordVerifyAction = async (fields: updatePasswordVerifyFields) => {

    // إنشاء كائن FormData
    const formData = new FormData();
    Object.keys(fields).forEach(key => {
        formData.append(key, fields[ key as keyof updatePasswordVerifyFields ]);
    });

    // إرسال الطلب
    const response = await fetch(BASE_URL + '/auth/forget_password/update_password', {
        method: "POST",
        body: formData,
    });

    // قراءة البيانات من الاستجابة
    const payload = await response.json();

    

    return payload;
};
