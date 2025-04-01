import { useEffect, useState } from "react";
import "./NameTime.scss";

// TODO: Allow for updating name
function NameTime() {
  const [greeting, setGreeting] = useState<string>("Hello,");
  const [hour, setHour] = useState<string>();
  const [minute, setMinute] = useState<string>();
  const [ampm, setAmpm] = useState<string>();

  const updateTime = () => {
    const date = new Date();

    setGreeting(
      date.getHours() < 12
        ? "おはよう、"
        : date.getHours() > 17
        ? "今晩は、"
        : "こんにちは、"
    );

    setHour(("0" + (date.getHours() % 12)).slice(-2));
    setMinute(("0" + date.getMinutes()).slice(-2));

    const ampm =
      date.getHours() >= 12 && date.getHours() !== 24 ? "午後" : "午前";
    setAmpm(ampm);
  };

  useEffect(() => {
    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="name-time">
      <section className="greetings">
        <div className="greet">{greeting}</div>
        <div className="name">Ryan</div>
      </section>
      <div className="divider" />
      <section className="time">
        <div className="numbers">
          <span className="hour">{hour}</span>
          <span className="separator">:</span>
          <span className="minute">{minute}</span>
        </div>
        <div className="ampm">{ampm}</div>
      </section>
    </div>
  );
}

export default NameTime;
