import CatEvent from '@/components/events/catEvent'
import clientPromise from "../../../../libs/mongodb"

const EventsCatPage = ( {data, pageName} ) => {
    return (
        <CatEvent data={data} pageName={pageName} />
    )
}

export default EventsCatPage;


export async function getStaticPaths() {
    // const { events_categories } = await import('/tmp/data.json');
    const client = await clientPromise;
    const db = client.db("eventsapp");
    const events_categories = await db
        .collection("events_categories")
        .find({})
        .limit(10)
        .toArray();

    // const allPaths = events_categories.map(ev => {
    //     return {
    //         params: {
    //             cat: ev.id.toString(),
    //         }
    //     }
    // });

    const allPaths = events_categories.map(ev => {
        return {
            params: {
                cat: ev.id.toString(),
            }
        }
    });
    console.log(`ALLPATHS: ${JSON.stringify(allPaths)}`);

    return {
        paths: allPaths,
        fallback: false,
    }
}

export async function getStaticProps(context) {
    console.log(context);
    const id = context?.params.cat;
    // const { allEvents } = await import('/tmp/data.json');
    const client = await clientPromise;
    const db = client.db("eventsapp");
    let all_events = await db
        .collection("all_events")
        .find({})
        .limit(10)
        .toArray();
    
    all_events = JSON.parse(JSON.stringify(all_events));

    const data = all_events.filter(ev => ev.city === id)
    console.log(data);

    return {
        props: { data, pageName: id }
    }
}