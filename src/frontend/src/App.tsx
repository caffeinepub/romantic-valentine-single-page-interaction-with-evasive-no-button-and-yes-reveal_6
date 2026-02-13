import { useState, useRef, useEffect } from 'react';
import { Heart } from 'lucide-react';

function App() {
  const [answered, setAnswered] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize No button position on mount
  useEffect(() => {
    if (noButtonRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const buttonRect = noButtonRef.current.getBoundingClientRect();
      
      // Center the button initially (relative positioning)
      setNoButtonPosition({
        x: (containerRect.width - buttonRect.width) / 2,
        y: 0
      });
    }
  }, []);

  const moveNoButton = () => {
    if (!noButtonRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const button = noButtonRef.current;
    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    // Calculate safe bounds with padding
    const padding = 20;
    const maxX = containerRect.width - buttonRect.width - padding;
    const maxY = containerRect.height - buttonRect.height - padding;

    // Generate random position within safe bounds
    const newX = Math.max(padding, Math.random() * maxX);
    const newY = Math.max(padding, Math.random() * maxY);

    setNoButtonPosition({ x: newX, y: newY });
  };

  const handleYesClick = () => {
    setAnswered(true);
  };

  if (answered) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-white to-pink-50 p-4">
        <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in duration-700">
          <div className="space-y-4">
            <Heart className="w-20 h-20 mx-auto text-pink-500 fill-pink-500 animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold text-pink-600">
              Yay! 💕
            </h1>
          </div>
          
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-pink-200">
            <p className="text-2xl md:text-3xl font-semibold text-pink-700 leading-relaxed">
              Found me jiyuu ❤️ , By the way good choice 😘
            </p>
          </div>

          <div className="flex gap-2 justify-center items-center text-pink-400">
            <Heart className="w-5 h-5 fill-pink-400" />
            <Heart className="w-6 h-6 fill-pink-400" />
            <Heart className="w-5 h-5 fill-pink-400" />
          </div>
        </div>

        <footer className="mt-12 text-center text-sm text-pink-400">
          <p>
            Built with <Heart className="inline w-4 h-4 fill-pink-400" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'valentine-app'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-pink-600 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
          <p className="mt-1">© {new Date().getFullYear()}</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-white to-pink-50 p-4">
      <div className="max-w-2xl w-full text-center space-y-12 animate-in fade-in duration-500">
        <div className="space-y-6">
          <Heart className="w-24 h-24 mx-auto text-pink-500 fill-pink-500 animate-pulse" />
          <h1 className="text-5xl md:text-6xl font-bold text-pink-600 leading-tight">
            Will you be my Valentine?
          </h1>
          <p className="text-xl text-pink-400">💕</p>
        </div>

        <div
          ref={containerRef}
          className="relative min-h-[300px] flex items-center justify-center"
        >
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
            <button
              onClick={handleYesClick}
              className="px-12 py-6 text-2xl font-bold text-white bg-gradient-to-r from-pink-500 to-pink-600 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 active:scale-95 border-4 border-pink-300"
            >
              Yes! 💖
            </button>

            <button
              ref={noButtonRef}
              onPointerEnter={moveNoButton}
              onPointerMove={moveNoButton}
              onTouchStart={moveNoButton}
              onPointerDown={moveNoButton}
              style={{
                position: 'absolute',
                left: `${noButtonPosition.x}px`,
                top: `${noButtonPosition.y}px`,
                transition: 'all 0.3s ease-out'
              }}
              className="px-12 py-6 text-2xl font-bold text-pink-600 bg-white rounded-full shadow-lg border-4 border-pink-300 hover:shadow-xl cursor-pointer touch-none"
            >
              No 😢
            </button>
          </div>
        </div>

        <div className="flex gap-2 justify-center items-center text-pink-300">
          <Heart className="w-4 h-4 fill-pink-300" />
          <Heart className="w-5 h-5 fill-pink-300" />
          <Heart className="w-4 h-4 fill-pink-300" />
        </div>
      </div>

      <footer className="mt-12 text-center text-sm text-pink-400">
        <p>
          Built with <Heart className="inline w-4 h-4 fill-pink-400" /> using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== 'undefined' ? window.location.hostname : 'valentine-app'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-pink-600 transition-colors"
          >
            caffeine.ai
          </a>
        </p>
        <p className="mt-1">© {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
