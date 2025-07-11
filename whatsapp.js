// whatsapp.js
const { default: makeWASocket, useSingleFileAuthState } = require("@adiwajshing/baileys");
const { Boom } = require("@hapi/boom");
const fs = require("fs");

const { state, saveState } = useSingleFileAuthState("./auth.json");

async function connectToWhatsApp() {
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
  });

  sock.ev.on("creds.update", saveState);

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const sender = msg.key.remoteJid;
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text;

    console.log("📨 Message:", text);

    if (text.toLowerCase().includes("hello")) {
      await sock.sendMessage(sender, { text: "Yo! This is OLAMYKxVBot in savage mode 🔥" });
    }
  });
}

module.exports = { connectToWhatsApp };
