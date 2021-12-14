export const getNextWrappingIndex = (
  moveAmount: number,
  baseIndex: number,
  itemCount: number,
  circular?: boolean,
) => {
  if (itemCount === 0) return -1

  const itemsLastIndex = itemCount - 1

  if (
    typeof baseIndex !== 'number' ||
    baseIndex < 0 ||
    baseIndex >= itemCount
  ) {
    baseIndex = moveAmount > 0 ? -1 : itemsLastIndex + 1
  }

  let newIndex = baseIndex + moveAmount

  if (newIndex < 0) {
    newIndex = circular ? itemsLastIndex : 0
  } else if (newIndex > itemsLastIndex) {
    newIndex = circular ? 0 : itemsLastIndex
  }

  return newIndex
}
