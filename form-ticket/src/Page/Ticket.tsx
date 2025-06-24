import { useForm } from "../Context/formContext";

export function Ticket() {
  const { userValues } = useForm();
  return (
    <>
      <div className="ticket-container">
        <h2>
          Congrats, <span className="ticket-name">{userValues.full_name}</span>!
          <br></br>Your ticket is ready.
        </h2>
        <p className="ticket-email-msg">
          We've emailed your ticket to{" "}
          <span className="ticket-email">{userValues.email}</span> and will send
          updates in the run up to the event.
        </p>
        <div className="ticket-card">
          <img src="/pattern-ticket.svg" className="ticket-bg" />
          <div className="ticket-content">
            <div className="top-section">
              <div className="ticket-head">
                <img className="ticket-logo" src="/logo-mark.svg" />
                <span className="ticket-title">Coding Conf</span>
              </div>
              <p className="ticket-date">Jan 31, 2025 / Austin, TX</p>
            </div>
            <div className="bottom-section">
              <img
                className="ticket-avatar"
                src={
                  userValues.avatar_url
                    ? userValues.avatar_url
                    : "/image-avatar.jpg"
                }
              />
              <div className="user-info">
                <h4>{userValues.full_name}</h4>
                <div className="github-section">
                  <img className="github-logo" />
                  <div className="github-name">
                    <h4>{userValues.github_name}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
