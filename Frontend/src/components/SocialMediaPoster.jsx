import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram, faYoutube } from '@fortawesome/free-brands-svg-icons';

function SocialMediaPoster() {
    return (
        <div className="Outer sticky top-[100px] mt-10 ml-auto lg:ml-20 flex flex-row lg:flex-col lg:space-y-4 items-center p-6">
            {/* Telegram Card */}
            <a
                href="https://t.me/dcoder21575"
                target="_blank"
                rel="noopener noreferrer"
                className="Telegram h-[23vmin] flex flex-col items-center justify-center p-4 dark:bg-slate-800 bg-blue-100 text-white rounded-lg shadow-sm w-72 transition-transform hover:scale-105 group"
            >
                <FontAwesomeIcon
                    icon={faTelegram}
                    className="text-[10vmin] mb-2 text-blue-600 transition-transform group-hover:animate-spin"
                />
                <span className="text-[2.5vmin] font-regular text-blue-600">Connect on Telegram</span>
            </a>

            {/* YouTube Card */}
            <a
                href="https://www.youtube.com/@d-coder1898"
                target="_blank"
                rel="noopener noreferrer"
                className="Youtube lg:ml-0 ml-3 h-[23vmin] flex flex-col items-center justify-center p-4 dark:bg-slate-800 bg-red-100 text-white rounded-lg shadow-sm w-72 transition-transform hover:scale-105 group"
            >
                <FontAwesomeIcon
                    icon={faYoutube}
                    className="text-[10vmin] mb-2 text-red-500 transition-transform group-hover:animate-spin"
                />
                <span className="text-[2.5vmin] font-regular text-red-500">Connect on YouTube</span>
            </a>
        </div>
    );
}

export default SocialMediaPoster;
