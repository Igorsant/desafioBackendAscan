export interface createMessage {
  userId: number;
  subscriptionId?: number;
}

export const SUBSCRIPTION_PURCHASED = "SUBSCRIPTION_PURCHASED";
export const SUBSCRIPTION_CANCELED = "SUBSCRIPTION_CANCELED";
export const SUBSCRIPTION_RESTARTED = "SUBSCRIPTION_RESTARTED";
