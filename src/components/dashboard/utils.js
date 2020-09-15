/**
 * Converts a string into an object matching this regex: `/(\d+\s*w)?\s*(\d+\s*d)?\s*(\d+h)?\s*(\d+m)?/`
 * @param  {[type]} sla [description]
 * @return {[type]}     [description]
 */
export const sla2dhm = sla => {
  const parts = sla.match(/(\d+\s*w)?\s*(\d+\s*d)?\s*(\d+\s*h)?\s*(\d+\s*m)?/);
  return {
    weeks: parts[1] === undefined ? 0 : parseInt(parts[1]),
    days: parts[2] === undefined ? 0 : parseInt(parts[2]),
    hours: parts[3] === undefined ? 0 : parseInt(parts[3]),
    minutes: parts[4] === undefined ? 0 : parseInt(parts[4])
  };
};

/**
 * Returns a human readable representation of `dhm`
 * @param  {[type]} dhm [description]
 * @return {[type]}     [description]
 */
export const dhm2str = dhm => {
  const parts = [];
  // Sum each part in minutes
  const sum =
    (dhm.weeks ? dhm.weeks * 7 * 24 * 60 : 0) +
    (dhm.days ? dhm.days * 24 * 60 : 0) +
    (dhm.hours ? dhm.hours * 60 : 0) +
    (dhm.minutes ? dhm.minutes : 0);
  let rest = sum;
  // Divide into weeks
  const weeks = Math.floor(rest / (7 * 24 * 60));
  rest %= 7 * 24 * 60;
  // Divide the rest into days
  const days = Math.floor(rest / (24 * 60));
  rest %= 24 * 60;
  // Divede the rest into hours
  const hours = Math.floor(rest / 60);
  // The rest are minutes
  const minutes = rest % 60;
  // Create the list of parts
  if (weeks) parts.push(dhmline(weeks, "week", "weeks"));
  if (days) parts.push(dhmline(days, "day", "days"));
  if (hours) parts.push(dhmline(hours, "hour", "hours"));
  if (minutes) parts.push(dhmline(minutes, "minute", "minutes"));
  // Join everything
  return andJoin(parts, ", ", " and ");
};

/**
 * Create a like `${count} ${singular|plural}`
 * @param  {[type]} count    [description]
 * @param  {[type]} singular [description]
 * @param  {[type]} plural   [description]
 * @return {[type]}          [description]
 */
export const dhmline = (count, singular, plural) =>
  count ? `${count} ${pluralize(count, singular, plural)}` : "";

/**
 * Return `singular` if `count === 1`, `plural` otherwise
 * @param  {[type]} count    [description]
 * @param  {[type]} singular [description]
 * @param  {[type]} plural   [description]
 * @return {[type]}          [description]
 */
export const pluralize = (count, singular, plural) =>
  count === 1 ? singular : plural;

/**
 * Join a list with glue, like standard join, but using a different glue for the last item.
 * @param  {[type]} list [description]
 * @param  {[type]} glue [description]
 * @param  {[type]} and  [description]
 * @return {[type]}      [description]
 */
export const andJoin = (list, glue, and) => {
  if (list.length < 2) return list.join(glue);
  const last = list.slice(-1);
  return [list.slice(0, -1).join(glue), last].join(and);
};

/**
 * Uniform date formatter
 * @param  {[type]} d [description]
 * @return {[type]}   [description]
 */
export const formatDate = d =>
  // Use `undefined` to use auto detect localization
  d.toLocaleString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
    // Don't use these if weekday is set
    // dateStyle: "short",
    // timeStyle: "short"
  });

/**
 * Add `dhm` object to `date` and return a new `date`
 * @param  {[type]} date [description]
 * @param  {[type]} dhm  [description]
 * @return {[type]}      [description]
 */
export const dateAddDhm = (date, dhm) =>
  new Date(
    +date +
      ((dhm.weeks ? dhm.weeks * 10080 : 0) +
        (dhm.days ? dhm.days * 1440 : 0) +
        (dhm.hours ? dhm.hours * 60 : 0) +
        (dhm.minutes ? dhm.minutes : 0)) *
        60000
  );

/**
 * Returns a `date` object that has the same year/month/day as `date`, and hours/minutes as the same weekday as in `table`
 * @param  {[type]} date  [description]
 * @param  {[type]} table [description]
 * @param  {[type]} label [description]
 * @return {[type]}       [description]
 */
export const config2date = (date, table, label) => {
  // If label is not in this list, return null
  if (
    !["morningStart", "morningEnd", "eveningStart", "eveningEnd"].includes(
      label
    )
  )
    return null;
  // Get weekday
  const weekday = num2weekday(date.getDay());
  // Get config item
  const config = table[weekday];
  // Set hours/minutes
  let hours, minutes;
  if (label === "morningStart" && config.morning) {
    hours = config.morningStartHour;
    minutes = config.morningStartMinute;
  } else if (label === "morningEnd" && config.morning) {
    hours = config.morningEndHour;
    minutes = config.morningEndMinute;
  } else if (label === "eveningStart" && config.evening) {
    hours = config.eveningStartHour;
    minutes = config.eveningStartMinute;
  } else if (label === "eveningEnd" && config.evening) {
    hours = config.eveningEndHour;
    minutes = config.eveningEndMinute;
  }
  // If nothing found, return null
  if (hours === undefined || minutes === undefined) return null;
  // Return
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hours,
    minutes
  );
};

