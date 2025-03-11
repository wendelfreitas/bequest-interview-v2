export function NxWelcome({ title }: { title: string }) {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <div id="welcome">
            <h1 className="text-2xl font-bold text-center text-gray-800">
              <span className="block"> Hello there, </span>
              Welcome {title} 👋
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default NxWelcome;
