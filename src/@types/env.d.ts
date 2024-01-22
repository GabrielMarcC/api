declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      URI: string;
      JWT_SECRET: string;
    }
  }
}

export {};
