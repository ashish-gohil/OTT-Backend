import { createClient, RedisClientType } from "redis";

const redisClient: RedisClientType = createClient();

redisClient.on("error", (err) => console.error("Redis Error:", err));

(async () => {
  try {
    await redisClient.connect();
    console.log("Connected to Redis");
  } catch (err) {
    console.error("Error connecting to Redis:", err);
  }
})();

export const cache = async (
  key: string,
  dataFunc: () => Promise<any>,
  expiry = 3600
): Promise<any> => {
  try {
    const cached = await redisClient.get(key);
    if (cached) {
      console.log("Cache Hit");
      return JSON.parse(cached);
    }

    console.log("Cache Miss");
    const data = await dataFunc();
    await redisClient.set(key, JSON.stringify(data), { EX: expiry });
    return data;
  } catch (err) {
    console.error("Redis Cache Error:", err);
    throw err;
  }
};
