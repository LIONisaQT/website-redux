import "./Creator.scss";
import { Dispatch, SetStateAction, useRef } from "react";
import { Paddler } from "../../types";

interface CreatorProps {
  rosterState: [Paddler[], Dispatch<SetStateAction<Paddler[]>>];
}

export default function Creator({ rosterState }: CreatorProps) {
  const [roster, setRoster] = rosterState;
  const nameInput = useRef<HTMLInputElement | null>(null);
  const weightInput = useRef<HTMLInputElement | null>(null);
  const sideSelect = useRef<HTMLSelectElement | null>(null);

  const handleCreate = () => {
    if (!nameInput.current || !weightInput.current || !sideSelect.current)
      return;

    if (roster.find((p) => p.name === nameInput.current?.value)) {
      alert("Paddler with this name already exists!");
      return;
    }

    const newPaddler: Paddler = {
      name: nameInput.current.value || "New Paddler",
      weight: Number(weightInput.current.value) || 0,
      side: (sideSelect.current.value as Paddler["side"]) || "both",
    };

    setRoster((prev) => [...prev, newPaddler]);
    nameInput.current.value = "";
    weightInput.current.value = "";
    sideSelect.current.value = "both";
  };

  return (
    <section className="creator-container">
      <h2>Create Paddler</h2>
      <div className="main">
        <div>
          <label htmlFor="paddler-name">Name:</label>
          <input type="text" id="paddler-name" ref={nameInput} />
        </div>
        <div>
          <label htmlFor="paddler-weight">Enter weight:</label>
          <input type="number" id="paddler-weight" ref={weightInput} />
        </div>
      </div>
      <div>
        <label htmlFor="paddler-side">Choose a side:</label>
        <select id="paddler-side" ref={sideSelect}>
          <option value="both">Both</option>
          <option value="left">Left</option>
          <option value="right">Right</option>
        </select>
      </div>
      <button id="create-paddler" onClick={handleCreate}>
        Create
      </button>
    </section>
  );
}
