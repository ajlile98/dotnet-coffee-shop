
export type MenuItem = {
    id: string;
    name: string;
    price: number;
    photo?: Photo;
}

export type Photo = {
    id: string;
    url: string;
    publicId?: string;
}