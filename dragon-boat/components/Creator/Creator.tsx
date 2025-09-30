import "./Creator.scss";

export default function Creator() {
  return (
    <section className="creator-container">
      <h2>Create Paddler</h2>
      <div className="main">
        <div>
          <label htmlFor="paddler-name">Name:</label>
          <input type="text" id="paddler-name" />
        </div>
        <div>
          <label htmlFor="paddler-weight">Enter weight:</label>
          <input type="number" id="paddler-weight" />
        </div>
      </div>
      <div>
        <label htmlFor="paddler-side">Choose a side:</label>
        <select id="paddler-side">
          <option value="both">Both</option>
          <option value="left">Left</option>
          <option value="right">Right</option>
        </select>
      </div>
      <button id="create-paddler">Create</button>
    </section>
  );
}
