// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Message } from "@ui/typings";

import type { NextApiRequest, NextApiResponse } from "next";
import * as admin from "firebase-admin";
import { adminDb } from "@ui/utils/firebase-admin/firebasAdmin";
import query from "@ui/utils/Query/queryApi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { prompt, chatId, model, session } = req.body;

    if (!prompt) {
      res.status(400).json({ answer: "please provide a prompt" });
    }
    if (!chatId) {
      res.status(400).json({ answer: "please provide a valid ID" });
    }

    const response = await query(prompt, chatId, model);
    const message: Message = {
      text: response || "ChatGPT was unable to find a response for that.",
      createdAt: admin.firestore.Timestamp.now(),
      user: {
        _id: "ChatGPT",
        name: "ChatGPT",
        avatar:
          "https://www.ingame.de/bilder/2022/12/12/91971562/30486973-das-openai-logo-vor-einem-gruenen-hintergrund-2pmeVfTxOl70.jpg",
      },
    };
    await adminDb
      .collection("users")
      .doc(session?.user?.email)
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .add(message);

    res.status(200).json({ answer: message.text });
  } catch (error) {
    res.status(503).json({ error });
  }
}
