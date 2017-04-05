export function getPositionRelativeToContainer (containerSize, containerPosition, clientPosition) {
  const offsetX = clientPosition.x - containerPosition.x
  const offsetY = clientPosition.y - containerPosition.y
  return {
    x: offsetX / containerSize.x,
    y: offsetY / containerSize.y,
  }
}

export function relativePositionToCSS (position) {
  const minX = Math.min(position.x1, position.x2)
  const minY = Math.min(position.y1, position.y2)
  const width = Math.abs(position.x1 - position.x2)
  const height = Math.abs(position.y1 - position.y2)
  return {
    left: `${(minX) * 100}%`,
    top: `${(minY) * 100}%`,
    height: `${(height) * 100}%`,
    width: `${(width) * 100}%`
  }
}