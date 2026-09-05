(() => {
  const button = document.querySelector('.theme-toggle');
  if (button) {
    const choices = ['system', 'light', 'dark'];
    let theme = document.documentElement.dataset.theme || 'system';
    const updateTheme = () => {
      if (theme === 'system') delete document.documentElement.dataset.theme;
      else document.documentElement.dataset.theme = theme;
      button.textContent = 'Theme: ' + theme;
      button.setAttribute('aria-label', 'Color theme: ' + theme + '. Switch to ' + choices[(choices.indexOf(theme) + 1) % choices.length] + '.');
    };
    button.hidden = false;
    updateTheme();
    button.addEventListener('click', () => {
      theme = choices[(choices.indexOf(theme) + 1) % choices.length];
      updateTheme();
      try { localStorage.setItem('blog-theme', theme); } catch (error) { /* Preferences are optional. */ }
    });
  }
  const contents = document.querySelector('.contents');
  if (contents) {
    const wide = window.matchMedia('(min-width: 66rem)');
    const updateContents = () => { contents.open = wide.matches; };
    updateContents();
    wide.addEventListener('change', updateContents);
  }
})();
