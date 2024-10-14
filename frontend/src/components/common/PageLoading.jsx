const PageLoading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent">
      <div className="flex flex-col items-center">
        {/* Loading Text */}
        <p className="mt-4 text-3xl md:text-5xl text-black font-bold animate-pulse">
          ShuOnIt
        </p>
      </div>
    </div>
  );
};

export default PageLoading;
