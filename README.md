# bitbank-to-telegram-cloud-functions

## Deploy

Create a cloud scheduler job and

```
gcloud functions deploy getMonaCoinPriceJob --runtime nodejs10 --trigger-topic TOPIC_NAME --set-env-vars TELEGRAM_CRYPTO_PRICE_BOT_TOKEN=YOUR_TOKEN
```
