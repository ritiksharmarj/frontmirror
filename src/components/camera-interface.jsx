import * as React from 'react';
import { VideoIcon } from 'lucide-react';
import { ChevronsUpDownIcon } from 'lucide-react';
import { SettingsIcon } from 'lucide-react';
import { RotateCwIcon } from 'lucide-react';

export default function CameraInterface() {
  const videoRef = React.useRef(null);
  const [devices, setDevices] = React.useState([]);
  const [selectedDevice, setSelectedDevice] = React.useState('');
  const [error, setError] = React.useState('');

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
        }
      } catch (err) {
        setError('Camera access denied');
        console.error('Camera error:', err);
      }
    };

    initCamera();
  }, [selectedDevice]);

  React.useEffect(() => {
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
    <div id='frontmirror-app__camera'>
      {!error ? (
        <div id='fm-app__camera-section'>
          <div id='fm-app__camera'>
            <video id='fm-app__camera-stream' ref={videoRef} autoPlay muted />

            <div id='fm-app__camera-select-section'>
              <div id='fm-app__camera-select'>
                <VideoIcon size={20} id='fm-app__camera-select-svg-first' />
                <select
                  id='fm-app__camera-source'
                  value={selectedDevice}
                  onChange={(e) => setSelectedDevice(e.target.value)}
                >
                  {devices.map((device) => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label || 'Unknown Camera'}
                    </option>
                  ))}
                </select>
                <ChevronsUpDownIcon
                  size={20}
                  id='fm-app__camera-select-svg-last'
                />
              </div>
              <span>Choose a different camera</span>
            </div>
          </div>

          <div id='fm-app__camera-info'>
            <span>
              Press Ctrl+Shift+O (Command+Shift+O on a Mac) to open the Front
              Mirror, press Escape to close
            </span>
          </div>
        </div>
      ) : (
        <div id='fm-app__error-section'>
          <span id='fm-app__error-section-title'>
            Enable camera permissions
          </span>

          <div id='fm-app__error-actions'>
            <button
              id='fm-app__error-action-settings-btn'
              onClick={() =>
                chrome.tabs.create({ url: 'chrome://settings/content/camera' })
              }
            >
              <SettingsIcon size={20} />
              Camera Settings
            </button>
            <button
              id='fm-app__error-action-reload-btn'
              onClick={() =>
                // Get the current active tab
                chrome.tabs.query(
                  { active: true, currentWindow: true },
                  (tabs) => {
                    chrome.tabs.reload(tabs[0].id);
                  }
                )
              }
            >
              <RotateCwIcon size={20} />
              Reload Tab
            </button>
          </div>

          <div id='fm-app__error-section-info'>
            <span id='fm-app__error-section-info-title'>
              How to allow sites to use camera
            </span>
            <img
              src='assets/camera/allow-sites-to-use-camera-default.jpg'
              alt='Allow sites to use camera default behaviour'
              id='fm-app__error-section-info-img'
            />
            <img
              src='assets/camera/allow-sites-to-use-camera.jpg'
              alt='Allow sites to use camera customised behaviours'
              id='fm-app__error-section-info-img'
            />
          </div>

          <div id='fm-app__error-section-info'>
            <span id='fm-app__error-section-info-title'>
              How to unblock the camera
            </span>
            <img
              src='assets/camera/unblock-the-camera.jpg'
              alt='Unblock the camera'
              id='fm-app__error-section-info-img'
            />
          </div>
        </div>
      )}
    </div>
  );
}
