"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMonaCoinPriceJob = void 0;
const bitbank = require("node-bitbankcc");
const TelegramBot = require("node-telegram-bot-api");
const getPrice = async (pair) => {
    const apiConf = {
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
    }
    catch (e) {
        throw Error(e);
    }
};
const sendMessageToTelegram = (text) => {
    const telegramBotToken = process.env.TELEGRAM_CRYPTO_PRICE_BOT_TOKEN;
    if (!telegramBotToken)
        throw new Error('Bot token must be provided.');
    const bot = new TelegramBot(telegramBotToken, { polling: true });
    const CHAT_ID = 698998391;
    bot.sendMessage(CHAT_ID, text);
};
const getMonaCoinPriceJob = async (message, context) => {
    const monaLtp = await getPrice('mona_jpy');
    sendMessageToTelegram(monaLtp);
};
exports.getMonaCoinPriceJob = getMonaCoinPriceJob;
//# sourceMappingURL=index.js.map