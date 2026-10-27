import { DayHours } from "../data/Config";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function toMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function format12(time: string) {
  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function getNow(timezone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "0";
  return {
    day: get("weekday"),
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

export type OpenStatusResult = { isOpen: boolean; day: string; label: string };

export function getOpenStatus(
  hours: readonly DayHours[],
  timezone: string,
): OpenStatusResult {
  const { day, minutes } = getNow(timezone);
  const dayIndex = DAYS.indexOf(day);
  const today = hours.find((h) => h.day === day);

  if (today && !today.closed) {
    const open = toMinutes(String(today.open));
    const close = toMinutes(String(today.close));
    const overnight = close <= open;

    if ((!overnight && minutes >= open && minutes < close) ||
        (overnight && minutes >= open)) {
      return { isOpen: true, day, label: `Open now, closes ${format12(String(today.close))}` };
    }
    if (minutes < open && !overnight) {
      return { isOpen: false, day, label: `Closed, opens today at ${format12(String(today.open))}` };
    }
  }

  const yesterday = hours.find((h) => h.day === DAYS[(dayIndex + 6) % 7]);
  if (
    yesterday &&
    !yesterday.closed &&
    toMinutes(String(yesterday.close)) <= toMinutes(String(yesterday.open)) &&
    minutes < toMinutes(String(yesterday.close))
  ) {
    return { isOpen: true, day, label: `Open now, closes ${format12(String(yesterday.close))}` };
  }

  for (let i = 1; i <= 7; i++) {
    const nextName = DAYS[(dayIndex + i) % 7];
    const next = hours.find((h) => h.day === nextName);
    if (next && !next.closed) {
      const when = i === 1 ? "tomorrow" : nextName;
      return { isOpen: false, day, label: `Closed, opens ${when} at ${format12(String(next.open))}` };
    }
  }
  return { isOpen: false, day, label: "Closed" };
}
