const root = document.documentElement;
const status = document.querySelector('#status');
const article = document.querySelector('article');
const content = document.querySelector('#content');
const smaller = document.querySelector('#smaller');
const larger = document.querySelector('#larger');
const theme = document.querySelector('#theme');
const back = document.querySelector('#back');
const allowed = new Set('P H1 H2 H3 H4 H5 H6 DIV SECTION UL OL LI BLOCKQUOTE PRE CODE STRONG B EM I MARK BR HR TABLE CAPTION THEAD TBODY TFOOT TR TD TH DL DT DD SUP SUB'.split(' '));
const omitted = new Set('SCRIPT STYLE TEMPLATE SVG MATH FIGURE IMG VIDEO AUDIO IFRAME OBJECT NOSCRIPT BUTTON INPUT'.split(' '));

function appendTextStructure(source, target) {
  for (const child of source.childNodes) {
    if (child.nodeType === Node.TEXT_NODE) {
      target.append(document.createTextNode(child.data));
    } else if (child.nodeType === Node.ELEMENT_NODE && !omitted.has(child.tagName)) {
      if (allowed.has(child.tagName)) {
        const tag = child.tagName === 'H1' ? 'h2' : child.tagName.toLowerCase();
        const element = document.createElement(tag);
        target.append(element);
        appendTextStructure(child, element);
      } else {
        appendTextStructure(child, target);
      }
    }
  }
}

async function start() {
  const data = await chrome.runtime.sendMessage(location.hash.slice(1));
  const preferences = await chrome.storage.local.get({size: 19, dark: false});
  let {size, dark} = preferences;
  function apply() {
    root.style.setProperty('--size', size + 'px');
    root.dataset.theme = dark ? 'dark' : 'light';
    theme.textContent = dark ? '浅色' : '深色';
    theme.setAttribute('aria-pressed', String(dark));
    smaller.disabled = size <= 15;
    larger.disabled = size >= 29;
  }
  function save() {
    apply();
    chrome.storage.local.set({size, dark});
  }
  apply();
  smaller.onclick = () => {size -= 2; save();};
  larger.onclick = () => {size += 2; save();};
  theme.onclick = () => {dark = !dark; save();};
  back.onclick = async () => {
    try {
      await chrome.tabs.update(data?.sourceId ?? -1, {active: true});
      const current = await chrome.tabs.getCurrent();
      await chrome.tabs.remove(current.id);
    } catch {
      if (/^https?:\/\//i.test(data?.url ?? '')) location.href = data.url;
      else window.close();
    }
  };

  if (!data || data.error) {
    status.textContent = data?.error ?? '这篇阅读内容已失效。请在原网页重新打开纯净阅读。';
    return;
  }
  const heading = article.querySelector('h1');
  heading.textContent = data.title;
  document.title = data.title || '纯净阅读';
  if (data.language) article.lang = data.language;
  if (data.selection) {
    for (const line of data.selection.split(/\r?\n/)) {
      if (!line.trim()) continue;
      const paragraph = document.createElement('p');
      paragraph.textContent = line;
      content.append(paragraph);
    }
  } else {
    const template = document.createElement('template');
    template.innerHTML = data.content;
    const firstHeading = template.content.querySelector('h1, h2');
    if (firstHeading?.textContent.trim() === data.title?.trim()) firstHeading.remove();
    appendTextStructure(template.content, content);
  }
  status.hidden = true;
  article.hidden = false;
}

start().catch(() => {status.textContent = '读取失败。请返回原网页后重试。';});
