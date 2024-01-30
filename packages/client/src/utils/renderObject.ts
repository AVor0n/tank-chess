import serialize from 'serialize-javascript'

export const renderObject: (data: Record<string, string>) => string = data => serialize(data).replace(/</g, '\\\u003c')
