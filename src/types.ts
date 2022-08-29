export interface createMessage {
  userId: number;
  subscriptionId: number;
}

export const subscription_purchased = "SUBSCRIPTION_PURCHASED";
export const subscription_canceled = "SUBSCRIPTION_CANCELED";
export const subscription_restarted = "SUBSCRIPTION_RESTARTED";
