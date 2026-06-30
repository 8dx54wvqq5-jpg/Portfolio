/* Talk to Abhikant — AI chat widget.
   Self-injects floating pill + chat panel. Matches connect.js/open-pill.js pattern.
   Calls /api/chat (Vercel serverless fn). */
(function () {
  'use strict';

  var STARTERS = [
    "What’s your strongest case study?",
    "How do you approach enterprise UX?",
    "What tools do you use?",
    "Are you open to new roles?"
  ];

  // ── Styles ──────────────────────────────────────────────────────────────
  if (!document.getElementById('chatbot-css')) {
    var st = document.createElement('style');
    st.id = 'chatbot-css';
    st.textContent = [
      /* trigger pill */
      /* quiet pill: icon-only, expands label on hover/focus */
      '#ab-chat-trigger{position:fixed;bottom:24px;right:24px;z-index:400;display:flex;align-items:center;gap:8px;background:#15171C;color:#E7E9EE;font-family:"JetBrains Mono",monospace;font-size:12px;font-weight:600;padding:9px;border-radius:999px;border:1px solid #2A2E37;box-shadow:0 8px 24px rgba(0,0,0,0.4);cursor:pointer;transition:border-color .15s ease,box-shadow .15s ease,padding .2s cubic-bezier(0.22,1,0.36,1),transform .15s cubic-bezier(0.34,1.56,0.64,1);letter-spacing:0.02em;}',
      '#ab-chat-trigger:hover,#ab-chat-trigger:focus-visible{border-color:#155DFC;box-shadow:0 8px 32px rgba(21,93,252,0.25);padding:9px 16px 9px 9px;outline:none;transform:translateY(-1px) scale(1.02);}',
      '#ab-chat-trigger:active{transform:scale(0.97);}',
      '@media (prefers-reduced-motion:reduce){#ab-chat-trigger{transition:border-color .15s ease,box-shadow .15s ease,padding .2s ease;}#ab-chat-trigger:hover,#ab-chat-trigger:focus-visible,#ab-chat-trigger:active{transform:none;}}',
      '#ab-chat-trigger .ab-avatar{width:26px;height:26px;border-radius:50%;background:#155DFC;color:#fff;font-size:10px;font-weight:700;display:grid;place-items:center;flex-shrink:0;}',
      '#ab-chat-trigger .ab-trigger-label{display:inline-flex;align-items:center;gap:8px;max-width:0;opacity:0;overflow:hidden;white-space:nowrap;transition:max-width .25s cubic-bezier(0.22,1,0.36,1),opacity .2s ease;}',
      '#ab-chat-trigger:hover .ab-trigger-label,#ab-chat-trigger:focus-visible .ab-trigger-label{max-width:220px;opacity:1;}',
      /* full pill (homepage): label always shown */
      '#ab-chat-trigger.ab-full{padding:9px 16px 9px 9px;}',
      '#ab-chat-trigger.ab-full .ab-trigger-label{max-width:220px;opacity:1;}',
      '#ab-chat-trigger kbd{background:#1E2128;border:1px solid #2A2E37;border-radius:4px;padding:1px 5px;font-size:10px;color:#6B7280;font-family:"JetBrains Mono",monospace;}',
      '@media (hover:none){#ab-chat-trigger kbd{display:none}}',  /* ⌘K useless on touch */
      /* panel */
      '#ab-chat-panel{position:fixed;bottom:80px;right:24px;z-index:400;width:min(400px,calc(100vw - 3rem));height:min(520px,calc(100dvh - 7rem));background:#15171C;border:1px solid #2A2E37;border-radius:16px;box-shadow:0 24px 64px rgba(0,0,0,0.6);display:flex;flex-direction:column;overflow:hidden;transform:translateY(12px) scale(0.97);opacity:0;pointer-events:none;transition:transform .2s cubic-bezier(0.22,1,0.36,1),opacity .18s ease;}',
      '#ab-chat-panel.open{transform:translateY(0) scale(1);opacity:1;pointer-events:auto;}',
      /* backdrop */
      '#ab-chat-backdrop{position:fixed;inset:0;z-index:399;background:rgba(0,0,0,0.35);backdrop-filter:blur(2px);display:none;}',
      '#ab-chat-backdrop.open{display:block;}',
      /* panel header */
      '.ab-chat-header{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #1E2128;}',
      '.ab-chat-header-info{display:flex;align-items:center;gap:10px;}',
      '.ab-chat-header .ab-avatar{width:28px;height:28px;border-radius:50%;background:#155DFC;color:#fff;font-size:11px;font-weight:700;display:grid;place-items:center;}',
      '.ab-chat-header-name{color:#E7E9EE;font-family:"JetBrains Mono",monospace;font-size:12px;font-weight:600;}',
      '.ab-chat-header-role{color:#6B7280;font-family:"JetBrains Mono",monospace;font-size:10px;margin-top:1px;}',
      '.ab-chat-close{background:none;border:none;color:#6B7280;cursor:pointer;padding:4px;border-radius:6px;line-height:1;font-size:16px;transition:color .12s ease,background .12s ease;}',
      '.ab-chat-close:hover{color:#E7E9EE;background:#1E2128;}',
      '.ab-chat-reset{background:none;border:none;color:#6B7280;cursor:pointer;font-family:"JetBrains Mono",monospace;font-size:13px;font-weight:600;padding:0 0 10px;align-self:flex-start;transition:color .12s ease;}',
      '.ab-chat-reset:hover{color:#E7E9EE;}',
      /* messages */
      '.ab-chat-messages{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;}',
      '.ab-chat-messages::-webkit-scrollbar{width:3px;}',
      '.ab-chat-messages::-webkit-scrollbar-track{background:transparent;}',
      '.ab-chat-messages::-webkit-scrollbar-thumb{background:#2A2E37;border-radius:99px;}',
      /* starters */
      '.ab-starters{display:flex;flex-direction:column;gap:6px;}',
      '.ab-starter-intro{color:#9CA3AF;font-family:"JetBrains Mono",monospace;font-size:11px;line-height:1.6;margin-bottom:4px;}',
      '.ab-starter{background:none;border:1px solid #2A2E37;border-radius:10px;color:#9CA3AF;font-family:"JetBrains Mono",monospace;font-size:11px;padding:9px 12px;text-align:left;cursor:pointer;transition:border-color .12s ease,color .12s ease,background .12s ease;}',
      '.ab-starter:hover{border-color:#155DFC;color:#E7E9EE;background:#1A1D24;}',
      /* bubbles */
      '.ab-msg{display:flex;max-width:88%;}',
      '.ab-msg.user{align-self:flex-end;}',
      '.ab-msg.assistant{align-self:flex-start;}',
      '.ab-bubble{padding:10px 14px;border-radius:14px;font-size:13px;line-height:1.55;}',
      '.ab-msg.user .ab-bubble{background:#155DFC;color:#fff;border-bottom-right-radius:4px;font-family:Manrope,sans-serif;}',
      '.ab-msg.assistant .ab-bubble{background:#1E2128;color:#D1D5DB;border-bottom-left-radius:4px;font-family:Manrope,sans-serif;}',
      /* typing dots */
      '.ab-dots{display:flex;gap:4px;padding:4px 0;}',
      '.ab-dots span{width:6px;height:6px;border-radius:50%;background:#6B7280;animation:ab-bounce 1s ease-in-out infinite;}',
      '.ab-dots span:nth-child(2){animation-delay:.15s;}',
      '.ab-dots span:nth-child(3){animation-delay:.3s;}',
      '@keyframes ab-bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-5px)}}',
      /* input */
      '.ab-chat-input-row{padding:12px;border-top:1px solid #1E2128;display:flex;gap:8px;align-items:center;}',
      '.ab-chat-input{flex:1;background:#1E2128;border:1px solid #2A2E37;border-radius:10px;color:#E7E9EE;font-family:Manrope,sans-serif;font-size:13px;padding:10px 14px;outline:none;transition:border-color .12s ease;}',
      '.ab-chat-input::placeholder{color:#4B5563;}',
      '.ab-chat-input:focus{border-color:#155DFC;}',
      '.ab-chat-send{background:#155DFC;border:none;border-radius:10px;width:38px;height:38px;display:grid;place-items:center;cursor:pointer;flex-shrink:0;transition:background .12s ease,opacity .12s ease;}',
      '.ab-chat-send:hover{background:#1246C4;}',
      '.ab-chat-send:disabled{opacity:0.35;cursor:default;}',
      '.ab-chat-send svg{display:block;}',
      /* entrance motion */
      '@keyframes ab-rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}',
      '.ab-msg{animation:ab-rise .3s cubic-bezier(0.22,1,0.36,1) both;}',
      '.ab-starter-intro{animation:ab-rise .35s cubic-bezier(0.22,1,0.36,1) both;}',
      '.ab-starter{animation:ab-rise .4s cubic-bezier(0.22,1,0.36,1) both;}',
      '.ab-starter:nth-child(2){animation-delay:.05s}.ab-starter:nth-child(3){animation-delay:.1s}.ab-starter:nth-child(4){animation-delay:.15s}.ab-starter:nth-child(5){animation-delay:.2s}',
      '.ab-chat-reset{animation:ab-rise .3s ease both;}',
      '@media (prefers-reduced-motion:reduce){.ab-msg,.ab-starter,.ab-starter-intro,.ab-chat-reset{animation:none}}'
    ].join('');
    document.head.appendChild(st);
  }

  // ── Analytics ────────────────────────────────────────────────────────────
  // Vercel Web Analytics custom events (free Hobby tier). No-op if va absent.
  function track(name, data) {
    try { if (window.va) window.va('event', data ? { name: name, data: data } : { name: name }); } catch (e) {}
  }

  // ── State ────────────────────────────────────────────────────────────────
  var messages = []; // { role, content }
  var busy = false;

  // ── DOM ──────────────────────────────────────────────────────────────────
  var backdrop = document.createElement('div');
  backdrop.id = 'ab-chat-backdrop';
  document.body.appendChild(backdrop);

  var panel = document.createElement('div');
  panel.id = 'ab-chat-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Chat with Abhikant');
  panel.innerHTML = [
    '<div class="ab-chat-header">',
      '<div class="ab-chat-header-info">',
        '<div class="ab-avatar">AN</div>',
        '<div>',
          '<div class="ab-chat-header-name">Abhikant</div>',
          '<div class="ab-chat-header-role">Senior Product Designer · Fiserv</div>',
        '</div>',
      '</div>',
      '<button class="ab-chat-close" aria-label="Close chat">&times;</button>',
    '</div>',
    '<div class="ab-chat-messages" id="ab-chat-msgs"></div>',
    '<div class="ab-chat-input-row">',
      '<input class="ab-chat-input" id="ab-chat-input" placeholder="Ask me anything…" autocomplete="off" />',
      '<button class="ab-chat-send" id="ab-chat-send" aria-label="Send">',
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
      '</button>',
    '</div>'
  ].join('');
  document.body.appendChild(panel);

  var trigger = document.createElement('button');
  trigger.id = 'ab-chat-trigger';
  trigger.setAttribute('aria-label', 'Open portfolio assistant');
  trigger.innerHTML = '<div class="ab-avatar">AN</div><span class="ab-trigger-label">Talk to Abhikant <kbd>⌘K</kbd></span>';
  // homepage shows the full label; case studies keep the quiet icon-only pill
  if (/(^\/$|\/index\.html$)/.test(location.pathname)) trigger.classList.add('ab-full');
  document.body.appendChild(trigger);

  var msgsEl = document.getElementById('ab-chat-msgs');
  var inputEl = document.getElementById('ab-chat-input');
  var sendBtn = document.getElementById('ab-chat-send');

  // ── Render ───────────────────────────────────────────────────────────────
  function renderMessages() {
    if (messages.length === 0) {
      msgsEl.innerHTML = '<div class="ab-starters"><p class="ab-starter-intro">Hey! Ask me anything about my work, process, or background.</p>' +
        STARTERS.map(function (q) {
          return '<button class="ab-starter">' + q + '</button>';
        }).join('') + '</div>';
    } else {
      msgsEl.innerHTML = '<button class="ab-chat-reset">← Back</button>' +
        messages.map(function (m) {
          return '<div class="ab-msg ' + m.role + '"><div class="ab-bubble">' + escHtml(m.content) + '</div></div>';
        }).join('');
    }
    msgsEl.scrollTop = msgsEl.scrollHeight;
  }

  function appendTyping() {
    var el = document.createElement('div');
    el.className = 'ab-msg assistant';
    el.id = 'ab-typing';
    el.innerHTML = '<div class="ab-bubble"><div class="ab-dots"><span></span><span></span><span></span></div></div>';
    msgsEl.appendChild(el);
    msgsEl.scrollTop = msgsEl.scrollHeight;
  }

  function removeTyping() {
    var el = document.getElementById('ab-typing');
    if (el) el.remove();
  }

  function escHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>');
  }

  // ── Send ─────────────────────────────────────────────────────────────────
  function send(text) {
    text = (text || '').trim();
    if (!text || busy) return;
    busy = true;
    sendBtn.disabled = true;
    inputEl.value = '';

    messages.push({ role: 'user', content: text });
    track('Chat Message Sent', { page: document.title });
    renderMessages();
    appendTyping();

    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: messages,
        pageContext: {
          title: document.title,
          text: (document.body.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 2000)
        }
      })
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        removeTyping();
        if (data.error) {
          messages.push({ role: 'assistant', content: 'Error: ' + data.error + (data.detail ? ' — ' + data.detail.slice(0, 120) : '') });
        } else {
          messages.push({ role: 'assistant', content: data.reply || '(empty response)' });
        }
        renderMessages();
      })
      .catch(function (err) {
        removeTyping();
        messages.push({ role: 'assistant', content: 'Network error — ' + (err.message || 'try again?') });
        renderMessages();
      })
      .finally(function () {
        busy = false;
        sendBtn.disabled = false;
        inputEl.focus();
      });
  }

  // ── Open / close ─────────────────────────────────────────────────────────
  var isOpen = false;

  function open() {
    isOpen = true;
    track('Chat Opened', { page: document.title });
    panel.classList.add('open');
    backdrop.classList.add('open');
    renderMessages();
    setTimeout(function () { inputEl.focus(); }, 120);
  }

  function close() {
    isOpen = false;
    panel.classList.remove('open');
    backdrop.classList.remove('open');
  }

  // ── Events ───────────────────────────────────────────────────────────────
  trigger.addEventListener('click', function () { isOpen ? close() : open(); });
  backdrop.addEventListener('click', close);
  panel.querySelector('.ab-chat-close').addEventListener('click', close);

  sendBtn.addEventListener('click', function () { send(inputEl.value); });
  inputEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(inputEl.value); }
  });

  // starter buttons + reset (delegated — re-rendered each time)
  msgsEl.addEventListener('click', function (e) {
    var btn = e.target.closest('.ab-starter');
    if (btn) { send(btn.textContent); return; }
    var reset = e.target.closest('.ab-chat-reset');
    if (reset) {
      messages = [];
      busy = false;
      sendBtn.disabled = false;
      renderMessages();
    }
  });

  // ⌘K / Ctrl+K
  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      isOpen ? close() : open();
    }
    if (e.key === 'Escape' && isOpen) close();
  });
})();
