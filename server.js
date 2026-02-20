const express = require("express");
const cors = require("cors");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const genAI = new GoogleGenerativeAI("YOUR_API_KEY");

app.post("/ask", async (req, res) => {
  const { question } = req.body;

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(
      `You are AutoSage, an AI vehicle assistant. Help diagnose vehicle problems and give maintenance advice.

User Issue: ${question}`
    );

    const response = await result.response;
    res.json({ reply: response.text() });

  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
});

app.listen(3000, () =>
  console.log("✅ AutoSage running at http://localhost:3000")
);
