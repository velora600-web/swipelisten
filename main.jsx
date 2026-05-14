import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Clock, Headphones, Gauge, Sparkles, RotateCcw, BookOpen, Mic, Video, GraduationCap, ExternalLink, Moon, Sun, Search, DollarSign } from 'lucide-react';
import './styles.css';

const affiliateLinks = {
  audible: '#replace-with-your-audible-affiliate-link',
  speechify: '#replace-with-your-ai-voice-tool-affiliate-link',
  blinkist: '#replace-with-your-summary-app-affiliate-link'
};

function formatDuration(mins) {
  const rounded = Math.max(0, Math.round(mins || 0));
  const h = Math.floor(rounded / 60);
  const m = rounded % 60;
  if (h <= 0) return `${m} min`;
  if (m === 0) return `${h} hr${h === 1 ? '' : 's'}`;
  return `${h} hr${h === 1 ? '' : 's'} ${m} min`;
}

function Calculator({ mode = 'audiobook' }) {
  const labels = {
    audiobook: 'Audiobook length',
    podcast: 'Podcast length',
    youtube: 'Video length',
    course: 'Course length',
    lecture: 'Lecture length'
  };
  const [hours, setHours] = useState(8);
  const [minutes, setMinutes] = useState(30);
  const [speed, setSpeed] = useState(1.5);
  const [startTime, setStartTime] = useState('');

  const totalMinutes = Math.max(0, Number(hours || 0) * 60 + Number(minutes || 0));
  const results = useMemo(() => {
    const playbackMinutes = speed > 0 ? totalMinutes / speed : 0;
    const savedMinutes = Math.max(0, totalMinutes - playbackMinutes);
    let finishAt = 'Add a start time';
    if (startTime && playbackMinutes > 0) {
      const [h, m] = startTime.split(':').map(Number);
      const start = new Date();
      start.setHours(h, m, 0, 0);
      start.setMinutes(start.getMinutes() + Math.round(playbackMinutes));
      finishAt = start.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    }
    return {
      original: formatDuration(totalMinutes),
      playback: formatDuration(playbackMinutes),
      saved: formatDuration(savedMinutes),
      finishAt,
      percentFaster: Math.round((speed - 1) * 100)
    };
  }, [totalMinutes, speed, startTime]);

  const reset = () => { setHours(8); setMinutes(30); setSpeed(1.5); setStartTime(''); };
  const presets = [0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3];

  return <section id="calculator" className="calculator-grid">
    <div className="panel form-panel">
      <h2>{labels[mode] || 'Content length'}</h2>
      <p>Enter the original length and choose any playback speed.</p>
      <div className="two-col">
        <label>Hours<input type="number" min="0" value={hours} onChange={e => setHours(e.target.value)} /></label>
        <label>Minutes<input type="number" min="0" max="59" value={minutes} onChange={e => setMinutes(e.target.value)} /></label>
      </div>
      <label className="range-label"><span>Playback speed <b>{speed}x</b></span><input type="range" min="0.5" max="3.5" step="0.05" value={speed} onChange={e => setSpeed(Number(e.target.value))} /></label>
      <div className="preset-grid">{presets.map(p => <button key={p} onClick={() => setSpeed(p)} className={speed === p ? 'active' : ''}>{p}x</button>)}</div>
      <label>Start time optional<input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} /></label>
      <button className="reset" onClick={reset}><RotateCcw size={18}/> Reset calculator</button>
    </div>
    <div className="results-grid">
      <Result icon={<Clock/>} label="Original length" value={results.original}/>
      <Result icon={<Gauge/>} label="Listening time" value={results.playback} highlight/>
      <Result icon={<Sparkles/>} label="Time saved" value={results.saved}/>
      <Result icon={<Clock/>} label="Finish time" value={results.finishAt}/>
      <div className="panel result-summary">
        <h2>Your result</h2>
        <p>A {results.original} {mode} played at <strong>{speed}x</strong> will take about <strong>{results.playback}</strong>. You save <strong>{results.saved}</strong>{speed > 1 ? `, which is ${results.percentFaster}% faster than normal speed.` : '.'}</p>
      </div>
    </div>
  </section>
}

