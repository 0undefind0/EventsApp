import AllEvents from '@/components/events/events-page';
import clientPromise from "../../../libs/mongodb";

const EventsPage = ( {data} ) => {
    return <AllEvents  data={data} />
};

export default EventsPage;


export async function getStaticProps() {
    // const { events_categories } = await import('/tmp/data.json');
    const client = await clientPromise;
    const db = client.db("eventsapp");

    const events_categories = await db
        .collection("events_categories")
        .find({})
        .limit(10)
        .toArray();


    // return {
    //     props: {
    //         data: events_categories,
    //     },
    // }
    return {
        props: {
            data: JSON.parse(JSON.stringify(events_categories)),
        },
    }
}