import Image from 'next/image';
import heroBg from './assets/hero-bg.jpg';
import logo from './assets/logo.svg';
import CameraCard from './components/CameraCard';

export default function Home() {
  return (
    <>
      <section
        className='h-[450px] px-5 flex flex-col justify-center'
        style={{
          backgroundImage: `url(${heroBg.src})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div className='w-full max-w-content-width mx-auto'>
          <div className='flex flex-col items-center py-[90px]'>
            <div className='flex flex-row items-center gap-5 mb-10'>
              <Image
                src={logo}
                alt='Frontmirror logo'
                className='w-14 md:w-[60px]'
              />
              <h1 className='text-4xl md:text-5xl font-bold'>Front Mirror</h1>
            </div>
            <h2 className='text-center'>
              A one-click camera check, right from the chrome toolbar.
            </h2>
            <button className='mt-14'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='32'
                height='32'
                viewBox='0 0 256 256'
              >
                <path d='M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,16a88,88,0,0,1,73.72,40H128a48.08,48.08,0,0,0-45.6,33l-23.08-40A87.89,87.89,0,0,1,128,40Zm32,88a32,32,0,1,1-32-32A32,32,0,0,1,160,128ZM40,128a87.44,87.44,0,0,1,9.56-39.86L86.43,152c.06.1.13.19.19.28A48,48,0,0,0,137.82,175l-23.1,40A88.14,88.14,0,0,1,40,128Zm92.69,87.87L169.57,152c.08-.14.14-.28.22-.42a47.88,47.88,0,0,0-6-55.58H210a88,88,0,0,1-77.29,119.87Z'></path>
              </svg>
              Install On Chrome
            </button>
          </div>
        </div>
      </section>

      <section className='px-5'>
        <div className='w-full max-w-[650px] mx-auto'>
          <div className='flex flex-col py-[90px]'>
            <div>
              <div className='mb-[30px]'>
                <h3 className='mb-4'>What is this?</h3>
                <p>
                  It&apos;s a chrome extension that provides one-click access to
                  your camera, right from your chrome toolbar.
                </p>
              </div>
              <CameraCard />
            </div>

            <div className='mt-[90px]'>
              <h3 className='mb-4'>Yeah but why?</h3>
              <p>
                Ever been in a hurry to join a video call and quickly needed to
                check your camera? Front mirror simplifies that process with
                just one click. No more navigating menus or wasting time - just
                instant access to your camera when you need it most.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
