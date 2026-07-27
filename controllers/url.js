import { redirect } from "react-router-dom";
import { URL } from "../models/urls";
import shortid from "shortid";
import { messageLink } from "discord.js";

export async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return message.reply({ content: "url is required" });
  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return message.reply({ content: shortID });
}
