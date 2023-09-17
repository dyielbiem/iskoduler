const WelcomeJumbotron = () => {
  return (
    <div
      className="z-50 py-3 flex flex-col
      h-full justify-center 
      w-11/12 md:w-full
      px-2"
    >
      <h1
        className="font-bold text-primary 
        text-center md:text-left
        text-2xl sm:text-3xl md:text-5xl lg:text-6xl
        tracking-tight"
      >
        ISKOduler
      </h1>
      <p
        className="hidden md:block font-medium mt-1.5
        max-w-[30ch] md:leading-tight lg:leading-snug
        text-lg md:text-xl lg:text-2xl"
      >
        Manage your class schedules even while you are in the middle of traffic.
      </p>
    </div>
  );
};

export default WelcomeJumbotron;