/**
 * Returns `true` only if `date` is within an interval of working hours, as stated in `table`.
 * @param  {[type]}  date  [description]
 * @param  {[type]}  table [description]
 * @return {Boolean}       [description]
 */
export const isWorking = (date, table) => {
  // Create morning/evening start/end dates
  const morningStart = config2date(date, table, "morningStart");
  const morningEnd = config2date(date, table, "morningEnd");
  const eveningStart = config2date(date, table, "eveningStart");
  const eveningEnd = config2date(date, table, "eveningEnd");
  // Compare dates
  return (
    (!!morningStart &&
      !!morningEnd &&
      date >= morningStart &&
      date <= morningEnd) ||
    (!!eveningStart &&
      !!eveningEnd &&
      date >= eveningStart &&
      date <= eveningEnd)
  );
};

/**
 * Returns the weekday name, in lowercase english.
 * @param  {[type]} day [description]
 * @return {[type]}     [description]
 */
export const num2weekday = day =>
  ({
    0: "sunday",
    1: "monday",
    2: "tuesday",
    3: "wednesday",
    4: "thursday",
    5: "friday",
    6: "saturday"
  }[day % 7]);

/**
 * Returns the length in milliseconds of the given list of intervals.
 *
 * List is an array of objects with `start` and `end` properties
 * @param  {[type]} list [description]
 * @return {[type]}      [description]
 */
export const list2length = list =>
  list.reduce((carry, item) => carry + (item.end - item.start), 0);

/**
 * Find the first start after `date` given the table of working hours
 * @param  {[type]} date  [description]
 * @param  {[type]} table [description]
 * @return {[type]}       [description]
 */
export const findNextStart = (date, table) => {
  const morningStart = config2date(date, table, "morningStart");
  const eveningStart = config2date(date, table, "eveningStart");
  if (morningStart && +morningStart > +date) return morningStart;
  if (eveningStart && +eveningStart > +date) return eveningStart;
  return findNextStart(
    new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
    table
  );
};

/**
 * Generate recursively the list of start/end intervals given start, end and working table.
 * @param  {[type]} start     [description]
 * @param  {[type]} end       [description]
 * @param  {[type]} table     [description]
 * @param  {Array}  [list=[]] [description]
 * @return {[type]}           [description]
 */
export const table2list = (start, end, table, list = []) => {
  // Start is previous than end
  if (+start >= +end) return list;
  // Initialize constants
  const _list = list.slice();
  const morningEnd = config2date(start, table, "morningEnd");
  const eveningEnd = config2date(start, table, "eveningEnd");
  const nextStart = findNextStart(start, table);
  if (morningEnd && +morningEnd >= +end) {
    // A morningEnd point is active and is after end
    // We're done
    _list.push({ start, end });
  } else if (morningEnd && +morningEnd >= +start) {
    // A morningEnd is active and is after start
    // This is false if start comes in the afternoon
    _list.push({ start, end: morningEnd });
    return table2list(nextStart, end, table, _list);
  } else if (eveningEnd && +eveningEnd >= +end) {
    // An evening end is active and is after end
    // We're done
    _list.push({ start, end });
  } else if (eveningEnd && +eveningEnd >= +start) {
    // An evening end is active and is after start
    // In normal cases this is not possible
    _list.push({ start, end: eveningEnd });
    return table2list(nextStart, end, table, _list);
  }
  // Return
  return _list;
};

/**
 * Evaluates the length between `start` and `end`
 *
 * Puts together `table2list` and `list2length`
 * @param  {[type]} start [description]
 * @param  {[type]} end   [description]
 * @param  {[type]} table [description]
 * @return {[type]}       [description]
 */
export const evalLength = (start, end, table) => {
  return list2length(table2list(start, end, table, []));
};

/**
 * Finds the end date from `start` with given length jumping non working hours.
 * @param  {[type]} start  [description]
 * @param  {[type]} length [description]
 * @param  {[type]} table  [description]
 * @return {[type]}        [description]
 */
export const lengthEnd = (start, length, table) => {
  if (length <= 0) return new Date(+start + length);

  const morningEnd = config2date(start, table, "morningEnd");
  const eveningEnd = config2date(start, table, "eveningEnd");
  const nextStart = findNextStart(start, table);

  if (!isWorking(start, table)) {
    return lengthEnd(nextStart, length - (+nextStart - +start), table);
  }

  if (morningEnd && +start <= +morningEnd) {
    const newLength = length - (+morningEnd - +start);
    if (newLength > 0) return lengthEnd(nextStart, newLength, table);
    else return new Date(+morningEnd + newLength);
  } else if (eveningEnd && +start <= +eveningEnd) {
    const newLength = length - (+eveningEnd - +start);
    if (newLength > 0) return lengthEnd(nextStart, newLength, table);
    return new Date(+eveningEnd + newLength);
  }
  return lengthEnd(nextStart, length, table);
};
