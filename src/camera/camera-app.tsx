import { useState, useEffect, useRef } from 'react';
import './camera.css';

const CameraApp = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
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
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Camera access denied');
      }
    };

    initCamera();
  }, [selectedDevice]);

  useEffect(() => {
    const getDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((d) => d.kind === 'videoinput');
      setDevices(videoDevices);
      if (videoDevices.length > 0) {
        setSelectedDevice(videoDevices[0].deviceId);
      }
    };

    getDevices();
  }, []);

  return (
    <div id='viewedit-camera--section'>
      <video
        ref={videoRef}
        id='camera-stream'
        autoPlay
        muted
        style={{ transform: 'rotateY(180deg)' }}
      />

      <div id='camera-select'>
        <select
          value={selectedDevice}
          onChange={(e) => setSelectedDevice(e.target.value)}
          className='camera-selector'
        >
          {devices.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || 'Unknown Camera'}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div id='video-stream--error-box'>
          <div id='vs-error--action-container'>
            <button
              id='vs-error--settings-btn'
              onClick={() =>
                chrome.tabs.create({ url: 'chrome://settings/content/camera' })
              }
            >
              Camera Settings
            </button>
            <button
              id='vs-error--reload-btn'
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraApp;
