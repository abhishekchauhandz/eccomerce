// components/Loader.js
export default function Loader() {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-90">
        <div className="relative w-20 h-20">
          {/* Leaves */}
          <div className="absolute top-0 left-0 w-8 h-8 bg-primary rounded-full transform rotate-45 origin-bottom-right animate-pulse"></div>
          <div className="absolute top-0 right-0 w-8 h-8 bg-accent rounded-full transform -rotate-45 origin-bottom-left animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="absolute bottom-0 left-1/2 w-8 h-8 bg-secondary rounded-full transform -translate-x-1/2 rotate-0 origin-top animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
        <p className="mt-6 text-primary font-medium">Preparing your shopping experience...</p>
      </div>
    );
  }