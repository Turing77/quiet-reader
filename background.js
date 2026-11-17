chrome.action.onClicked.addListener(async (source) => {
  const key = crypto.randomUUID();
  let article;
  try {
    await chrome.scripting.executeScript({target: {tabId: source.id}, files: ['Readability.js']});
    const [{result}] = await chrome.scripting.executeScript({
      target: {tabId: source.id}, files: ['extract.js']
    });
    article = result;
  } catch {
    article = {error: 'Chrome 无法读取此页面。请在普通网页上打开纯净阅读。'};
  }
  await chrome.storage.session.set({[key]: {...article, sourceId: source.id, url: source.url}});
  try {
    await chrome.tabs.create({url: chrome.runtime.getURL('reader.html#' + key), openerTabId: source.id});
  } catch {
    await chrome.storage.session.remove(key);
  }
});

chrome.tabs.onRemoved.addListener(async (id) => {
  const entries = await chrome.storage.session.get(null);
  const keys = Object.keys(entries).filter((key) => entries[key].readerId === id);
  if (keys.length) await chrome.storage.session.remove(keys);
});

chrome.runtime.onMessage.addListener((key, sender, reply) => {
  if (sender.url !== chrome.runtime.getURL('reader.html#' + key) || !sender.tab) return;
  (async () => {
    const {[key]: article} = await chrome.storage.session.get(key);
    if (article) await chrome.storage.session.set({[key]: {...article, readerId: sender.tab.id}});
    reply(article ?? null);
  })().catch(() => reply(null));
  return true;
});
