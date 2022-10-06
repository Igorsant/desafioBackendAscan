# Backend Challenge

## To Run API

```bash
yarn
docker compose up -d
yarn migrate:up
yarn seed:run
yarn start
```

## Make Notifications

```bash
yarn send-notifications
```

## Routes

POST /createSubscription { userId: ? }

PATCH /cancelSubscription { userId: ?, subscriptionId: ? }

PATCH /restartSubscription { userId: ?, subscriptionId: ? }

GET /subscriptionsIds/:userId

GET /usersIds
