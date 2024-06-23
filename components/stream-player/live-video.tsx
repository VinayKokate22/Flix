"use client";

import { Participant, Track } from "livekit-client";
import { useEffect, useRef, useState } from "react";
import { useTracks } from "@livekit/components-react";
import { FullScreenControl } from "./fullscreen-control";
import { Fullscreen } from "lucide-react";
import { useEventListener } from "usehooks-ts";
import { VolumeControl } from "./volume-control";

interface OffineVideoProps {
  participants: Participant;
}

export const LiveVideo = ({ participants }: OffineVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isFullScreen, setFullScreen] = useState(false);
  const [volume, setvolume] = useState(0);

  const onVolumeChange = (value: number) => {
    setvolume(+value);
    if (videoRef?.current) {
      videoRef.current.muted = value === 0;
      videoRef.current.volume = +value * 0.01;
    }
  };

  const toggleMute = () => {
    const isMuted = volume === 0;

    setvolume(isMuted ? 50 : 0);

    if (videoRef?.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? 0.5 : 0;
    }
  };
  useEffect(() => {
    onVolumeChange(0);
  }, []);
  const toggleFullscreen = () => {
    if (isFullScreen) {
      document.exitFullscreen;
      //   setFullScreen(false);
    } else if (wrapperRef?.current) {
      wrapperRef.current.requestFullscreen();
      //   setFullScreen(true);
    }
  };

  const handleFullscreenChange = () => {
    const isCurrentlyFullscreen = document.fullscreenElement !== null;
    setFullScreen(isCurrentlyFullscreen);
  };

  useEventListener("fullscreenchange", handleFullscreenChange, wrapperRef);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participants.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });
  return (
    <div ref={wrapperRef} className="relative h-full flex">
      <video ref={videoRef} width="100%" />
      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
        <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
          <VolumeControl
            onChange={onVolumeChange}
            value={volume}
            onToggle={toggleMute}
          />
          <FullScreenControl
            isFullScreen={isFullScreen}
            onToggle={toggleFullscreen}
          />
        </div>
      </div>
    </div>
  );
};
