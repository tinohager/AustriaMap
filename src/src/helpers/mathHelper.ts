export function roundTo (n : number, digits : number) {
  if (digits === undefined) {
    digits = 0
  }

  const multiplicator = Math.pow(10, digits)
  n = parseFloat((n * multiplicator).toFixed(11))
  const test = (Math.round(n) / multiplicator)
  return +(test.toFixed(digits))
}

export const mathHelper = { roundTo }
