const _id = id => `sla-set-${id}`;

export function set(id, value) {
  storage.setItem(_id(id), value);
}

export function get(id, parse = v => v) {
  return parse(storage.getItem(_id(id)));
}
