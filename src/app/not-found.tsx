export default function NotFound() {
  return (
    <section className="bg-nord-6 py-20 dark:bg-nord-0">
      <div className="mx-auto flex min-h-[60vh] w-full max-w-6xl flex-col items-center justify-center px-4 text-center">
        <div className="space-y-8">
          <p className="text-8xl font-black text-nord-9 md:text-9xl dark:text-nord-6">
            404
          </p>
          <div className="space-y-6">
            <div className="relative inline-block">
              <h1 className="gradient-text relative z-10 text-3xl font-bold md:text-4xl">
                This page went off the map.
              </h1>
              <div className="absolute -bottom-2 left-1/2 h-1 w-36 -translate-x-1/2 transform rounded-full bg-linear-to-r from-nord-10 via-nord-14 to-nord-15"></div>
            </div>
            <p className="max-w-xl text-base text-nord-3 dark:text-nord-4">
              The page you were looking for does not exist or has moved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
