export const BLOCK_TYPE = {
    PARAGRAPH: {
        id: 'paragraph',
        value: 'paragraph',
    },
    HEADER: {
        id: 'header',
        value: 'header'
    },
    CITE: {
        id: 'cite',
        value: 'cite'
    }
}

export const DEFAULT_BLOCKS = [
    BLOCK_TYPE.CITE,
    BLOCK_TYPE.HEADER,
    BLOCK_TYPE.PARAGRAPH
]

export const DEFAULT_SELECTED_BLOCK_TYPE = BLOCK_TYPE.PARAGRAPH