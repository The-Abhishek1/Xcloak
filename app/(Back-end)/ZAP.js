import dotenv from "dotenv"
import ZapClient  from "zaproxy"

dotenv.config()


const zapOptions = {
  apiKey: "",
  proxy: {
    host: '127.0.0.1',
    port: 8080,
  },
};

export const zaproxy = new ZapClient(zapOptions);
