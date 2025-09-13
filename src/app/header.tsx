export const Header = () => {
    return (
    <header className="border-b border-gray-100 backdrop-blur-lg dark:border-gray-800 bg-transparent dark:bg-black/20">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4 ">
            <div className="bg-white/50 dark:bg-white/50 rounded-full p-2 flex items-center justify-center">
                <img src="/logo_icon.png" alt="Opaque Dotenv" className="w-14 h-14 object-contain" />
            </div>
            <div>
              <div className="text-lg font-semibold">Opaque Dotenv</div>
          <div className="text-xs text-gray-500 dark:text-gray-300">Mask and preview .env safely</div>
            </div>
          </div>
        </header>
    );
};