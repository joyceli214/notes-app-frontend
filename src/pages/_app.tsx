import type { AppProps } from 'next/app';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-blue-600 text-white py-4 px-8 shadow-md">
        <h1 className="text-2xl font-bold">My Notes App</h1>
      </header>
      <main className="container mx-auto py-8 px-4">
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
