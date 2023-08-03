import path from 'path';
import fs from 'fs';


function buildPath() {
    const filePath = '/tmp/data.json';  // Path for Vercel temporary storage

    if (fs.existsSync(filePath)) {
        console.log(`${filePath} exists`);
        return filePath;
    } else {
        console.log(`${filePath} does not exist`);
        const oldFilePath = path.join(process.cwd(), 'tmp', 'data.json');
        console.log(`Returning new file path: ${oldFilePath}`);
        return oldFilePath;
    }
}

function extractData(filePath) {
    const jsonData = fs.readFileSync(filePath);
    const data = JSON.parse(jsonData);
    return data;
}


export default function handler(req, res) {
    const { method } = req;

    const filePath = buildPath();
    const { events_categories, allEvents } = extractData(filePath);

    if (!allEvents) {
        return res.status(404).json({
            status: 404,
            message: 'Events data not found',
        });
    }

    if (method === 'POST') {
        const { email, eventId } = req.body;

        if (!email | !email.includes('@')) {
            res.status(422).json({ message: 'Invalid email address' });
        }

        const newAllEvents = allEvents.map((ev) => {
            if (ev.id === eventId) {
                if (ev.emails_registered.includes(email)) {
                    res.status(409).json({ message: 'This email has already been registered' });
                    return ev;
                }
                return {
                    ...ev,
                    emails_registered: [...ev.emails_registered, email],
                };
            }
            return ev;
        });

        fs.writeFileSync(filePath, JSON.stringify({ events_categories, allEvents: newAllEvents }));

        res.status(201).json({
                message: `You have been registered successfully with the email: ${email} for the event: ${eventId}`,
            });
    }
}