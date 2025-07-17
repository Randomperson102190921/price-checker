export default async function handler(req, res) {
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzaas2bjtgGY0379JqHB2vC2aOoPu0DbgrQei9okZn3LSb3G_pole2qDUtbryc-hIAgDA/exec";

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(204).end();
    return;
  }

  try {
    let url = GOOGLE_SCRIPT_URL;

    if (req.method === "GET") {
      const query = new URLSearchParams(req.query).toString();
      url += `?${query}`;
      const response = await fetch(url);
      const data = await response.json();

      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(200).json(data);
    } else if (req.method === "POST") {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });

      const text = await response.text();

      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(200).send(text);
    } else {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (err) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(500).json({ error: "Proxy failed", detail: err.message });
  }
}

