"use client";
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
  User,
} from "@stream-io/video-react-sdk";
import Spinner from "@/components/common/spinner";
import { MyParticipantList } from "./participant-list";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { MyFloatingLocalParticipant } from "./floating-local-participants";

const apiKey = "mmhfdzb5evj2";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0FkbWlyYWxfQWNrYmFyIiwidXNlcl9pZCI6IkFkbWlyYWxfQWNrYmFyIiwidmFsaWRpdHlfaW5fc2Vjb25kcyI6NjA0ODAwLCJpYXQiOjE3MzY2ODM5MjcsImV4cCI6MTczNzI4ODcyN30.eemOw6SWbPSVwBfgjL1TD4RNKCGLZYvyXKYsGSBsHV0";
const userId = "Admiral_Ackbar";
const callId = "unFhcALhH55b";

const user: User = {
  id: userId,
  name: "Oliver",
  image: "https://getstream.io/random_svg/?id=oliver&name=Oliver",
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call("default", callId);
call.join({ create: true });

export default function MeetingPage() {
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
