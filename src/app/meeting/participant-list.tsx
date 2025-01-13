"use client";
import {
  ParticipantView,
  StreamVideoParticipant,
} from "@stream-io/video-react-sdk";

export const MyParticipantList = (props: {
  participants: StreamVideoParticipant[];
}) => {
  const { participants } = props;
  return (
    <div className="flex gap-2 max-h-full">
      {participants.map((participant) => (
        <ParticipantView
          className="max-h-full"
          participant={participant}
          key={participant.sessionId}
        />
      ))}
    </div>
  );
};
