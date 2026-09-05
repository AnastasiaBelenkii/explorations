function plainText(html = '') {
  return String(html).replace(/<[^>]*>/g, ' ').replace(/&(?:amp|lt|gt|quot|#39|nbsp);/g, entity => ({'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&#39;':"'",'&nbsp;':' '})[entity]).replace(/\s+/g, ' ').trim();
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
}

function withHeadingIds(html) {
  const used = new Set(Array.from(html.matchAll(/\bid=["']([^"']+)["']/g), match => match[1]));
  return html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (heading, level, attrs, text) => {
    if (/\bid\s*=/.test(attrs)) return heading;
    const base = plainText(text).normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section';
    let id = base;
    let suffix = 2;
    while (used.has(id)) id = base + '-' + suffix++;
    used.add(id);
    return '<h' + level + attrs + ' id="' + id + '">' + text + '</h' + level + '>';
  });
}

function tableOfContents(html) {
  const headings = Array.from(html.matchAll(/<h([23])[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/gi));
  if (headings.length < 2) return '';
  return '<ol>' + headings.map(([, level, id, text]) => '<li' + (level === '3' ? ' class="toc-subsection"' : '') + '><a href="#' + escapeHtml(id) + '">' + escapeHtml(plainText(text)) + '</a></li>').join('') + '</ol>';
}

function readingMinutes(html) {
  const text = plainText(html);
  return Math.max(1, Math.ceil((text ? text.split(/\s+/).length : 0) / 220));
}

function postExcerpt(html) {
  const clean = String(html).replace(/<aside\b[^>]*>[\s\S]*?<\/aside>/gi, '');
  return Array.from(clean.matchAll(/<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/gi)).slice(0, 2).map(match => '<p>' + match[1] + '</p>').join('\n');
}

module.exports = { withHeadingIds, tableOfContents, readingMinutes, postExcerpt };
