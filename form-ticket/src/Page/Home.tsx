import { UserFrom } from "./Form";

export function Home() {
  return (
    <>
      <div className="main-container">
        <div className="headings">
          <p className="main-head">
            Your Journey to Coding Conf 2025 Starts Here!
          </p>
          <p className="text-span">
            Secure your spot at next year's biggest coding conference.
          </p>
        </div>
        <UserFrom />
      </div>
    </>
  );
}
