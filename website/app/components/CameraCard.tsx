import cameraPreview from './../assets/camera-preview.jpg';

const CameraCard = () => {
  return (
    <div className='flex flex-col bg-[var(--background-default)] border border-solid border-[var(--colors-scale8)] rounded-lg overflow-hidden'>
      <div className='p-4 flex flex-col gap-4'>
        <div
          className='bg-[var(--colors-scale7)] border border-solid border-[var(--colors-scale8)] rounded-lg h-[250px] sm:h-[350px]'
          style={{
            backgroundImage: `url(${cameraPreview.src})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        ></div>

        <div className='flex flex-col gap-2'>
          <div className='flex flex-row items-center py-2 px-4 border border-solid border-[var(--colors-scale3)] rounded-lg bg-[var(--colors-scale9)]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='32'
              height='32'
              viewBox='0 0 256 256'
              className='fill-[var(--colors-scale1)] w-[18px] h-[18px] mr-4'
            >
              <path d='M251.77,73a8,8,0,0,0-8.21.39L208,97.05V72a16,16,0,0,0-16-16H32A16,16,0,0,0,16,72V184a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V159l35.56,23.71A8,8,0,0,0,248,184a8,8,0,0,0,8-8V80A8,8,0,0,0,251.77,73ZM192,184H32V72H192V184Zm48-22.95-32-21.33V116.28L240,95Z'></path>
            </svg>
            <div className='w-full flex flex-row items-center justify-between'>
              <span className='text-sm'>FaceTime HD Camera</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='32'
                height='32'
                viewBox='0 0 256 256'
                className='fill-[var(--colors-scale5)] w-[18px] h-[18px]'
              >
                <path d='M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z'></path>
              </svg>
            </div>
          </div>
          <span className='text-xs text-[var(--colors-scale1)]'>
            Choose a different camera
          </span>
        </div>
      </div>

      <div className='bg-[var(--colors-scale7)] border-t border-solid border-[var(--colors-scale8)] mt-6 min-h-[50px] flex items-center justify-center py-2 px-4'>
        <span className='text-xs text-center'>
          Press Ctrl+Shift+Z (Command+Shift+Z on a Mac) to open the Front
          Mirror, press Escape to close
        </span>
      </div>
    </div>
  );
};

export default CameraCard;
