import { NextApiResponse, NextApiRequest } from "next";
import axios from "axios";

const chart = async (req: NextApiRequest, res: NextApiResponse) => {
  const coinId = req.query.coinId;

  if (!coinId || typeof coinId !== "string") {
    res.status(400).json({ error: "Invalid coinId" });
    return;
  }

  try {
    const { data } = await axios.get(
      `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
};

export default chart;
