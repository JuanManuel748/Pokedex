export interface Company {
    id?: string; // Used as Firestore ID
    name: string;
    address: string;
    phone: string;
    email: string;
}