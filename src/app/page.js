"use client";

import { useState } from 'react';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [foundersAccessClicked, setFoundersAccessClicked] = useState(false);

  const handleDonate = async () => {
    if (!window.ethereum) {
      setModalMessage('Please install MetaMask or another compatible Web3 wallet.');
      setShowModal(true);
      return;
    }
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId !== '0xa86a') { // Avalanche C-Chain
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xa86a' }],
          });
        } catch (switchError) {
          if (switchError.code === 4902) {
            setModalMessage('Avalanche Network is not added to your wallet. Please add it manually.');
            setShowModal(true);
          } else {
            console.error('Failed to switch network:', switchError);
            setModalMessage('Failed to switch to Avalanche network. Please do it manually in your wallet.');
            setShowModal(true);
          }
          return;
        }
      }
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: accounts[0],
          to: '0x88131c91BE9792417e127677588D4F6D72E81C55',
          value: '0x16345785D8A0000', // 0.1 AVAX
        }],
      });
      setModalMessage("Thank you for your donation! Join our Discord community to continue the journey.");
      setShowModal(true);
    } catch (error) {
      console.error('Donation failed:', error);
      setModalMessage('Transaction was cancelled or failed. Please try again.');
      setShowModal(true);
    }
  };

  const handleFoundersAccessClick = () => {
    setFoundersAccessClicked(true);
  };

