export interface Product{
    id: number,
    name: string,
    description: string,
    price: number,
    quantity: number,
    created: Date,
    modified: Date,
    modifiedBy: string,
    fileName: string,
    contentType: string,
    data: any
}