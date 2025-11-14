// Sound Manager - Retro game sound effects using Web Audio API
// Generates classic 1980s game sounds procedurally

class SoundManager {
  constructor() {
    this.audioContext = null;
    this.isMuted = localStorage.getItem('soundMuted') === 'true';
    this.currentTheme = localStorage.getItem('soundTheme') || 'classic';

    // Initialize audio context on first user interaction
    this.initAudioContext();
  }

  initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  // Play a sound with specified theme
  play(soundType) {
    if (this.isMuted) return;
    this.initAudioContext();

    switch (soundType) {
      case 'correct':
        this.playCorrectSound();
        break;
      case 'wrong':
        this.playWrongSound();
        break;
      case 'click':
        this.playClickSound();
        break;
      case 'complete':
        this.playCompleteSound();
        break;
      case 'startup':
        this.playStartupSound();
        break;
      case 'intro':
        this.playIntroTheme();
        break;
      case 'victory':
        this.playVictoryTheme();
        break;
      default:
        break;
    }
  }

  // Classic arcade "correct answer" sound
  playCorrectSound() {
    const ctx = this.audioContext;
    const now = ctx.currentTime;

    if (this.currentTheme === 'classic') {
      // Rising tones - classic arcade success
      [523.25, 659.25, 783.99].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.frequency.value = freq;
        osc.type = 'square';

        gain.gain.setValueAtTime(0.3, now + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.15);

        osc.start(now + i * 0.1);
        osc.stop(now + i * 0.1 + 0.15);
      });
    } else if (this.currentTheme === 'mario') {
      // Mario coin sound
      const freqs = [1046.5, 1244.5];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.frequency.value = freq;
        osc.type = 'square';

        gain.gain.setValueAtTime(0.3, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.05 + 0.1);

        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.1);
      });
    } else if (this.currentTheme === 'retro') {
      // Simple beep
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.frequency.value = 800;
      osc.type = 'sine';

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

      osc.start(now);
      osc.stop(now + 0.2);
    }
  }

  // Classic arcade "wrong answer" sound
  playWrongSound() {
    const ctx = this.audioContext;
    const now = ctx.currentTime;

    if (this.currentTheme === 'classic') {
      // Descending buzz - classic arcade fail
      [400, 300, 200].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.frequency.value = freq;
        osc.type = 'sawtooth';

        gain.gain.setValueAtTime(0.2, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.15);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.15);
      });
    } else if (this.currentTheme === 'mario') {
      // Mario death sound (descending)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.frequency.setValueAtTime(659.25, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.3);
      osc.type = 'square';

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

      osc.start(now);
      osc.stop(now + 0.3);
    } else if (this.currentTheme === 'retro') {
      // Buzzer
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.frequency.value = 150;
      osc.type = 'sawtooth';

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

      osc.start(now);
      osc.stop(now + 0.4);
    }
  }

  // Button click sound
  playClickSound() {
    const ctx = this.audioContext;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.value = 1000;
    osc.type = 'square';

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  // Mission complete sound
  playCompleteSound() {
    const ctx = this.audioContext;
    const now = ctx.currentTime;

    // Victory fanfare - extended melody
    const melody = [
      { freq: 523.25, duration: 0.15 },  // C
      { freq: 659.25, duration: 0.15 },  // E
      { freq: 783.99, duration: 0.15 },  // G
      { freq: 1046.5, duration: 0.3 },   // C (high)
      { freq: 783.99, duration: 0.15 },  // G
      { freq: 1046.5, duration: 0.4 }    // C (high, sustained)
    ];

    let time = 0;
    melody.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.frequency.value = note.freq;
      osc.type = 'square';

      gain.gain.setValueAtTime(0.2, now + time);
      gain.gain.exponentialRampToValueAtTime(0.01, now + time + note.duration);

      osc.start(now + time);
      osc.stop(now + time + note.duration);

      time += note.duration;
    });
  }

  // Intro theme - 1980s game intro style
  playIntroTheme() {
    const ctx = this.audioContext;
    const now = ctx.currentTime;

    // Classic 8-bit intro melody
    const intro = [
      { freq: 523.25, duration: 0.2 },   // C
      { freq: 523.25, duration: 0.2 },   // C
      { freq: 587.33, duration: 0.2 },   // D
      { freq: 659.25, duration: 0.2 },   // E
      { freq: 783.99, duration: 0.3 },   // G
      { freq: 659.25, duration: 0.2 },   // E
      { freq: 523.25, duration: 0.4 }    // C (sustained)
    ];

    let time = 0;
    intro.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.frequency.value = note.freq;
      osc.type = this.currentTheme === 'mario' ? 'square' : 'triangle';

      gain.gain.setValueAtTime(0.15, now + time);
      gain.gain.exponentialRampToValueAtTime(0.01, now + time + note.duration);

      osc.start(now + time);
      osc.stop(now + time + note.duration);

      time += note.duration;
    });
  }

  // Victory theme - completion screen
  playVictoryTheme() {
    const ctx = this.audioContext;
    const now = ctx.currentTime;

    // Epic victory fanfare
    const victory = [
      { freq: 392.00, duration: 0.15 },  // G
      { freq: 523.25, duration: 0.15 },  // C
      { freq: 659.25, duration: 0.15 },  // E
      { freq: 783.99, duration: 0.15 },  // G
      { freq: 1046.5, duration: 0.2 },   // C (high)
      { freq: 1046.5, duration: 0.2 },   // C (high)
      { freq: 1046.5, duration: 0.15 },  // C (high)
      { freq: 1174.7, duration: 0.15 },  // D (high)
      { freq: 1318.5, duration: 0.5 }    // E (high, sustained)
    ];

    let time = 0;
    victory.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.frequency.value = note.freq;
      osc.type = 'square';

      gain.gain.setValueAtTime(0.25, now + time);
      gain.gain.exponentialRampToValueAtTime(0.01, now + time + note.duration);

      osc.start(now + time);
      osc.stop(now + time + note.duration);

      time += note.duration;
    });
  }

  // DOS startup sound
  playStartupSound() {
    const ctx = this.audioContext;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.2);
    osc.type = 'square';

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  // Toggle mute
  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('soundMuted', this.isMuted);
    return this.isMuted;
  }

  // Set sound theme
  setTheme(theme) {
    this.currentTheme = theme;
    localStorage.setItem('soundTheme', theme);
  }

  // Get current state
  getState() {
    return {
      isMuted: this.isMuted,
      theme: this.currentTheme
    };
  }
}

// Export singleton instance
export default new SoundManager();
