import * as React from 'react';
import '../styles/camera.css';

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
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        maxWidth: '700px',
        minHeight: '600px',
        backgroundColor: '#1c1c1c',
        borderRadius: '8px',
        boxShadow: '0 24px 40px rgba(0,0,0,0.3)',
      }}
    >
      <video
        ref={videoRef}
        style={{
          width: '100%',
          height: '400px',
          objectFit: 'cover',
          transform: 'rotateY(180deg)',
        }}
        autoPlay
        muted
      />

      <div style={{ padding: '15px' }}>
        <select
          value={selectedDevice}
          onChange={(e) => setSelectedDevice(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            backgroundColor: '#232323',
            color: '#ffffff',
            border: '1px solid #343434',
            borderRadius: '4px',
          }}
        >
          {devices.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || 'Unknown Camera'}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div
          style={{
            padding: '15px',
            color: '#ffffff',
            textAlign: 'center',
          }}
        >
          <button
            onClick={() =>
              chrome.tabs.create({ url: 'chrome://settings/content/camera' })
            }
            style={{
              padding: '8px 16px',
              backgroundColor: '#3ecf8e',
              border: 'none',
              borderRadius: '4px',
              color: 'white',
              cursor: 'pointer',
              margin: '5px',
            }}
          >
            Camera Settings
          </button>
        </div>
      )}
    </div>
  );
}
