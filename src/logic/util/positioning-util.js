export function getPositionRelativeToContainer(containerSize, containerPosition, clientPosition) {
    const offsetX = clientPosition.x - containerPosition.x
    const offsetY = clientPosition.y - containerPosition.y
    return {
        x: offsetX / containerSize.x,
        y: offsetY / containerSize.y,
    }
}

export function relativePositionToCSS(position) {
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

export function swapXCoordinates(position) {
    const {x1, x2} = position
    return {
        ...position,
        x1: x2,
        x2: x1
    }
}

export function swapYCoordinates(position) {
    const {y1, y2} = position
    return {
        ...position,
        y1: y2,
        y2: y1
    }
}

export function getXDistance(position) {
    return Math.abs(position.x1 - position.x2)
}

export function getYDistance(position) {
    return Math.abs(position.x1 - position.x2)
}