return (
  <div className="min-h-screen relative">
    <div className="fixed top-6 right-6 z-[9999]">
      <button
        onClick={handleDonate}
        className="group flex flex-col items-center transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none bg-transparent"
        aria-label="Donate 0.1 AVAX"
      >
        <img
          src="/cards/AVAX-donate.png" // Corrected Path
          alt="AVAX Logo"
          className="w-10 h-10 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
        />
        <span
          className="text-[var(--ee-accent1)] text-[0.6rem] sm:text-[0.65rem] font-bold tracking-normal sm:tracking-wider drop-shadow-md bg-[rgba(0,0,0,0.5)] px-1.5 py-0.5 rounded mt-1 group-hover:bg-[rgba(0,0,0,0.7)]"
        >
          DONATE 0.1 AVAX
        </span>
      </button>
    </div>

      <section className="w-full px-4 pt-16 pb-20 sm:pt-20 sm:pb-24 md:pt-24 md:pb-28 text-center min-h-[90vh] flex items-center justify-center">
        <div className="bg-[rgba(30,30,45,0.15)] backdrop-blur-[6px] rounded-xl sm:rounded-2xl px-4 py-8 sm:px-6 sm:py-10 md:px-10 md:py-12 shadow-xl w-full max-w-4xl lg:max-w-7xl mx-auto relative overflow-hidden border border-[rgba(255,255,255,0.06)]">
          <div className="absolute -inset-2 sm:-inset-3 bg-[var(--ee-action-taker)]/5 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl pointer-events-none animate-pulse-signal opacity-75" />
          <div className="relative z-10 space-y-5 md:space-y-6">
            <div className="relative mb-4 md:mb-6 flex justify-center">
                <div className="absolute top-0 left-0 -translate-y-1/4 sm:-translate-y-1/3 md:left-2">
                    <img src="/cards/strandstransplogo64.png" alt="Strands Logo" className="h-12 w-12 sm:h-16 sm:w-16 opacity-70 hover:opacity-90 transition-opacity" /> {/* Path assuming it's in public/cards/ */}
                </div>
                <h1 className="strands-title text-3xl mob:text-4xl sm:text-5xl md:text-6xl" style={{ color: 'var(--ee-accent1)' }}>
                StrandsNation
            </h1>
            </div>
            <div className="space-y-2 md:space-y-3 max-w-2xl mx-auto">
              <p className="pulsing-glow-text text-lg sm:text-xl md:text-2xl text-[var(--ee-text)] opacity-90">
                Protocols for a Participatory Economy.
              </p>
              <p className="pulsing-glow-text italic-subtitle text-md sm:text-lg md:text-xl italic">
                Citizenship through Participation. Not Wealth.
              </p>
            </div>

            <div className="relative w-full max-w-xl lg:max-w-2xl mx-auto pt-4 md:pt-6">
              <div className="p-1 bg-[var(--ee-accent1)]/20 rounded-lg sm:rounded-xl shadow-lg shadow-[var(--ee-accent1)]/20">
                <div className="relative w-full aspect-video rounded-md sm:rounded-lg overflow-hidden border border-[var(--ee-accent1)]/40 hover:border-[var(--ee-accent1)]/70 transition-colors">
                  <iframe
                    src="https://www.youtube.com/embed/XPsQ0X_a2Io?si=IPMnpXyvCGdRRF3R" 
                    title="StrandsNation Signal Series"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    loading="lazy"
                  />
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[var(--ee-text-secondary)] mt-2 sm:mt-2.5">
                Watch the <span className="font-semibold text-[var(--ee-text)] opacity-80">Signal Series</span> to join our vision
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-5 pt-5 md:pt-6">
              <button
                onClick={handleFoundersAccessClick}
                className={`btn-glass w-full sm:w-auto ${
                  foundersAccessClicked ? 'bg-[var(--ee-accent2)] text-[var(--ee-anchor)] border-[var(--ee-accent2)] hover:bg-[var(--ee-accent2)] hover:border-[var(--ee-accent2)]' : 'primary'
                }`}
                disabled={foundersAccessClicked}
              >
                <span className="btn-text-content">
                  {foundersAccessClicked ? 'COMING SOON!' : 'Founders Access'}
                </span>
              </button>

              <a
                href="https://metafintek.gitbook.io/strands"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glass secondary w-full sm:w-auto no-underline"
              >
                <span className="btn-text-content">Whitepaper</span>
              </a>

              <a
                href="https://metafintek.gitbook.io/strands-manifesto-by-somo-kasane"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glass tertiary w-full sm:w-auto no-underline"
              >
                <span className="btn-text-content">Read the Manifesto</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-10 md:py-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 md:mb-10 text-[var(--ee-text)]">The Four Orders of Strands Citizenship</h2>
        <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 place-items-stretch">
          {[
            { tier: 'Common', desc: 'Early Adopters: Foundational Access & Recognition' },
            { tier: 'Rare', desc: 'Contributors: Enhanced Privileges & Voting Rights' },
            { tier: 'Legendary', desc: 'Architects: Shape Protocols & Ecosystem Governance' },
            { tier: 'Extraordinary', desc: 'Sovereigns: Steward the Network, Drive Evolution' }
          ].map(({ tier, desc }) => (
            <div key={tier} className="card-frame group">
              <h3 className="text-md sm:text-lg font-bold text-[var(--ee-accent1)] drop-shadow-sm">{tier}</h3>
              <p className="text-xs sm:text-sm text-[var(--ee-text-secondary)] mt-1.5 px-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 py-10 md:py-12 w-full">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-8 md:mb-10 text-[var(--ee-text)]">This isn't an app. It's an Operating System.</h3>
        <div className="mx-auto max-w-4xl lg:max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6 place-items-stretch">
          {[
            { title: 'MyMaits', desc: 'Personal AI companions, memory-linked and upgradable. Your sovereign digital allies.'},
            { title: 'Passports', desc: 'Proof of participation, identity, and belonging within the StrandsNation.'},
            { title: 'LayerU', desc: 'Spatial intelligence economy. Monetize AR interactions & build the value web.'}
          ].map(({ title, desc }) => (
            <div key={title} className="card-frame group h-full">
              <h4 className="text-md sm:text-lg font-semibold text-[var(--ee-text)] mb-1.5">{title}</h4>
              <p className="text-xs sm:text-sm text-[var(--ee-text-secondary)] px-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="px-6 py-8 md:py-12 text-center bg-[rgba(0,0,0,0.15)] relative mt-8 md:mt-12 border-t border-[rgba(255,255,255,0.05)]">
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ee-anchor)] via-transparent to-transparent z-0 opacity-30" />
        <img
          src="/cards/signal-from-noise.png" // Corrected Path
          alt="The Signal from the Noise"
          className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md relative z-10 mb-5 md:mb-6 opacity-75 hover:opacity-95 transition-opacity duration-300"
        />
        <div className="social-icons relative z-10 flex justify-center gap-x-5 sm:gap-x-6">
          <a href="https://discord.gg/v7WdD94UXK" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Discord">
            <svg className="w-6 h-6" viewBox="0 0 512 512">
              <g transform="translate(0,512) scale(0.1,-0.1)" fill="currentColor">
                <path d="M643 5105 c-185 -40 -342 -181 -405 -363 l-23 -67 0 -1815 0 -1815 22 -70 c43 -137 140 -251 265 -313 133 -65 36 -62 1746 -62 899 0 1552 4 1552 9 0 5 -31 108 -69 230 -38 122 -67 221 -64 221 7 0 345 -292 498 -431 157 -141 726 -619 737 -619 12 0 10 4563 -2 4640 -33 212 -223 410 -437 455 -98 21 -3725 21 -3820 0z m1507 -1210 c10 -12 10 -16 -1 -19 -266 -80 -423 -147 -566 -242 -101 -67 -113 -83 -36 -48 394 179 876 248 1311 188 219 -30 491 -107 671 -190 41 -19 76 -32 78 -30 8 8 -163 115 -262 164 -96 48 -242 106 -333 133 -40 12 -41 13 -26 31 23 24 88 24 215 -2 164 -34 343 -109 486 -204 59 -39 65 -47 117 -152 186 -374 312 -846 332 -1249 l7 -131 -65 -62 c-92 -88 -159 -137 -258 -187 -107 -54 -228 -92 -350 -111 -168 -25 -157 -28 -249 84 -79 95 -94 122 -68 122 26 1 183 72 253 115 72 45 184 139 184 155 0 4 -61 -24 -136 -62 -153 -79 -249 -116 -391 -152 -363 -92 -719 -85 -1058 21 -97 30 -354 132 -424 168 -28 14 -51 22 -51 17 0 -10 83 -89 136 -130 54 -41 175 -105 251 -132 l62 -22 -87 -108 -87 -107 -60 4 c-175 13 -363 69 -499 150 -48 29 -114 82 -164 132 l-85 84 6 161 c12 333 98 704 247 1066 85 206 124 276 178 315 121 89 351 188 507 218 148 30 198 32 215 12z" />
                <path d="M2018 2960 c-58 -10 -104 -37 -152 -90 -52 -58 -69 -103 -69 -190 -1 -62 4 -84 25 -125 53 -102 138 -154 249 -155 149 0 256 106 267 266 4 62 1 79 -23 133 -54 119 -170 182 -297 161z" />
                <path d="M3001 2959 c-179 -36 -274 -239 -190 -407 50 -101 132 -152 241 -152 157 0 274 123 272 285 -1 84 -20 130 -77 192 -65 71 -154 101 -246 82z" />
              </g>
            </svg>
          </a>
          <a href="https://www.youtube.com/@B4SICAI" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="YouTube"> {/* REPLACE WITH ACTUAL YOUTUBE CHANNEL LINK */}
            <svg className="w-6 h-6" viewBox="0 0 512 512">
              <g transform="translate(0,512) scale(0.1,-0.1)" fill="currentColor">
                <path d="M2055 4279 c-809 -15 -1284 -52 -1433 -112 -135 -55 -248 -158 -315 -285 -87 -165 -133 -527 -144 -1132 -8 -483 18 -922 73 -1200 59 -303 222 -476 503 -535 256 -54 935 -86 1826 -85 910 0 1558 30 1830 85 89 18 215 81 281 139 69 61 139 166 168 252 80 236 129 923 107 1493 -30 774 -93 1017 -306 1178 -98 74 -166 101 -318 128 -188 32 -640 60 -1117 70 -558 11 -758 12 -1155 4z m645 -1312 c337 -194 612 -357 612 -362 -1 -8 -1216 -715 -1229 -715 -1 0 -3 322 -3 715 0 393 2 715 4 715 2 0 279 -159 616 -353z" />
              </g>
            </svg>
          </a>
          <a href="https://x.com/strandsnation" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="X (Twitter)">
            <svg className="w-6 h-6" viewBox="0 0 512 512">
              <g transform="translate(0,512) scale(0.1,-0.1)" fill="currentColor">
                <path d="M412 5100 c-97 -26 -173 -70 -248 -144 -75 -76 -119 -151 -144 -252 -20 -76 -20 -115 -20 -2144 0 -2029 0 -2068 20 -2144 25 -101 69 -176 144 -252 76 -75 151 -119 252 -144 76 -20 115 -20 2144 -20 2029 0 2068 0 2144 20 101 25 176 69 252 144 75 76 119 151 144 252 20 76 20 115 20 2144 0 2029 0 2068 -20 2144 -26 103 -69 177 -149 256 -79 77 -142 114 -247 140 -76 20 -117 20 -2148 19 -2010 0 -2073 -1 -2144 -19z m1890 -1407 c244 -356 448 -648 454 -649 5 -1 252 281 549 627 297 346 549 639 561 650 19 18 33 19 169 17 l148 -3 -628 -730 c-345 -401 -635 -739 -645 -750 -18 -20 -5 -40 686 -1045 387 -564 704 -1026 704 -1027 0 -2 -233 -3 -518 -3 l-518 0 -473 690 c-261 379 -477 688 -480 685 -4 -2 -272 -312 -596 -689 l-590 -686 -153 0 -154 0 40 48 c22 26 328 382 680 790 l640 744 -586 851 c-321 469 -627 914 -679 990 l-94 137 519 0 520 0 444 -647z" />
                <path d="M1252 4088 c44 -67 2142 -3065 2152 -3076 9 -9 67 -12 244 -10 l231 3 -1083 1550 -1084 1550 -237 3 -238 2 15 -22z" />
              </g>
            </svg>
          </a>
          <a href="https://www.linkedin.com/company/somo-kasane/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn"> {/* REPLACE WITH YOUR LINKEDIN URL */}
            <svg className="w-6 h-6" viewBox="0 0 512 512">
              <g transform="translate(0,512) scale(0.1,-0.1)" fill="currentColor">
                <path d="M259 5101 c-117 -37 -202 -123 -239 -240 -20 -62 -20 -89 -20 -2301 0 -2212 0 -2239 20 -2301 37 -119 123 -203 242 -241 57 -17 149 -18 2298 -18 2212 0 2239 0 2301 20 119 37 203 123 241 242 17 57 18 149 18 2298 0 2149 -1 2241 -18 2298 -38 119 -122 205 -241 242 -62 20 -88 20 -2305 19 -2124 0 -2244 -1 -2297 -18z m1396 -1097 c71 -25 156 -111 180 -184 58 -170 -20 -349 -179 -409 -187 -70 -377 -12 -462 141 -27 49 -29 61 -29 153 0 84 4 107 22 141 47 88 116 144 212 171 59 17 190 10 256 -13z m1900 -859 c101 -28 213 -92 285 -165 77 -78 123 -153 162 -262 55 -157 58 -195 58 -859 l0 -609 -310 0 -310 0 0 548 c0 432 -3 561 -14 613 -26 122 -75 192 -164 236 -79 39 -191 40 -272 2 -72 -34 -132 -96 -172 -177 l-33 -67 -3 -577 -3 -578 -310 0 -309 0 0 940 0 940 310 0 310 0 0 -132 1 -133 25 30 c14 17 43 51 64 77 73 86 217 165 345 188 71 13 269 4 340 -15z m-1737 -957 l2 -938 -315 0 -315 0 0 933 c0 514 3 937 7 940 4 4 144 6 312 5 l306 -3 3 -937z"/>
              </g>
            </svg>
          </a>
        </div>
        <p className="mt-5 text-xs text-[var(--ee-text-secondary)] relative z-10">© {new Date().getFullYear()} StrandsNation / SomoKasane. All Rights Reserved.</p>
      </footer>

      {showModal && (
        <div className="fixed inset-0 bg-[rgba(10,10,20,0.8)] backdrop-blur-sm flex items-center justify-center z-[10001] p-4">
          <div className="bg-[var(--ee-anchor)] border border-[var(--ee-accent1)] rounded-lg sm:rounded-xl p-5 sm:p-6 max-w-sm sm:max-w-md w-full relative shadow-2xl shadow-[var(--ee-accent1)]/20">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 text-[var(--ee-text-secondary)] hover:text-[var(--ee-text)] text-2xl leading-none"
              aria-label="Close modal"
            >
              ×
            </button>
            <h3 className="text-lg sm:text-xl font-bold text-[var(--ee-accent1)] mb-3">
              {modalMessage.includes('Thank you') ? 'Transmission Confirmed!' : 'Wallet Interface Required'}
            </h3>
            <p className="text-[var(--ee-text)] opacity-90 mb-4 sm:mb-5 text-sm sm:text-base leading-relaxed">{modalMessage}</p>
            <div className="flex flex-col gap-2.5">
              {modalMessage.includes('Thank you') && (
                <a
                  href="https://discord.gg/S4FehbCjfT" // Ensure this is your desired Discord link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glass primary w-full text-sm sm:text-base"
                >
                  <span className="btn-text-content">Join Comms Channel (Discord)</span>
                </a>
              )}
              {!modalMessage.includes('Thank you') && modalMessage.includes('Avalanche Network is not added') && (
                 <a
                  href="https://support.avax.network/en/articles/4626989-how-do-i-add-avalanche-to-metamask"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glass secondary w-full text-sm sm:text-base"
                >
                  <span className="btn-text-content">How to Add Avalanche</span>
                </a>
              )}
              <button
                  onClick={() => setShowModal(false)}
                  className="btn-glass tertiary w-full text-sm sm:text-base"
                >
                  <span className="btn-text-content">{modalMessage.includes('Thank you') ? 'Acknowledged' : 'Understood'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}