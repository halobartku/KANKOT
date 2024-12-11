import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 py-1 bg-white/80 backdrop-blur-sm border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center text-xs text-gray-600">
          <div>&copy; {new Date().getFullYear()} KANKOT sp. z o. o. All rights reserved.</div>
          <Link 
            to="/privacy"
            className="hover:text-emerald-600 transition-colors duration-200"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}