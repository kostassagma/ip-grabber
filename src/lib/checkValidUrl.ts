
export function urlToPath(string: string) {
  const valid = isValidURL(string)
  if (!valid) {
    return null
  }
  const path = parseUrl(string)
  return path
}

function isValidURL(string: string) {
  var res = string.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  return res !== null;
}

function parseUrl(url: string) {
  const regEx = /^(([^:\/?#]+:)?(?:\/\/((?:([^\/?#:]*):([^\/?#:]*)@)?([^\/?#:]*)(?::([^\/?#:]*))?)))?([^?#]*)(\?[^#]*)?(#.*)?$/
  var m = url.match(regEx);
  if (!m) {
    return null;
  }
  let protocol = m[2]
  if (!protocol) {
    url = `https://${url}`
    m = url.match(regEx);
  }
  if (!m) {
    return null;
  }
  let r = {
    link: url,
    hostname: m[6] || "", // localhost
    pathname: m[8] || (m[1] ? "/" : ""), // /deploy/
    protocol: m[2] || "", // http:
  };
  if (r.protocol.length == 2) {
    r.protocol = "file:///" + r.protocol.toUpperCase();
  }
  // r.href = r.origin + r.pathname + r.search + r.hash;
  if (r.protocol!=="https:") {
    return null
  }
  return r;
}

// function _parseUrl(url: string) {
//   var m = url.match(
//     /^(([^:\/?#]+:)?(?:\/\/((?:([^\/?#:]*):([^\/?#:]*)@)?([^\/?#:]*)(?::([^\/?#:]*))?)))?([^?#]*)(\?[^#]*)?(#.*)?$/
//   );
//   if (!m) {
//     return null;
//   }
//   let r = {
//     link: url,
//     hash: m[10] || "", // #asd
//     host: m[3] || "", // localhost:257
//     hostname: m[6] || "", // localhost
//     href: m[0] || "", // http://username:password@localhost:257/deploy/?asd=asd#asd
//     origin: m[1] || "", // http://username:password@localhost:257
//     pathname: m[8] || (m[1] ? "/" : ""), // /deploy/
//     port: m[7] || "", // 257
//     protocol: m[2] || "", // http:
//     search: m[9] || "", // ?asd=asd
//     username: m[4] || "", // username
//     password: m[5] || "", // password
//   };
//   if (r.protocol.length == 2) {
//     r.protocol = "file:///" + r.protocol.toUpperCase();
//     r.origin = r.protocol + "//" + r.host;
//   }
//   r.href = r.origin + r.pathname + r.search + r.hash;
//   return r;
// }
