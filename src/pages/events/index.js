import AllEvents from '@/components/events/events-page';

const EventsPage = ( {data} ) => {
    return <AllEvents  data={data} />
};

export default EventsPage;


export async function getStaticProps() {
    const { events_categories } = await import('/tmp/data.json');

    return {
        props: {
            data: events_categories,
        },
    }
}