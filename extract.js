(() => {
  const title = document.title;
  const language = document.documentElement.lang;
  const selection = window.getSelection()?.toString().trim();
  if (selection) return {title, language, selection};

  const copy = document.cloneNode(true);
  copy.querySelectorAll('nav, footer, aside, form, [hidden], [aria-hidden="true"], iframe, video, audio, figure, noscript').forEach(node => node.remove());
  const article = new Readability(copy, {charThreshold: 100}).parse();
  if (!article?.textContent.trim()) {
    return {error: '没有找到正文。你可以返回原网页，选中文字后再点击扩展图标。'};
  }
  return {title: article.title || title, language, content: article.content};
})();
