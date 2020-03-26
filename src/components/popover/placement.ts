import { popoverConfig } from '../config'

const { config } = popoverConfig

const overflow = {
    adjustX: 1,
    adjustY: 1,
}

const targetOffset = [0, 0]

const placementMap = {
    top: {
        points: ['bc', 'tc'],
        overflow,
        targetOffset,
        offset: [0, -config.gap],
    },
    bottom: {
        points: ['tc', 'bc'],
        overflow,
        targetOffset,
        offset: [0, config.gap],
    },
    left: {
        points: ['cr', 'cl'],
        overflow,
        targetOffset,
        offset: [-config.gap, 0],
    },
    right: {
        points: ['cl', 'cr'],
        overflow,
        targetOffset,
        offset: [config.gap, 0],
    },
    topLeft: {
        points: ['bl', 'tl'],
        overflow,
        targetOffset,
        offset: [0, -config.gap],
    },
    topRight: {
        points: ['br', 'tr'],
        overflow,
        targetOffset,
        offset: [0, -config.gap],
    },
    bottomLeft: {
        points: ['tl', 'bl'],
        overflow,
        targetOffset,
        offset: [0, config.gap],
    },
    bottomRight: {
        points: ['tr', 'br'],
        overflow,
        targetOffset,
        offset: [0, config.gap],
    },
    leftTop: {
        points: ['tr', 'tl'],
        overflow,
        targetOffset,
        offset: [-config.gap, 0],
    },
    leftBottom: {
        points: ['br', 'bl'],
        overflow,
        targetOffset,
        offset: [-config.gap, 0],
    },
    rightTop: {
        points: ['tl', 'tr'],
        overflow,
        targetOffset,
        offset: [config.gap, 0],
    },
    rightBottom: {
        points: ['bl', 'br'],
        overflow,
        targetOffset,
        offset: [config.gap, 0],
    },
}

export default placementMap
