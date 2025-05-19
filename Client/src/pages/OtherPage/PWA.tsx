export default function PWA() {
  return (
    <>
      <div className="container mx-auto p-4">
        <header className="header text-center mb-4">
          <h1 className="text-2xl font-bold">Welcome to My Mobile App</h1>
        </header>
        <nav className="navbar flex justify-around mb-4">
          <a href="/" className="text-blue-500">
            Home
          </a>
          <a href="/about" className="text-blue-500">
            About
          </a>
          <a href="/contact" className="text-blue-500">
            Contact
          </a>
        </nav>
        <main className="main-content text-center">
          <h2 className="text-xl font-semibold mb-2">
            This is a mobile-first responsive web app
          </h2>
          <p>It looks like an app on mobile devices!</p>
        </main>
      </div>
    </>
  );
}
