import Link from 'next/link'
import Image from 'next/image'

const AllEvents  = ( { data } ) => {
    return (
        <div className='events-page'>
                {
                    data.map(ev => (
                        <Link className='card' key={ev.id} href={`/events/${ev.id}`} passHref>
                            <Image alt={ev.title} width={300} height={300} src={ev.image} />
                            <h2>{ev.title}</h2>
                        </Link>
                    ))
                }
        </div>
    )
}

export default AllEvents