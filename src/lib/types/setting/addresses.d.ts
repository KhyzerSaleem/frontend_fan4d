

declare type addresses = {
    id: number;
    title: string;
    address: string;
    street: string;
    house_number: string;
    lat: string;
    lng: string;
    city: string;
    city_id: number;
    area: string;
    area_id: number;
    is_default: number;
}


declare type storeFields = {
    title: string;
    city_id: string;
    area_id: string;
    street: string;
    house_number: string; 
    address?: string; 
    lat?: string ;
    lng?: string ;
}