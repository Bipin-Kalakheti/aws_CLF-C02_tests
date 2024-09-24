import pool from "../../lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "SELECT * FROM questions ORDER BY RANDOM() LIMIT 1"
      );
      const question = result.rows[0];
      client.release();

      if (question) {
        res.status(200).json(question);
      } else {
        res.status(404).json({ message: "No questions found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching question", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
