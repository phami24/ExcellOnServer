// cart.model.ts
export interface UserClient {
  clientId: number;
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  phone: string;
  cartDetail: {
    cartId: number;
    serviceChargeId: number;
    serviceChargesName: string;
    price: number;
    serviceChargesDescription: string;
  }[];
}
