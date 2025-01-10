import { UserProfile } from "@clerk/nextjs";

function UserProfilePage() {
  return (
    <div className="flex justify-center items-center pt-2 pb-8">
      <UserProfile path="/profile" />
    </div>
  );
}

export default UserProfilePage;
