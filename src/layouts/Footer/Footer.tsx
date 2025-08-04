import { FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FaInstagram } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-detail py-12 text-white">
      <div className="flex flex-col px-4 md:px-8 text-white/70">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col max-w-">
            <span className="text-primary text-2xl font-bold mb-4">
              Colophon
            </span>
            <p className="text-white/70">
              Organize your personal library and discover new worlds through the
              reading.
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-semibold mb-4 text-white">Features</h4>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer">Search Books</li>
              <li className="hover:text-white cursor-pointer">
                My Bookshelves
              </li>
              <li className="hover:text-white cursor-pointer">Ratings</li>
              <li className="hover:text-white cursor-pointer">Reviews</li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer">Help Center</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
              <li className="hover:text-white cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:text-white cursor-pointer">
                Terms of Service
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h4 className="text-white font-semibold mb-4">Social Medias</h4>
            <ul className="flex space-x-4">
              <li className="hover:text-white cursor-pointer">
                <FaFacebook className="size-6" />
              </li>
              <li className="hover:text-white cursor-pointer">
                <FaXTwitter className="size-6" />
              </li>
              <li className="hover:text-white cursor-pointer">
                <FaInstagram className="size-6" />
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col border-t border-white/20 pt-8 mt-8 text-center">
          <p>&copy; 2025 Colophon. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};
