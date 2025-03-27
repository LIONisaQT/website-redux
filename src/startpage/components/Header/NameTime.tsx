import "./NameTime.scss";

function NameTime() {
  return (
    <div className="name-time">
      <section className="greetings">
        <div className="greet">Hello,</div>
        <div className="name">Ryan</div>
      </section>
      <div className="divider">|</div>
      <section className="time">
        <div className="numbers">12:59</div>
        <div className="ampm">pm</div>
      </section>
    </div>
  );
}

export default NameTime;
