export const logInfo = (message: string, ...args: unknown[]) => {
  if (__DEV__) {
    console.log(`[INFO] ${message}`, ...args);
  }
};

export const logError = (message: string, ...args: unknown[]) => {
  console.error(`[ERROR] ${message}`, ...args);
};
