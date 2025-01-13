import ProfileInfo from "../profile/user-profile";

export function Profile() {
  return (
    <section className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold">Profile</h2>
        <p>Your profile information goes here.</p>
      </div>

      <ProfileInfo />
    </section>
  );
}
