import SingleEvent from '@/components/events/single-event';
import clientPromise from '../../../../libs/mongodb';

const EventPage = ( {data} ) => {
    console.log(data)
    return (
        <SingleEvent data={data}></SingleEvent>
    )
}

export default EventPage;

export async function getStaticPaths() {
    // const data = await import('/tmp/data.json');
    const client = await clientPromise;
    const db = client.db("eventsapp");
    const all_events = await db
        .collection("all_events")
        .find({})
        .limit(10)
        .toArray();

    const allPaths = all_events.map((path) => {
        return {
            params: {
                cat: path.city,
                id: path.id,
            }
        }
    })

    return {
        paths: allPaths,
        fallback: false,
    }
}

export async function getStaticProps(context) {
    console.log(context);
    const id = context.params.id;
    // const { allEvents } = await import('/tmp/data.json');
    const client = await clientPromise;
    const db = client.db("eventsapp");
    let eventData = await db
        .collection("all_events")
        .findOne( {id: id} );

    eventData = JSON.parse(JSON.stringify(eventData))

    // const eventData = allEvents.find(ev => id === ev.id);
    console.log("EVENT DATA")
    console.log(eventData)

    return {
        props: {
            data: eventData,
        },
    }
}