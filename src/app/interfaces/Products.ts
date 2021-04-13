

export interface ProductIndex {
 id: string; 
 quantity: number ;
}

export interface RawProduct{
    _id:string;
    name?:string;
    description?:string;
    image?:string;
    category?:string;
    comments?:string[];

}
