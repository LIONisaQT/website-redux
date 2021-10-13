import { useEffect, useState } from "react";
import Card from "../Card";
import { getData } from "../Data";

function GridSection({ section }) {
	const [data, setData] = useState(null);

	useEffect(() => {
		if (!data) {
			getData(section)
				.then(res => {
					setData(res);
				})
				.catch((err) => console.error(err));
		}
	}, [data, section]);

	return (
		<section className='SectionWrapper'>
			<div className='SectionElement'>
				<div className='GridSection'>
					{
						data && data.map(d => <Card key={d.id} title={d.name} role={d.role} tidbit={d.tidbit} imageUrl={d.image} />)
					}
				</div>
			</div>
		</section>
	)
}

export default GridSection;
