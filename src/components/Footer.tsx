import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 py-1 bg-gradient-to-r from-[#862B44] to-[#A13553] backdrop-blur-sm shadow-[0_-8px_16px_rgba(0,0,0,0.1)]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center text-xs text-white">
          <div> {new Date().getFullYear()} Kancelaria Podatkowa Stankiewicz. Wszelkie prawa zastrzeżone.</div>
          <Link 
            to="/privacy"
            className="text-white hover:text-[#E6F3FF] transition-colors duration-200"
          >
            Polityka Prywatności
          </Link>
        </div>
      </div>
    </footer>
  );
}
