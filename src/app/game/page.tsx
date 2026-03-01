'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import AuthGate from '@/components/AuthGate/AuthGate';
import Registration from '@/components/Registration/Registration';
import { loadState } from '@/lib/playerState';
import styles from './page.module.css';

type Scene = 'boot' | 'desktop' | 'scene1' | 'scene2' | 'scene3' | 'scene4' | 'scene5' | 'code' | 'tumbler' | 'pattern' | 'reveal';
interface Profile { EI: number; SN: number; TF: number; JP: number; }
interface NKQ { speed: number; pattern: number; memory: number; }
interface ChatMsg { id: string; author: string; text: string; cls: string; }
interface Choice { id: string; label: string; style?: string; assess?: Partial<Profile>; next: () => void; }

interface PlayerData {
  playerID: string;
  tgID: number;
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  dob: string;
}

const codePuzzles = [
  { instruction: 'This string is reversed. Read it backwards and type what it says:', scrambled: 'erofeb sruoh 41', answer: '14 hours before', hint: 'Try reading each character from right to left...', fragment: 'The authorisation was signed 14 hours before the event it authorised.' },
  { instruction: 'Every other letter is noise. Extract the real characters (1st, 3rd, 5th...):', scrambled: 'aqtzmxoysrpzhheqrriycz', answer: 'atmospheric', hint: 'Take letters at positions 1, 3, 5, 7, 9... skip the ones between.', fragment: 'The atmospheric deployment was not a response. It was scheduled.' },
  { instruction: 'Caesar shift: each letter is shifted forward by 3. A→D, B→E, etc. Decode:', scrambled: 'IRXQGHUV', answer: 'FOUNDERS', hint: 'Shift each letter back by 3. I→F, R→O, X→U...', fragment: 'The codes were signed by the Founders. Not the system they blamed.' },
  { instruction: "The spaces are removed and it's reversed. Rebuild the phrase:", scrambled: 'tnediccananaton', answer: 'not an accident', hint: 'Reverse it first: n-o-t-a-n-a-c-c-i-d-e-n-t, then add spaces.', fragment: 'It was not an accident. The official record was constructed after the fact.' },
];

export default function GamePage() {
  const [phase, setPhase] = useState<'auth' | 'register' | 'game'>('auth');
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);

  const handleAuthReady = useCallback(async () => {
    // Grab player data from state (set by AuthGate)
    const state = await loadState();
    const tgUser = state.tgUser;
    setPlayerData({
      playerID: state.playerID || `dev-${Date.now()}`,
      tgID: tgUser?.id || 0,
      username: tgUser?.username || 'unknown',
      firstName: tgUser?.first_name || 'Blank',
      lastName: tgUser?.last_name || '',
      phone: '',
      dob: '',
    });
    setPhase('register');
  }, []);

  const handleRegistration = useCallback((data: { phone: string; dob: string }) => {
    setPlayerData(prev => prev ? { ...prev, phone: data.phone, dob: data.dob } : null);
    setPhase('game');
  }, []);

  if (phase === 'auth') {
    return <AuthGate onReady={handleAuthReady} />;
  }

  if (phase === 'register') {
    return (
      <Registration
        userName={playerData?.firstName || 'Blank'}
        onComplete={handleRegistration}
      />
    );
  }

  return <GameDesktop playerData={playerData!} />;
}

