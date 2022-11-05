export const dateConverter = (dateTime) => {
  const date = new Date(dateTime);
  return {
    titleDate: new Intl.DateTimeFormat("fa-IR", {
      month: "long",
      year: "numeric",
      day: "numeric",
    }).format(date),
    weekendDate: new Intl.DateTimeFormat("fa-IR", {
      weekday: "long",
    }).format(date),
    shortTime: new Intl.DateTimeFormat("fa-IR", {
      hour: "numeric",
      minute: "numeric",
    }).format(date),
    shortDate: new Intl.DateTimeFormat("fa-IR").format(date),
  };
};
