import { useEffect, useState } from "react";
import "./NameTime.scss";

function NameTime() {
  const [time, setTime] = useState<string>();

  const updateTime = () => {
    const date = new Date();
    const hour = date.getHours() % 12;
    const minute = date.getMinutes();
    setTime(`${hour}:${minute}`);
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
        <div className="greet">Hello,</div>
        <div className="name">Ryan</div>
      </section>
      <div className="divider" />
      <section className="time">
        <div className="numbers">{time}</div>
        <div className="ampm">PM</div>
      </section>
    </div>
  );
}

export default NameTime;
