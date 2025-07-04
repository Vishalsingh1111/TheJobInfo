import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram, faYoutube } from '@fortawesome/free-brands-svg-icons';

function SocialMediaPoster() {
    return (
        <div className="Outer bg-gray-400 p-4 rounded-lg sticky top-[100px] mt-10 ml-auto lg:ml-20 flex flex-row lg:flex-row lg:space-x-4 items-center">
            {/* Telegram Card */}
            <a
                href="https://t.me/dcoder21575"
                target="_blank"
                rel="noopener noreferrer"
                className="Telegram  flex flex-col items-center justify-center p-4 px-6 dark:bg-slate-800 bg-blue-100 text-white rounded-2xl shadow-sm transition-transform hover:scale-105 group"
            >
                <FontAwesomeIcon
                    icon={faTelegram}
                    className="text-[8vmin] mb-2 text-blue-600 transition-transform group-hover:animate-spin"
                />
            </a>

            {/* YouTube Card */}
            <a
                href="https://www.youtube.com/@d-coder1898"
                target="_blank"
                rel="noopener noreferrer"
                className="Youtube lg:ml-0 ml-3  flex flex-col items-center justify-center p-4 dark:bg-slate-800 bg-red-100 text-white rounded-2xl shadow-sm transition-transform hover:scale-105 group"
            >
                <FontAwesomeIcon
                    icon={faYoutube}
                    className="text-[8vmin] mb-2 text-red-500 transition-transform group-hover:animate-spin"
                />
            </a>
        </div>
    );
}

export default SocialMediaPoster;
