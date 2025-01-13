"use client";
import ChangePasswordForm from "@/components/profile/change-password";
import ProfileInfo from "@/components/profile/user-profile";
import React from "react";

function ProfilePage() {
  return (
    <main className="space-y-3">
      <ProfileInfo />
      <ChangePasswordForm />
    </main>
  );
}

export default ProfilePage;
