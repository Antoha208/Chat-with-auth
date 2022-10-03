export function getTime() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const date = new Date(),
    weekday = days[date.getDay()],
    month = months[date.getMonth()],
    day = date.getDate(),
    year = date.getFullYear(),
    hours = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

  return {weekday, month, day, year, hours}
}