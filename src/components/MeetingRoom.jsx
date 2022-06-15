import React from "react";
import {
  selectPeers,
  useHMSStore,
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
  useHMSActions,
} from "@100mslive/react-sdk";
import { Peer, Timer } from "./";
import useBackListener from "../utils/useBackListener";

export default function MeetingRoom() {
  const peers = useHMSStore(selectPeers);
  const videoEnabled = useHMSStore(selectIsLocalVideoEnabled);
  const audioEnabled = useHMSStore(selectIsLocalAudioEnabled);
  const hmsActions = useHMSActions();

  useBackListener(() => hmsActions.leave());

  const toggleAudio = () => {
    hmsActions.setLocalAudioEnabled(!audioEnabled);
  };

  const toggleVideo = () => {
    hmsActions.setLocalVideoEnabled(!videoEnabled);
  };

  return (
    <div className="meeting-room-wrapper">
      <h1 className="flex-center meeting-room-header">
        Meeting Room : <Timer />
      </h1>
      <div className="peers-wrapper flex-center">
        {peers.map((peer) => (
          <Peer key={peer.id} peer={peer} />
        ))}
      </div>

      <div className="controls-wrapper flex-center">
        <button onClick={toggleAudio}>
          {audioEnabled ? "Mute" : "Unmute"}
        </button>
        <button onClick={toggleVideo}>
          {videoEnabled ? "Disable Video" : "Enable Video"}
        </button>
        <button title="Leave Room" onClick={() => hmsActions.leave()}>
          Leave
        </button>
      </div>
    </div>
  );
}
