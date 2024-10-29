export const deducePercentage = (value: number, percentage: number) => {
  return value - (value / 100) * percentage
}
