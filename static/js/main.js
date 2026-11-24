const root = document.documentElement;
const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch {} },
};

// Tema
const themeBtn = document.querySelector('.theme-toggle');
const themeIcon = themeBtn.querySelector('i');
const isDark = () =>
    root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
const syncThemeIcon = () => { themeIcon.className = isDark() ? 'fas fa-sun' : 'fas fa-moon'; };
syncThemeIcon();
themeBtn.addEventListener('click', () => {
    root.dataset.theme = isDark() ? 'light' : 'dark';
    store.set('theme', root.dataset.theme);
    syncThemeIcon();
});

// Idioma
document.querySelector('.lang-toggle').addEventListener('click', () => {
    root.lang = root.lang === 'pt' ? 'en' : 'pt';
    store.set('language', root.lang);
});

// Idade da carreira (desde jun/2022), no formato do kubectl: 4y5m
const start = new Date(2022, 5, 1);
const now = new Date();
const months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
document.querySelector('.career-age').textContent = `${Math.floor(months / 12)}y${months % 12}m`;

// Comando digitado uma vez no carregamento
const term = document.querySelector('.term');
const typed = term.querySelector('.term-typed');
const cmd = typed.dataset.text;
if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    typed.textContent = cmd;
    term.classList.add('is-done');
} else {
    term.classList.add('is-typing');
    let i = 0;
    const tick = () => {
        typed.textContent = cmd.slice(0, ++i);
        if (i < cmd.length) setTimeout(tick, 28 + Math.random() * 40);
        else setTimeout(() => term.classList.replace('is-typing', 'is-done'), 250);
    };
    setTimeout(tick, 400);
}

// Estrelas, forks e linguagem direto da API do GitHub
document.querySelectorAll('.project[data-repo]').forEach(async (el) => {
    try {
        const res = await fetch(`https://api.github.com/repos/${el.dataset.repo}`);
        if (!res.ok) return;
        const r = await res.json();
        const stats = el.querySelector('.repo-stats');
        const parts = [];
        if (r.language) parts.push(`<span><i class="fas fa-code" aria-hidden="true"></i>${r.language}</span>`);
        parts.push(`<span><i class="far fa-star" aria-hidden="true"></i>${r.stargazers_count}</span>`);
        parts.push(`<span><i class="fas fa-code-branch" aria-hidden="true"></i>${r.forks_count}</span>`);
        stats.innerHTML = parts.join('');
        stats.hidden = false;
    } catch {}
});