function Result({ icon, label, value, highlight }) {
  return <div className={`panel result ${highlight ? 'highlight' : ''}`}><div className="icon">{icon}</div><span>{label}</span><strong>{value}</strong></div>
}

function App() {
  const [dark, setDark] = useState(true);
  const [mode, setMode] = useState('audiobook');
  const modes = [
    ['audiobook', BookOpen, 'Audiobooks'], ['podcast', Mic, 'Podcasts'], ['youtube', Video, 'YouTube'], ['course', GraduationCap, 'Courses'], ['lecture', Headphones, 'Lectures']
  ];
  return <main className={dark ? 'app dark' : 'app light'}>
    <nav><div className="brand"><Headphones/> SpeedListen</div><button onClick={() => setDark(!dark)}>{dark ? <Sun/> : <Moon/>} {dark ? 'Light' : 'Dark'}</button></nav>
    <header className="hero"><div><span className="pill">Free playback speed calculator</span><h1>Audiobook Speed Calculator</h1><p>Calculate exactly how long your audiobook, podcast, video, course or lecture takes at 1.25x, 1.5x, 2x or any custom speed.</p><a href="#calculator" className="cta">Use Calculator</a></div><div className="hero-card"><p>Example</p><strong>8 hr 30 min at 1.5x</strong><span>Finish in 5 hr 40 min</span></div></header>
    <section className="mode-tabs">{modes.map(([key, Icon, label]) => <button key={key} className={mode === key ? 'selected' : ''} onClick={() => setMode(key)}><Icon size={18}/> {label}</button>)}</section>
    <Calculator mode={mode}/>
    <section className="ad-slot"><span>Ad placeholder</span><p>Replace this with Google AdSense once approved.</p></section>
    <section className="content-grid">
      <article className="panel"><Search/><h2>SEO targets built in</h2><p>This site targets searches like “how long at 1.5x speed”, “2x audiobook calculator”, and “playback speed calculator”.</p></article>
      <article className="panel"><DollarSign/><h2>Monetisation ready</h2><p>Add affiliate links for audiobooks, book summaries, AI voice tools, reading apps and productivity tools.</p></article>
      <article className="panel"><Sparkles/><h2>More calculator niches</h2><p>The tabs support podcasts, YouTube, courses and lectures so the page can rank for more than one search intent.</p></article>
    </section>
    <section className="affiliate-section"><h2>Recommended listening tools</h2><div className="affiliate-grid"><Affiliate title="Audible" text="Audiobooks and exclusive audio originals." href={affiliateLinks.audible}/><Affiliate title="AI voice tools" text="Turn articles, PDFs and notes into listenable audio." href={affiliateLinks.speechify}/><Affiliate title="Book summary apps" text="Get quick summaries when you do not need the full book." href={affiliateLinks.blinkist}/></div></section>
    <section className="blog"><h2>Reading Productivity Blog</h2><div className="blog-grid"><Post title="Is 1.5x the best audiobook speed?"/><Post title="How much time do you save at 2x speed?"/><Post title="Audiobooks vs podcasts for learning faster"/></div></section>
    <footer><p>© {new Date().getFullYear()} SpeedListen. Replace affiliate placeholders before publishing.</p></footer>
  </main>
}

function Affiliate({ title, text, href }) { return <a className="affiliate-card" href={href}><h3>{title}</h3><p>{text}</p><span>Learn more <ExternalLink size={14}/></span></a> }
function Post({ title }) { return <article><h3>{title}</h3><p>Use this as a starter SEO article. Expand it to 700–1,200 words for stronger Google ranking potential.</p></article> }

createRoot(document.getElementById('root')).render(<App />);
