export function requestMetadata (req) {
  return {
    ip: req.get('x-real-ip') || req.get('cf-connecting-ip') || req.ip,
    user_agent: req.get('user-agent'),
    url: req.get('referer'),
    country: req.get('cf-ipcountry')
  }
}
