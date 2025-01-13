/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { redirect, useSearchParams } from "next/navigation";
import {
  CallControls,
  CallingState,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  StreamVideoParticipant,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import api from "@/api";
import toast from "react-hot-toast";
import Spinner from "@/components/common/spinner";
import { MyParticipantList } from "./participant-list";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { MyFloatingLocalParticipant } from "./floating-local-participants";
import { useAuth } from "@/context/AuthContext";

const apiKey = String(process.env.NEXT_PUBLIC_STREAM_API_KEY);

export default function MeetingPage() {
  const searchParams = useSearchParams();
  const callId = String(searchParams.get("callId"));

  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to join a meeting");
      redirect("/login");
    }
  }, []);

  useEffect(() => {
    if (!callId) {
      toast.error("Permission denied");
      redirect("/");
    }

    const fetchToken = async () => {
      try {
        const response = await api.post("/appointments/generate-meeting-token");
        const { token } = response.data;

        const meetingUser = {
          id: String(user?._id),
          name: user?.fullName,
          image: "https://getstream.io/random_svg/?id=oliver&name=Oliver",
        };

        const videoClient = new StreamVideoClient({
          apiKey,
          user: meetingUser,
          token,
        });
        const videoCall = videoClient.call("default", callId);

        await videoCall.join({ create: false });

        setClient(videoClient);
        setCall(videoCall);
      } catch (err) {
        console.error("Error fetching token:", err);
        setError("Failed to fetch token. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, [callId, isAuthenticated, user]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#272a30]">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#272a30] text-red-500">
        {error}
      </div>
    );
  }

  if (!client || !call) {
    return null;
  }

  return (
    <main className="w-screen h-screen bg-[#272a30]">
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <MyUILayout />
        </StreamCall>
      </StreamVideo>
    </main>
  );
}

export const MyUILayout = () => {
  const { useCallCallingState, useLocalParticipant, useRemoteParticipants } =
    useCallStateHooks();

  const callingState = useCallCallingState();
  const localParticipant = useLocalParticipant();
  const remoteParticipants = useRemoteParticipants();

  if (callingState !== CallingState.JOINED) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <StreamTheme>
      <MyParticipantList participants={remoteParticipants} />
      <MyFloatingLocalParticipant
        participant={localParticipant as StreamVideoParticipant}
      />
      <SpeakerLayout participantsBarPosition="bottom" />
      <CallControls />
    </StreamTheme>
  );
};
