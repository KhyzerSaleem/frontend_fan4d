

declare type directOrder = {
    name: string
    email: string
    phone: string
    subject: string
    message: string
    files?: FileList | undefined;
}