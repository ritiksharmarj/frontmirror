import * as React from "react";
import {
  ChevronsUpDownIcon,
  RotateCwIcon,
  SettingsIcon,
  VideoIcon,
} from "lucide-react";
import unblockCamera from "@/assets/camera/unblock-the-camera.png";
import useCameraDefault from "@/assets/camera/allow-sites-to-use-camera-default.png";
import useCamera from "@/assets/camera/allow-sites-to-use-camera.png";

export default function Camera() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [devices, setDevices] = React.useState<MediaDeviceInfo[]>([]);
  const [selectedDevice, setSelectedDevice] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: selectedDevice ? { exact: selectedDevice } : undefined,
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            aspectRatio: 1.7777777778,
          },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          const devices = await navigator.mediaDevices.enumerateDevices();
          setDevices(devices.filter((d) => d.kind === "videoinput"));
        }
      } catch (error) {
        setError(`Camera access denied: ${error}`);
      }
    };

    initCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [selectedDevice]);

  return (
    <>
      {!error ? (
        <div id="fm-app__camera-section">
          <div id="fm-app__camera">
            <video id="fm-app__camera-stream" ref={videoRef} autoPlay muted />

            <div id="fm-app__camera-select-section">
              <div id="fm-app__camera-select">
                <VideoIcon size={20} id="fm-app__camera-select-svg-first" />
                <select
                  id="fm-app__camera-source"
                  value={selectedDevice}
                  onChange={(e) => setSelectedDevice(e.target.value)}
                >
                  {devices.map((device) => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label || "Unknown Camera"}
                    </option>
                  ))}
                </select>
                <ChevronsUpDownIcon
                  size={20}
                  id="fm-app__camera-select-svg-last"
                />
              </div>
              <span>Choose a different camera</span>
            </div>
          </div>

          <div id="fm-app__camera-info">
            <span>
              Press Ctrl+Shift+O (Command+Shift+O on a Mac) to open the Front
              Mirror, press Escape to close
            </span>
          </div>
        </div>
      ) : (
        <div id="fm-app__error-section">
          <span id="fm-app__error-section-title">
            Enable camera permissions
          </span>

          <div id="fm-app__error-actions">
            <button
              id="fm-app__error-action-settings-btn"
              onClick={() => {
                chrome.runtime.sendMessage({
                  action: "OPEN_SETTINGS",
                });
              }}
            >
              <SettingsIcon size={16} />
              Camera Settings
            </button>
            <button
              id="fm-app__error-action-reload-btn"
              onClick={() => {
                chrome.runtime.sendMessage({
                  action: "RELOAD_TAB",
                });
              }}
            >
              <RotateCwIcon size={16} />
              Reload Tab
            </button>
          </div>

          <div id="fm-app__error-section-info">
            <span id="fm-app__error-section-info-title">
              How to allow sites to use camera
            </span>
            <img
              src={useCameraDefault}
              alt="Allow sites to use camera default behaviour"
              id="fm-app__error-section-info-img"
            />
            <img
              src={useCamera}
              alt="Allow sites to use camera customised behaviours"
              id="fm-app__error-section-info-img"
            />
          </div>

          <div id="fm-app__error-section-info">
            <span id="fm-app__error-section-info-title">
              How to unblock the camera
            </span>
            <img
              src={unblockCamera}
              alt="Unblock the camera"
              id="fm-app__error-section-info-img"
            />
          </div>
        </div>
      )}
    </>
  );
}
