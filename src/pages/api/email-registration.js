import clientPromise from '../../../libs/mongodb';

/**
 * Handles HTTP requests to register an email for an event.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} The HTTP response object with a status code and a JSON message.
 */
export default async function handler(req, res) {
    const { method } = req;

    try {
        const client = await clientPromise;
        const db = client.db("eventsapp");


        // Check if the database exists by listing collections
        const collections = await db.listCollections().toArray();
        const collectionNames = collections.map(collection => collection.name);

        if (!collectionNames.includes("all_events")) {
            console.error("Could not find the database collection");

            return res.status(500).json({
                message: 'Could not find the database collection',
            });
        }


        if (method === 'POST') {
            const { email, eventId } = req.body;

            // Validate email format
            if (!email | !email.includes('@')) {
                res.status(422).json({ message: 'Invalid email address' });
            }

            // Search in db
            const collection = await db.collection("all_events");
            
            // Check if email already exists
            let emailInEvent = await collection.findOne( {title: "EdTech World Summit 2022", emails_registered: {$in: [email]}} );
            if (emailInEvent) {
                res.status(409).json({ message: 'This email has already been registered' });
                return
            }

            // Add email to db
            collection.updateOne( {id: eventId}, { $push: { emails_registered: email } } )

            res.status(201).json({
                    message: `You have been registered successfully with the email: ${email} for the event: ${eventId}`,
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}