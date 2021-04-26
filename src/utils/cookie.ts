const Cookie = {
  get(key: string): string | undefined {
    const data = document.cookie;
    let p = data.indexOf(key + "=");
    if (p > -1) {
      p = p + key.length + 1;
      let end = data.indexOf(";", p);
      end = end < 0 ? data.length : end;
      return decodeURIComponent(data.substring(p, end));
    } else {
      return undefined;
    }
  },
  set(key: string, value: string, time?: number): void {
    const times = time || 1;
    const cur = new Date();
    cur.setTime(cur.getTime() + times * 24 * 3600 * 1000);
    document.cookie =
      key +
      "=" +
      encodeURIComponent(value) +
      ";expires=" +
      (times === undefined ? "" : cur.toUTCString());
  },
  del(key: string) {
    const data = this.get(key);
    if (data) {
      this.set(key, data, -1);
    }
  },
};

export default Cookie;
