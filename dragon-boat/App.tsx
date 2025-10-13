import "./App.scss";
import CrewList from "./components/CrewList/CrewList";
import CrewManager from "./components/CrewManager/CrewManager";
import { Crew } from "./types";
import { useCallback, useEffect, useState } from "react";
import { deleteField, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import useTheme from "./hooks/useTheme";

export default function App() {
	const [crews, setCrews] = useState<Crew[]>([]);
	const [activeCrews, setActiveCrews] = useState<Crew[]>([]);
	const [loading, setLoading] = useState(true);
	const { toggleTheme, getThemeSVG } = useTheme();

	useEffect(() => {
		const docRef = doc(db, "dragon-boat", "crews");

		const unsubscribe = onSnapshot(docRef, (snapshot) => {
			const data = snapshot.data() as Record<string, Crew> | undefined;
			if (data) {
				const crewData: Crew[] = Object.values(data);
				setCrews(crewData);
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	const onViewClicked = (crew: Crew) => {
		setActiveCrews((prev) => [...prev, crew]);
	};

	const onDeleteClicked = async (crewId: string) => {
		try {
			const docRef = doc(db, "dragon-boat", "crews");
			await updateDoc(docRef, {
				[crewId]: deleteField(),
			});
		} catch (err) {
			console.error("Error deleting crew:", err);
			alert("Failed to delete crew");
		}
	};

	const onCreateClicked = async (crew?: Crew) => {
		const newCrew: Crew = {
			id: crypto.randomUUID(),
			name: crew ? `Copy of ${crew.name}` : "New crew",
			numRows: crew ? crew.numRows : 10,
			centerMass: crew ? crew.centerMass : 5,
			leftSide: crew ? crew.leftSide : Array(10).fill(null),
			rightSide: crew ? crew.rightSide : Array(10).fill(null),
			drum: crew ? crew.drum : null,
			steer: crew ? crew.steer : null,
			roster: crew ? crew.roster : [],
		};

		const docRef = doc(db, "dragon-boat", "crews");
		try {
			await updateDoc(docRef, {
				[`${newCrew.id}`]: newCrew,
			});
		} catch (err) {
			console.error("Error adding crew:", err);
			throw err;
		}
	};

	const onEditCrew = useCallback(async (updatedCrew: Crew) => {
		const docRef = doc(db, "dragon-boat", "crews");

		try {
			await updateDoc(docRef, {
				[updatedCrew.id]: updatedCrew,
			});
			console.log(`Crew ${updatedCrew.id} updated successfully`);
		} catch (err) {
			console.error("Error editing crew:", err);
			throw err;
		}
	}, []);

	const onCloseClicked = (crew: Crew) => {
		setActiveCrews((prev) => prev.filter((c) => c.id !== crew.id));
	};

	if (loading) {
		return (
			<div>
				<h2>Getting data...</h2>
			</div>
		);
	}

	return (
		<>
			<div className="header">
				<h1 className="title">Dragon Boat Balancer</h1>
				<button className="toggle-theme" onClick={toggleTheme}>
					{getThemeSVG()}
				</button>
			</div>
			{activeCrews.length === 0 && (
				<CrewList
					data={crews}
					onView={onViewClicked}
					onCopy={onCreateClicked}
					onDelete={onDeleteClicked}
					onCreate={onCreateClicked}
				/>
			)}
			<section className="active-crews">
				<>
					{activeCrews.map((crew, i) => (
						<CrewManager
							key={`${i}-${crew.id}`}
							crew={crew}
							onClose={onCloseClicked}
							onEdit={onEditCrew}
						/>
					))}
					{activeCrews.length > 0 && (
						<div className="crew-dropdown-container">
							<label htmlFor="crews">View another crew:</label>
							<select
								name="crews"
								id="crews"
								onChange={(e) => console.log(e.target.value)}
							>
								{crews
									.filter((c) => !activeCrews.includes(c))
									.map((crew, i) => (
										<option key={`${i}-${crew.id}`} value={crew.id}>
											{crew.name}
										</option>
									))}
							</select>
						</div>
					)}
				</>
			</section>
		</>
	);
}
