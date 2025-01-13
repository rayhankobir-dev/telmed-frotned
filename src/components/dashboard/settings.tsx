import ChangePassword from "../profile/change-password";

export default function Settings() {
  return (
    <section className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p>Your account settings and preferences go here.</p>
      </div>

      <ChangePassword />
    </section>
  );
}
