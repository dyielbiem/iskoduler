namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    MONGO_URI: string;
    SECRET: string;
    CLOUD_NAME: string;
    CLOUD_API_KEY: string;
    CLOUD_API_SECRET: string;
    FRONTEND: string;
  }
}
