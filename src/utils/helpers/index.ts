export const convertTimeSpent = (time: string): string => {
  const min = Math.floor(+time / 60)
  const sec = +time - min * 60
  const minValue = min < 10 ? `0${min}` : min
  const secValue = sec < 10 ? `0${sec}` : sec

  return `${minValue} : ${secValue}`
}

export function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0')
}
  
export function formatDate(date: Date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  )
}