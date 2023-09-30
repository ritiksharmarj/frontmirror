console.log('Camera running');

const cameraOptions = document.getElementById('camera-source');
const camera = document.getElementById('camera-stream');
let stream;

const constraints = {
  audio: false,
  video: {
    width: { ideal: 1920 },
    height: { ideal: 1080 },
    aspectRatio: 1.7777777778,
    deviceId: {
      exact: undefined,
    },
  },
};

// Execution starts here
(async () => {
  await handleStream();
  await getCameraSelection();
})();

async function getCameraSelection() {
  try {
    // List all the camera options
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(
      (device) => device.kind === 'videoinput'
    );
    const options = videoDevices.map((videoDevice) => {
      return `<option value="${videoDevice.deviceId}">${videoDevice.label}</option>`;
    });
    cameraOptions.innerHTML = options.join('');
  } catch (error) {
    console.error(`Camera Selection Error: ${error}`);
  }
}

async function handleStream() {
  try {
    // Stop the current stream
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    const cameraSource = cameraOptions.value;

    // Create new constraints
    const updatedConstraints = {
      ...constraints,
      video: {
        deviceId: cameraSource ? { exact: cameraSource } : undefined,
      },
    };

    // Start stream
    stream = await navigator.mediaDevices.getUserMedia(updatedConstraints);
    camera.srcObject = stream;
  } catch (error) {
    console.error(`Video Stream Error: ${error}`);
  }
}

// Switch between camera and start a new stream
cameraOptions.addEventListener('change', handleStream);
