export function htmlEscape(str: string) {
  return (str || '')
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
}

export function hasExcepctionalLetter(str: string) {
  return (str || '').match(/[&'"<>@]/) ? true : false;
}
