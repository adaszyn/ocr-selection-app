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
    tag: 'h2'
  },
  SUBHEADER: {
    key: 'SUBHEADER',
    value: 'subheader',
    tag: 'h3'
  },
  TITLE: {
    key: 'TITLE',
    value: 'title',
    tag: 'h1'
  },
  ABSTRACT: {
    key: 'ABSTRACT',
    value: 'abstract',
    tag: 'details'
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
  BLOCK_TYPE.PARAGRAPH,
  BLOCK_TYPE.ABSTRACT,
  BLOCK_TYPE.SUBHEADER,
  BLOCK_TYPE.TITLE
]

export const DEFAULT_SELECTED_BLOCK_TYPE = BLOCK_TYPE.CITE