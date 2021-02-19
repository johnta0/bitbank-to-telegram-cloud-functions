import type { HttpFunction, EventFunction } from '@google-cloud/functions-framework/build/src/functions';
import * as bitbank from 'node-bitbankcc';
import TelegramBot = require('node-telegram-bot-api');

const getPrice = async (pair: string): Promise<string> => {
  const apiConf: bitbank.ApiConfig = {
    endPoint: 'https://public.bitbank.cc',
    keepAlive: true,
    timeout: 3000,
  };
  const api = new bitbank.PublicApi(apiConf);

  try {
    const ticker = await api.getTicker({ pair: pair });
    const ltp = ticker.data.last;
    if (!ltp) {
      throw Error('Last price is null.');
    }
    return ltp;
  } catch (e) {
    throw Error(e);
  }
};

const sendMessageToTelegram = (text: string): void => {
  const telegramBotToken = process.env.TELEGRAM_CRYPTO_PRICE_BOT_TOKEN;
  if (!telegramBotToken) throw new Error('Bot token must be provided.');
  const bot = new TelegramBot(telegramBotToken, { polling: true });
  const CHAT_ID = 698998391;
  bot.sendMessage(CHAT_ID, text);
}

export const getMonaCoinPriceJob = async (message, context) => {
  const monaLtp = await getPrice('mona_jpy');
  sendMessageToTelegram(`モナコインの価格は ${monaLtp} です`);
}


