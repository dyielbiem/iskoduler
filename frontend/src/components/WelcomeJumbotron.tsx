const WelcomeJumbotron = () => {
  return (
    <div
      className="z-50 w-full py-3 flex flex-col
      h-full justify-center md:w-11/12
      px-2"
    >
      <h1
        className="font-bold text-primary 
        text-center md:text-left
        text-3xl md:text-4xl lg:text-5xl"
      >
        ISKOduler
      </h1>
      <p
        className="hidden md:block font-medium
          text-lg md:text-xl lg:text-2xl"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit ad harum
        cum impedit dolores
      </p>
    </div>
  );
};

export default WelcomeJumbotron;
