import axios from "axios";

axios.defaults.baseURL = "http://localhost:2000";

const main = async () => {
  try {
    const usersIds = await axios.get("/usersIds");

    for (let userId of usersIds.data) {
      await axios.post("/createSubscription", {
        userId,
      });
    }
    for (let i = 1; i <= 20; i++) {
      const subscriptionsIds = await axios.get(`/subscriptionsIds/${i}`);
      await axios.patch("/cancelSubscription", {
        userId: usersIds.data[i],
        subscriptionId: subscriptionsIds.data[0],
      });
    }
  } catch (err) {
    console.error(err);
  }
};

main();
