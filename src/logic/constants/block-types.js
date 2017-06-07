export const BLOCK_TYPE = {
    PARAGRAPH: {
        key: 'PARAGRAPH',
        value: 'paragraph',
        tag: 'p'
    },
    SPAN: {
        key: 'SPAN',
        value: 'span',
        tag: 'span'
    },
    HEADER: {
        key: 'HEADER',
        value: 'header',
        tag: 'h1'
    },
    CITE: {
        key: 'CITE',
        value: 'cite',
        tag: 'cite'
    },
}

export const DEFAULT_BLOCKS = [
    BLOCK_TYPE.CITE,
    BLOCK_TYPE.HEADER,
    BLOCK_TYPE.SPAN,
    BLOCK_TYPE.PARAGRAPH
]

export const DEFAULT_SELECTED_BLOCK_TYPE = BLOCK_TYPE.PARAGRAPH