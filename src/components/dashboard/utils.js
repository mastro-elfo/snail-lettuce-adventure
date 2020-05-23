export const sla2dhm = sla => {
  const parts = sla.match(/(\d+\s*w)?\s*(\d+\s*d)?\s*(\d+h)?\s*(\d+m)?/);
  return {
    weeks: parts[1] === undefined ? 0 : parseInt(parts[1]),
    days: parts[2] === undefined ? 0 : parseInt(parts[2]),
    hours: parts[3] === undefined ? 0 : parseInt(parts[3]),
    minutes: parts[4] === undefined ? 0 : parseInt(parts[4])
  };
};

export const dhm2str = dhm => {
  const parts = [];
  if (dhm.weeks) parts.push(dhmline(dhm.weeks, "week", "weeks"));
  if (dhm.days) parts.push(dhmline(dhm.days, "day", "days"));
  if (dhm.hours) parts.push(dhmline(dhm.hours, "hour", "hours"));
  if (dhm.minutes) parts.push(dhmline(dhm.minutes, "minute", "minutes"));
  return andJoin(parts, ", ", " and ");
};

export const dhmline = (count, singular, plural) =>
  count ? `${count} ${pluralize(count, singular, plural)}` : "";

export const pluralize = (count, singular, plural) =>
  count === 1 ? singular : plural;

export const andJoin = (list, glue, and) => {
  if (list.length < 2) return list.join(glue);
  const last = list.slice(-1);
  return [list.slice(0, -1).join(glue), last].join(and);
};

export const formatDate = d =>
  d.toLocaleString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    dateStyle: "short",
    timeStyle: "short"
  });

export const dateAddDhm = (date, dhm) =>
  new Date(
    +date +
      dhm.weeks * 604800000 +
      dhm.days * 86400000 +
      dhm.hours * 3600000 +
      dhm.minutes * 60000
  );
