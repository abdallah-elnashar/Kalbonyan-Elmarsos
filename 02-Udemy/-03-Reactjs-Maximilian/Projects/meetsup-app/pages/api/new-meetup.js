import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://abdallahelnashar:69iWqW6Lus3mbw6T@cluster0.lzmxys9.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insert(data);

    console.log(result);

    res.status(201).json({ message: "meetup inserted" });
  }
};

export default handler;
