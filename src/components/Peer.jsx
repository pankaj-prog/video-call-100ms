import {
  selectVideoTrackByPeerID,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { useRef, useEffect } from "react";

export default function Peer({ peer }) {
  const videoRef = useRef(null);
  const hmsActions = useHMSActions();
  const videoTrack = useHMSStore(selectVideoTrackByPeerID(peer.id));

  useEffect(() => {
    if (videoRef.current && videoTrack) {
      if (videoTrack.enabled) {
        hmsActions.attachVideo(videoTrack.id, videoRef.current);
      } else {
        hmsActions.detachVideo(videoTrack.id, videoRef.current);
      }
    }
  }, [videoTrack, hmsActions]);

  return (
    <div className="peer">
      <video ref={videoRef} autoPlay muted playsInline />
      <div className="flex-center">
        {peer.name} {peer.isLocal ? "(You)" : ""}
      </div>
    </div>
  );
}
