import clientPromise from "../../../libs/mongodb"

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("eventsapp");

        const events = await db
            .collection("all_events")
            .find({})
            .limit(10)
            .toArray();

        res.status(200).json({ events: events })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}
