export default function executePrint(...params) {
    if (params.length > 1) {
        return ` console.log(${String(params)})`
    } else {
        const value = params[0];
        const valueToScript = typeof value === 'string' ? `'${value}'` : value;
        return ` console.log(${valueToScript})`
    }
}