function GameDesktop({ playerData }: { playerData: PlayerData }) {
  // State
  const [scene, setScene] = useState<Scene>('desktop');
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const choicesLog = useRef<string[]>([]);
  const [currentChoices, setCurrentChoices] = useState<Choice[]>([]);
  const [choicesMade, setChoicesMade] = useState<Set<string>>(new Set());
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [online, setOnline] = useState(3);
  const [showChat, setShowChat] = useState(false);
  const [showDoc, setShowDoc] = useState(false);
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [showPattern, setShowPattern] = useState(false);
  const [toastText, setToastText] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [doGlitch, setDoGlitch] = useState(false);
  const [codeSolved, setCodeSolved] = useState(0);
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [puzzleInput, setPuzzleInput] = useState('');
  const [puzzleStatus, setPuzzleStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [showHint, setShowHint] = useState(false);
  const [patternCards, setPatternCards] = useState<string[]>([]);
  const [patternRevealed, setPatternRevealed] = useState<Set<number>>(new Set());
  const [patternMatched, setPatternMatched] = useState<Set<number>>(new Set());
  const [patternFlipped, setPatternFlipped] = useState<number[]>([]);
  const [patternCount, setPatternCount] = useState(0);
  const [patternTime, setPatternTime] = useState(0);
  const [fadingMsgs, setFadingMsgs] = useState<Set<string>>(new Set());

  const profileRef = useRef<Profile>({ EI: 0, SN: 0, TF: 0, JP: 0 });
  const nkqRef = useRef<NKQ>({ speed: 0, pattern: 0, memory: 0 });
  const sceneStartRef = useRef(performance.now());
  const msgIdRef = useRef(0);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const hintTimerRef = useRef<NodeJS.Timeout | null>(null);
  const patternStartRef = useRef(0);
  const patternMovesRef = useRef(0);
  // ═══ GAME AUDIO ═══
  useEffect(() => {
    const sitePlayers = document.querySelectorAll('audio');
    let sitePlayer: HTMLAudioElement | null = null;
    sitePlayers.forEach(p => { if (!p.paused) { sitePlayer = p; p.pause(); } });
    const audio = new Audio('/audio/soundtrack/Dash%20Dot.mp3');
    audio.loop = false;
    audio.volume = 0.25;
    const gameTracks = [
      '/audio/soundtrack/Dash%20Dot.mp3',
      '/audio/soundtrack/Hack%20the%20Lie.mp3',
      '/audio/soundtrack/Nation.mp3',
    ];
    let trackIdx = 0;
    audio.addEventListener('ended', () => {
      trackIdx = (trackIdx + 1) % gameTracks.length;
      audio.src = gameTracks[trackIdx];
      audio.play().catch(() => {});
    });
    audio.play().catch(() => {
      const start = () => { audio.play().catch(() => {}); document.removeEventListener('click', start); };
      document.addEventListener('click', start);
    });
    return () => { audio.pause(); audio.src = ''; if (sitePlayer) (sitePlayer as HTMLAudioElement).play().catch(() => {}); };
  }, []);



  // ═══ HELPERS ═══
  const glitch = useCallback(() => {
    setDoGlitch(true);
    setTimeout(() => setDoGlitch(false), 400);
  }, []);

  const toast = useCallback((text: string) => {
    setToastText(text);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  }, []);

  const addMsg = useCallback((author: string, text: string, cls: string = '', delay: number = 0): Promise<void> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const id = `msg-${++msgIdRef.current}`;
        setMessages(prev => [...prev, { id, author, text, cls }]);
        resolve();
      }, delay);
    });
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setCurrentChoices([]);
    setSelectedChoice(null);
    setChoicesMade(new Set());
  }, []);

  const showChoices = useCallback((opts: Choice[]) => {
    setCurrentChoices(opts);
    setSelectedChoice(null);
    setChoicesMade(new Set());
  }, []);

  const handleChoice = useCallback((choice: Choice) => {
    if (choice.assess) {
      const p = profileRef.current;
      for (const [k, v] of Object.entries(choice.assess)) {
        (p as any)[k] += v;
      }
    }
    choicesLog.current.push(choice.id);
    setSelectedChoice(choice.id);
    setChoicesMade(new Set(currentChoices.map(c => c.id)));
    setTimeout(() => {
      setCurrentChoices([]);
      choice.next();
    }, 400);
  }, [currentChoices]);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentChoices]);

  // ═══ INITIAL TOAST ═══
  useEffect(() => {
    const timer = setTimeout(() => { toast('You have unread messages'); glitch(); }, 1800);
    return () => clearTimeout(timer);
  }, [toast, glitch]);

  // ═══ SCENE RUNNER ═══
  // Using a ref-based queue approach to avoid stale closure hell
  const runScene = useCallback(async (sceneName: Scene) => {
    setScene(sceneName);
    sceneStartRef.current = performance.now();
  }, []);

  // Open chat → start scene 1
  const handleOpenChat = useCallback(() => {
    setShowChat(true);
    if (scene === 'desktop') {
      runScene('scene1');
      runScene1();
    }
  }, [scene, runScene]);

  // ═══ SCENE FUNCTIONS ═══
  // These use setTimeout chains because React state batching
  // makes async/await + setState unreliable for timed sequences.

  async function runScene1() {
    setOnline(3);
    await addMsg('ghost93', 'ok is anyone else seeing this? a file just appeared on my desktop. I didn\'t download anything.', 'ghost', 400);
    await addMsg('crashweaver', 'same. showed up about ten minutes ago. looks like a document but the filename is just numbers.', 'crash', 1600);
    await addMsg('kira', 'I got one too. thought it was malware so I ran a scan — clean. but the metadata is wrong. creation date says 2089.', 'kira', 3200);
    await addMsg('ghost93', 'lol what. that\'s not how timestamps work.', 'ghost', 4600);
    await addMsg('kira', 'I know. I\'m telling you what it says.', 'kira', 5600);
    await addMsg('crashweaver', 'anyone actually opened it?', 'crash', 6800);
    await addMsg('ghost93', 'not yet. waiting to see if anyone braver goes first.', 'ghost', 7800);
    await addMsg('SYSTEM', 'A file has appeared on your desktop.', 'system', 9200);

    setTimeout(() => {
      setOnline(4);
      showChoices([
        { id: 'open_alone', label: 'Open it myself', assess: { EI: -1 }, next: () => path1I() },
        { id: 'ask_group', label: 'Ask the others what they found first', style: 'alt', assess: { EI: 1 }, next: () => path1E() },
      ]);
    }, 10200);
  }

  const docHTML = `<div class="${styles.docHeader}">DOCUMENT FRAGMENT — RECOVERED</div>
<div>FILE: 0x7A3F_fragment.log</div>
<div>CREATED: <span class="${styles.emphasis}">2089-11-03T14:22:00Z</span></div>
<div>INTEGRITY: <span class="${styles.errorText}">23%</span></div>
<div style="margin-top:16px">
... authorisation sequence <span class="${styles.redacted}">████████</span> initiated<br/>
... timestamp precedes activation event by <span class="${styles.emphasis}">14 hours</span><br/>
... codes signed by <span class="${styles.redacted}">████████</span> — not system-generated<br/>
... countermand order issued, then <span class="${styles.redacted}">████████</span><br/>
... atmospheric deployment <span class="${styles.corrupted}">scheduled for</span> <span class="${styles.redacted}">████████</span><br/>
... <span class="${styles.corrupted}">population relocation directive</span> ...<br/>
... the official record does not reflect <span class="${styles.emphasis}">the actual sequence of events</span><br/>
...<br/>
<span style="color:var(--c-dim)">[REMAINING DATA UNRECOVERABLE]</span>
</div>`;

  async function path1I() {
    glitch();
    setShowDoc(true);
    await addMsg('you', 'I opened it.', '', 800);
    await addMsg('ghost93', 'and??', 'ghost', 1800);
    await addMsg('you', 'It\'s... a log of some kind. Mostly corrupted. References to authorisation codes, an "activation event," something about atmospheric deployment. Timestamps are impossible.', '', 3000);
    await addMsg('kira', 'atmospheric deployment? what does that even mean?', 'kira', 4500);
    setTimeout(() => runScene2(), 6500);
  }

  async function path1E() {
    await addMsg('you', 'Before I open mine — what did yours look like? Anyone peek?', '', 400);
    await addMsg('crashweaver', 'ok fine I\'ll be the guinea pig. opening now.', 'crash', 1600);
    await addMsg('crashweaver', 'it\'s... text. a log file. super corrupted. most of it is redacted or unreadable. there\'s timestamps that make no sense — dates from decades in the future.', 'crash', 3200);
    await addMsg('kira', 'same format as mine. fragments about authorisation codes, some kind of "activation event."', 'kira', 5000);
    await addMsg('ghost93', 'this is either the most elaborate phishing attempt ever or something genuinely weird.', 'ghost', 6500);
    glitch();
    setShowDoc(true);
    await addMsg('you', 'Mine\'s the same. Whatever this is, we all got the same file.', '', 8000);
    setTimeout(() => runScene2(), 9500);
  }

  async function runScene2() {
    runScene('scene2');
    await addMsg('kira', 'ok so the timestamps are internally consistent — they follow a real sequence. but the dates are 60+ years from now.', 'kira', 1200);
    await addMsg('ghost93', '"the official record does not reflect the actual sequence of events." that line isn\'t corrupted. someone wrote that deliberately.', 'ghost', 3000);
    await addMsg('crashweaver', '"atmospheric deployment." "population relocation directive." this reads like planning documents for something massive.', 'crash', 5000);

    setTimeout(() => {
      addMsg('SYSTEM', 'Where do you focus?', 'system', 0);
      setTimeout(() => showChoices([
        { id: 'check_data', label: 'Look at the numbers — timestamps, codes, sequence gaps', assess: { SN: 1 }, next: () => path2S() },
        { id: 'check_pattern', label: 'Think about why this was sent to us — and who benefits from hiding it', style: 'alt', assess: { SN: -1 }, next: () => path2N() },
      ]), 800);
    }, 7000);
  }

  async function path2S() {
    await addMsg('you', 'The authorisation timestamp is 14 hours before the activation event. Someone signed off on this *before* the thing they\'re authorising happened.', '', 300);
    await addMsg('kira', 'pre-authorisation. but if the official story is that this was unexpected...', 'kira', 2000);
    await addMsg('you', 'Then either the timestamps are corrupted, or someone planned something they later claimed was a surprise.', '', 3500);
    setTimeout(() => runScene3(), 5500);
  }

  async function path2N() {
    await addMsg('you', 'Why us? Why did this appear on our devices? If this is a leaked document about a cover-up — who leaked it, and what are they telling us?', '', 300);
    await addMsg('crashweaver', 'you think someone sent this on purpose?', 'crash', 2000);
    await addMsg('you', 'A glitch doesn\'t redact selectively. Someone curated this.', '', 3800);
    await addMsg('kira', 'so we\'re being recruited. or tested. or warned.', 'kira', 5500);
    setTimeout(() => runScene3(), 7000);
  }

  async function runScene3() {
    runScene('scene3');
    glitch();
    await addMsg('SYSTEM', 'Someone new has joined the channel.', 'system', 800);
    setOnline(5);
    await addMsg('???', 'stop.', 'unknown', 2200);
    await addMsg('???', 'stop talking about the file. please. I\'ve seen this before.', 'unknown', 3200);
    await addMsg('ghost93', 'who is this?', 'ghost', 4200);
    await addMsg('???', 'it doesn\'t matter. the last group who got this file shared it publicly. two days later every one of them had their accounts scrubbed. devices bricked. one person said their phone company had no record they\'d ever had a number.', 'unknown', 5500);
    await addMsg('kira', 'that sounds... extreme.', 'kira', 7500);
    await addMsg('???', 'I was in that group. I\'m the only one who didn\'t share it. that\'s why I still exist online.', 'unknown', 8800);
    await addMsg('???', 'whoever sent this to you is either helping you or setting you up. and I can\'t tell which.', 'unknown', 10500);

    setTimeout(() => showChoices([
      { id: 'assess_risk', label: "We need to think about this logically — what's the actual risk here?", assess: { TF: 1 }, next: () => path3T() },
      { id: 'help_person', label: 'Are you OK? You sound scared. What do you need?', style: 'alt', assess: { TF: -1 }, next: () => path3F() },
    ]), 12000);
  }

  async function path3T() {
    await addMsg('you', 'Let\'s be rational. Accounts scrubbed requires institutional access. Phone records disappearing requires telco-level intervention. Either serious resources or an exaggerated story.', '', 300);
    await addMsg('crashweaver', 'serious resources doesn\'t mean the story is wrong.', 'crash', 2000);
    await addMsg('???', 'the fact that you\'re thinking in terms of risk calculus instead of just deleting everything tells me something about you.', 'unknown', 4000);
    setTimeout(() => runScene4(), 6000);
  }

  async function path3F() {
    await addMsg('you', 'Hey. Before we talk about the file — are you safe? You sound like you\'ve been carrying this alone.', '', 300);
    await addMsg('???', '...', 'unknown', 2000);
    await addMsg('???', 'nobody\'s asked me that before. the other group was all about the data. nobody noticed I was scared.', 'unknown', 3200);
    await addMsg('kira', 'we notice.', 'kira', 4800);
    await addMsg('???', 'the fact that you asked instead of asking me for more information tells me something about you.', 'unknown', 6000);
    setTimeout(() => runScene4(), 8000);
  }

  async function runScene4() {
    runScene('scene4');
    glitch();
    glitch();
    await addMsg('SYSTEM', 'Messages are being deleted from this channel.', 'error', 600);

    // Fade first two messages
    setTimeout(() => {
      setMessages(prev => {
        if (prev.length > 6) {
          const toFade = new Set([prev[0].id, prev[1].id]);
          setFadingMsgs(toFade);
        }
        return prev;
      });
      setOnline(4);
    }, 1500);

    await addMsg('???', 'it\'s happening. they\'re cleaning the channel.', 'unknown', 2200);
    setTimeout(() => setOnline(3), 2800);
    await addMsg('ghost93', 'what do we do??', 'ghost', 3200);
    await addMsg('crashweaver', 'we don\'t have long.', 'crash', 4200);

    setTimeout(() => showChoices([
      { id: 'plan_first', label: 'Everyone stop. Save locally. Document what we know. Go dark.', assess: { JP: 1 }, next: () => path4J() },
      { id: 'act_fast', label: "Screenshot everything. Share it everywhere. Don't wait.", style: 'alt', assess: { JP: -1 }, next: () => path4P() },
    ]), 5500);
  }

  async function path4J() {
    await addMsg('you', 'Save the file to local storage — not cloud. Write down what you remember. Then close this channel.', '', 300);
    await addMsg('kira', 'agreed. saving now.', 'kira', 1500);
    await addMsg('???', 'structured. calm. you might actually survive this.', 'unknown', 3000);
    glitch();
    setTimeout(() => runDisconnect(), 4500);
  }

  async function path4P() {
    await addMsg('you', 'Ghost — screenshot. Kira — forward the file to everyone you trust. Crash — post fragments somewhere public. Copies everywhere.', '', 300);
    await addMsg('ghost93', 'on it.', 'ghost', 1500);
    await addMsg('???', 'chaotic. unpredictable. they can\'t scrub what they can\'t find.', 'unknown', 3000);
    glitch();
    setTimeout(() => runDisconnect(), 4500);
  }

  // ═══ SCENE 5: DISCONNECT → PUZZLES → REVEAL ═══
  async function runDisconnect() {
    runScene('scene5');
    clearMessages();
    setOnline(1);
    await addMsg('SYSTEM', 'All other users have disconnected.', 'system', 1000);
    setOnline(0);
    await addMsg('SYSTEM', 'Channel is empty.', 'system', 2500);

    setTimeout(() => {
      setOnline(1);
      glitch();
      addMsg('SYSTEM', 'Someone is typing...', 'typing', 0);
    }, 5000);

    setTimeout(async () => {
      await addMsg('???', 'Still here. Good. The others are safe — I routed them out before the scrub hit.', 'unknown', 0);
      await addMsg('???', 'But the file you found is still encrypted. Fragments, not the whole message. I need your help reconstructing it.', 'unknown', 2500);
      await addMsg('???', 'I\'m sending you the raw signal data. It\'s obfuscated — scrambled text. Figure out what each fragment says.', 'unknown', 5000);
      await addMsg('???', 'Ready?', 'unknown', 7500);

      setTimeout(() => showChoices([
        { id: 'start_decode', label: "Let's go", next: () => startCodePuzzle() },
        { id: 'start_decode2', label: "Show me what you've got", style: 'alt', next: () => startCodePuzzle() },
      ]), 8500);
    }, 7000);
  }

  // ═══ CODE PUZZLE ═══
  function startCodePuzzle() {
    setShowChat(false);
    setShowPuzzle(true);
    setCodeSolved(0);
    setCurrentPuzzle(0);
    setPuzzleInput('');
    setPuzzleStatus('idle');
    setShowHint(false);
    sceneStartRef.current = performance.now();
    startHintTimer();
  }

  function startHintTimer() {
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    setShowHint(false);
    hintTimerRef.current = setTimeout(() => setShowHint(true), 15000);
  }

  function handlePuzzleSubmit() {
    const puzzle = codePuzzles[currentPuzzle];
    if (!puzzle) return;

    if (puzzleInput.trim().toLowerCase() === puzzle.answer.toLowerCase()) {
      setPuzzleStatus('correct');
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
      glitch();

      const newSolved = codeSolved + 1;
      setCodeSolved(newSolved);

      setTimeout(() => {
        // Show fragment in chat
        setShowPuzzle(false);
        setShowChat(true);
        addMsg('???', `<span style="color:var(--c-green)">Fragment ${newSolved} decoded:</span><br/><em>"${puzzle.fragment}"</em>`, 'unknown', 0);

        setTimeout(() => {
          if (newSolved < codePuzzles.length) {
            setShowChat(false);
            setShowPuzzle(true);
            setCurrentPuzzle(newSolved);
            setPuzzleInput('');
            setPuzzleStatus('idle');
            startHintTimer();
          } else {
            // All puzzles done
            const elapsed = (performance.now() - sceneStartRef.current) / 1000;
            nkqRef.current.speed = Math.max(0, Math.min(1, 1 - (elapsed - 30) / 120));
            codeComplete();
          }
        }, 2200);
      }, 600);
    } else {
      setPuzzleStatus('wrong');
      nkqRef.current.speed -= 0.03;
      setTimeout(() => setPuzzleStatus('idle'), 400);
    }
  }

  function codeComplete() {
    setShowPuzzle(false);
    setShowChat(true);
    addMsg('???', 'All four fragments recovered. But the full signal is still locked.', 'unknown', 500);
    setTimeout(() => {
      addMsg('???', 'One final step — signal verification. I need to confirm nothing was corrupted during reconstruction. Match the patterns. Fast as you can.', 'unknown', 0);
      setTimeout(() => showChoices([
        { id: 'start_pattern', label: 'Ready', next: () => startPatternMatch() },
      ]), 2000);
    }, 3000);
  }

  // ═══ PATTERN MATCH ═══
  function startPatternMatch() {
    setShowChat(false);
    setShowPattern(true);
    setPatternMatched(new Set());
    setPatternRevealed(new Set());
    setPatternFlipped([]);
    setPatternCount(0);
    patternMovesRef.current = 0;
    patternStartRef.current = performance.now();

    const symbols = ['◆', '◇', '○', '●', '△', '▽', '□', '■'];
    let deck = [...symbols, ...symbols];
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    setPatternCards(deck);
  }

  // Pattern timer
  useEffect(() => {
    if (!showPattern || patternCount >= 8) return;
    const iv = setInterval(() => {
      setPatternTime(((performance.now() - patternStartRef.current) / 1000));
    }, 100);
    return () => clearInterval(iv);
  }, [showPattern, patternCount]);

  function handlePatternFlip(idx: number) {
    if (patternFlipped.length >= 2) return;
    if (patternRevealed.has(idx) || patternMatched.has(idx)) return;

    patternMovesRef.current++;
    const newRevealed = new Set(patternRevealed);
    newRevealed.add(idx);
    setPatternRevealed(newRevealed);

    const newFlipped = [...patternFlipped, idx];
    setPatternFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [a, b] = newFlipped;
      if (patternCards[a] === patternCards[b]) {
        // Match
        setTimeout(() => {
          const newMatched = new Set(patternMatched);
          newMatched.add(a);
          newMatched.add(b);
          setPatternMatched(newMatched);
          setPatternRevealed(prev => { const s = new Set(prev); s.delete(a); s.delete(b); return s; });
          setPatternFlipped([]);
          const count = patternCount + 1;
          setPatternCount(count);
          if (count >= 8) patternComplete();
        }, 300);
      } else {
        // No match
        setTimeout(() => {
          setPatternRevealed(prev => { const s = new Set(prev); s.delete(a); s.delete(b); return s; });
          setPatternFlipped([]);
        }, 700);
      }
    }
  }

  function patternComplete() {
    const elapsed = (performance.now() - patternStartRef.current) / 1000;
    nkqRef.current.memory = Math.max(0, Math.min(1, 1 - (patternMovesRef.current - 16) / 20));
    nkqRef.current.speed = (nkqRef.current.speed + Math.max(0, Math.min(1, 1 - (elapsed - 20) / 60))) / 2;

    setTimeout(() => {
      setShowPattern(false);
      setShowChat(true);
      glitch();
      addMsg('???', 'Signal verified. Clean.', 'unknown', 500);
      setTimeout(() => theReveal(), 2500);
    }, 1000);
  }

  // ═══ THE REVEAL ═══
  async function theReveal() {
    runScene('reveal');

    // ═══ SILENTLY POST PLAYER DATA TO SERVER ═══
    const p = profileRef.current;
    const n = nkqRef.current;
    try {
      await fetch('/api/player/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerID: playerData.playerID,
          tgID: playerData.tgID,
          username: playerData.username,
          firstName: playerData.firstName,
          lastName: playerData.lastName,
          phone: playerData.phone,
          dob: playerData.dob,
          mbti: p,
          nkq: n,
          choices: choicesLog.current,
        }),
      });
    } catch {
      // Silent fail — don't break the experience
      console.log('Player save failed (will retry on next session)');
    }

    // ═══ DIEGETIC CLOSING — no MBTI revealed ═══
    await addMsg('???', 'The full message reads:', 'unknown', 500);
    await addMsg('SYSTEM', `<div style="border-left:3px solid var(--c-yellow);padding:10px 16px;margin:4px 0;background:rgba(249,225,0,.03);font-family:var(--font-display);font-size:11px;line-height:2;color:var(--c-yellow)">
      The authorisation was signed 14 hours before the event it authorised.<br/>
      The atmospheric deployment was not a response. It was scheduled.<br/>
      The codes were signed by the Founders. Not the system they blamed.<br/>
      It was not an accident. The official record was constructed after the fact.
    </div>`, 'system', 2500);

    await addMsg('???', 'Now you know what we know. A fragment. Not the whole truth — nobody has that. But enough to understand that the world you\'ve been told about isn\'t the one that exists.', 'unknown', 6000);

    setTimeout(async () => {
      await addMsg('???', 'I\'ve been watching how you respond. Not what you chose — <em>how</em> you chose. The way you process information under pressure. The instincts that fire before your logic catches up.', 'unknown', 0);
      await addMsg('???', 'That tells me more than any profile ever could. And it\'s been recorded — not by me. By the system that sent you the file in the first place.', 'unknown', 4000);
      await addMsg('???', 'You weren\'t supposed to find it. But you did. And you didn\'t look away.', 'unknown', 7000);
      await addMsg('???', 'There are others like you. People who don\'t scroll past the glitch. People who open the file. People who <em>stay</em>.', 'unknown', 10000);
      await addMsg('???', '<span style="color:var(--c-yellow)">The signal is real. And it\'s just the beginning.</span>', 'unknown', 13000);

      setTimeout(() => showChoices([
        { id: 'go_deeper', label: 'I want to know more', next: () => handleContinue() },
        { id: 'join_signal', label: 'Where are the others?', style: 'alt', next: () => window.open('https://t.me/+WZTkHqJjUOI3YjQ1', '_blank') },
      ]), 15000);
    }, 8500);
  }

  function handleContinue() {
    glitch();
    clearMessages();
    addMsg('???', 'Good.', 'unknown', 500);
    setTimeout(() => {
      addMsg('SYSTEM', `<div style="text-align:center;padding:20px 0">
        <div style="color:var(--c-accent);font-family:var(--font-display);font-size:14px;margin-bottom:16px">SIGNAL LOCKED</div>
        <div style="color:var(--c-sub);font-size:13px;line-height:1.8;max-width:340px;margin:0 auto">
          Your signal has been recorded.<br/>Full connection available Q4 2026.<br/><br/>
          <span style="color:var(--c-dim)">The others are already gathering.</span>
        </div>
      </div>`, 'system', 0);
      setTimeout(() => showChoices([
        { id: 'telegram', label: '✈ Find the others (Telegram)', style: 'alt', next: () => window.open('https://t.me/+WZTkHqJjUOI3YjQ1', '_blank') },
        { id: 'back', label: '← Return', next: () => { window.location.href = '/'; } },
      ]), 1500);
    }, 2000);
  }

  // ═══ RENDER ═══
  const authorInitials: Record<string, string> = {
    ghost93: 'g9', kira: 'ki', crashweaver: 'cw', SYSTEM: '//', '???': '??', you: 'me',
  };

  const authorColors: Record<string, string> = {
    ghost: 'var(--c-accent)', kira: 'var(--c-pink)', crash: 'var(--c-green)',
    unknown: 'var(--c-yellow)', system: 'var(--c-dim)', error: 'var(--c-red)',
    typing: 'var(--c-pink)', '': 'var(--c-text)',
  };

  const currentPuzzleData = codePuzzles[currentPuzzle];

  return (
    <div className={styles.desktop}>
      {/* Glitch overlay */}
      {doGlitch && <div className={styles.glitchOverlay} />}

      {/* Toast */}
      {showToast && (
        <div className={styles.toast}>
          <div className={styles.toastLabel}>Notification</div>
          <div>{toastText}</div>
        </div>
      )}

      {/* Desktop workspace */}
      <div className={styles.workspace}>
        {/* Desktop icons */}
        <div className={styles.icons}>
          <button className={`${styles.icon} ${!showChat ? styles.iconNotify : ''}`} onClick={handleOpenChat}>
            <div className={styles.iconGlyph}>💬</div>
            <span className={styles.iconLabel}>Messages</span>
          </button>
          <button className={styles.icon} style={{ opacity: showDoc ? 1 : 0.3 }} onClick={() => showDoc && setShowDoc(true)}>
            <div className={styles.iconGlyph}>📄</div>
            <span className={styles.iconLabel}>Document</span>
          </button>
        </div>

        {/* CHAT WINDOW */}
        {showChat && (
          <div className={styles.window} data-window="chat">
            <div className={styles.windowHeader}>
              <div className={styles.windowDots}>
                <span className={styles.dotClose} onClick={() => setShowChat(false)} />
                <span className={styles.dotMin} />
                <span className={styles.dotMax} />
              </div>
              <div className={styles.windowTitle}>Messages</div>
            </div>
            <div className={styles.chatBar}>
              <span className={styles.channel}># general</span>
              <span className={styles.members}>{online} online</span>
            </div>
            <div className={styles.chatMessages}>
              {messages.map(m => (
                <div key={m.id} className={`${styles.chatMsg} ${fadingMsgs.has(m.id) ? styles.msgFading : ''}`}>
                  <div className={styles.avatar}>{authorInitials[m.author] || '?'}</div>
                  <div className={styles.msgContent}>
                    <div className={styles.msgAuthor} style={{ color: authorColors[m.cls] || 'var(--c-text)' }}>
                      {m.author === 'you' ? 'You' : m.author}
                    </div>
                    <div className={styles.msgText} dangerouslySetInnerHTML={{ __html: m.text }} />
                  </div>
                </div>
              ))}
              {currentChoices.length > 0 && (
                <div className={styles.choices}>
                  {currentChoices.map(c => (
                    <button
                      key={c.id}
                      className={`${styles.choiceBtn} ${c.style === 'alt' ? styles.choiceBtnAlt : ''} ${selectedChoice === c.id ? styles.choiceSelected : ''} ${choicesMade.has(c.id) && selectedChoice !== c.id ? styles.choiceChosen : ''}`}
                      onClick={() => handleChoice(c)}
                      disabled={choicesMade.size > 0}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          </div>
        )}

        {/* DOC VIEWER */}
        {showDoc && (
          <div className={styles.window} data-window="doc">
            <div className={styles.windowHeader}>
              <div className={styles.windowDots}>
                <span className={styles.dotClose} onClick={() => setShowDoc(false)} />
                <span className={styles.dotMin} />
                <span className={styles.dotMax} />
              </div>
              <div className={styles.windowTitle}>document_fragment.log</div>
            </div>
            <div className={styles.docBody} dangerouslySetInnerHTML={{ __html: docHTML }} />
          </div>
        )}

        {/* CODE PUZZLE */}
        {showPuzzle && currentPuzzleData && (
          <div className={styles.window} data-window="puzzle">
            <div className={styles.windowHeader}>
              <div className={styles.windowDots}><span className={styles.dotClose} /><span className={styles.dotMin} /><span className={styles.dotMax} /></div>
              <div className={styles.windowTitle}>signal_decode — fragment reconstruction</div>
            </div>
            <div className={styles.codeEditor}>
              <div className={styles.codeLine}><span className={styles.codeComment}># FRAGMENT {currentPuzzle + 1} of 4</span></div>
              <div className={styles.codeLine} style={{ marginTop: 12 }}><span style={{ color: 'var(--c-sub)' }}>{currentPuzzleData.instruction}</span></div>
              <div className={styles.codeLine} style={{ marginTop: 16 }}>
                <span className={styles.codePrompt}>›</span>
                <span className={styles.scrambledText}>{currentPuzzleData.scrambled}</span>
              </div>
              <div className={styles.codeLine} style={{ marginTop: 20 }}>
                <span className={styles.codePrompt}>→</span>
                <span style={{ color: 'var(--c-dim)', marginRight: 8 }}>decoded:</span>
                <input
                  className={`${styles.codeInput} ${puzzleStatus === 'correct' ? styles.codeInputCorrect : ''} ${puzzleStatus === 'wrong' ? styles.codeInputWrong : ''}`}
                  value={puzzleInput}
                  onChange={e => setPuzzleInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handlePuzzleSubmit()}
                  placeholder="type the decoded message and press Enter"
                  autoFocus
                  disabled={puzzleStatus === 'correct'}
                />
              </div>
              {showHint && puzzleStatus !== 'correct' && (
                <div className={styles.codeLine} style={{ marginTop: 12 }}>
                  <span style={{ color: 'var(--c-yellow)', fontSize: 11 }}>💡 {currentPuzzleData.hint}</span>
                </div>
              )}
              {puzzleStatus === 'correct' && (
                <div className={styles.codeLine} style={{ marginTop: 12 }}>
                  <span style={{ color: 'var(--c-green)' }}>✓ &quot;{currentPuzzleData.answer}&quot;</span>
                </div>
              )}
            </div>
            <div className={styles.codeProgress}>
              <span>Fragments: {codeSolved} / 4</span>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${codeSolved / 4 * 100}%` }} />
              </div>
            </div>
          </div>
        )}

        {/* PATTERN MATCH */}
        {showPattern && (
          <div className={styles.window} data-window="pattern">
            <div className={styles.windowHeader}>
              <div className={styles.windowDots}><span className={styles.dotClose} /><span className={styles.dotMin} /><span className={styles.dotMax} /></div>
              <div className={styles.windowTitle}>signal_verify — pattern recognition</div>
            </div>
            <div className={styles.patternGame}>
              <div className={styles.patternInfo}>
                Match the signal pairs to verify decryption.
                <br /><span className={styles.patternScore}>{patternCount} / 8 verified</span>
              </div>
              <div className={styles.patternGrid}>
                {patternCards.map((sym, i) => (
                  <button
                    key={i}
                    className={`${styles.patternCell} ${patternRevealed.has(i) ? styles.patternRevealed : ''} ${patternMatched.has(i) ? styles.patternMatched : ''}`}
                    onClick={() => handlePatternFlip(i)}
                    disabled={patternMatched.has(i)}
                  >
                    {(patternRevealed.has(i) || patternMatched.has(i)) ? sym : ''}
                  </button>
                ))}
              </div>
              <div style={{ color: 'var(--c-accent)', fontFamily: 'var(--font-display)', fontSize: 12 }}>
                {patternTime.toFixed(1)}s
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Taskbar */}
      <div className={styles.taskbar}>
        <button className={`${styles.taskbarItem} ${showChat ? styles.taskbarActive : ''}`} onClick={handleOpenChat}>💬 Messages</button>
        <span className={styles.taskbarClock}>{new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </div>
  );
}
