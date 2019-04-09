export function emailVerify(emailAddress: string) {
  return emailAddress.match(/([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,5})+/);
}
