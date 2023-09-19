const tuples = [];

export default function executeTuple(firstElement, secondElement) {
    const name = tuples.length + 1;
    tuples.push({
        name,
        value: [firstElement, secondElement],
    })
    return `const ${name} = [${firstElement}, ${secondElement}]`;
}

export function getArrayFromTupleString(tupleString) {
    if (typeof tupleString === 'string' && tupleString.includes('[') && tupleString.includes(']')) {
        const openBrackets = tupleString.indexOf('[');
        const closeBrackets = tupleString.indexOf(']');
        const tuple = tupleString.substring(openBrackets + 1, closeBrackets);
        return tuple.split(',');
    } else {
        throw new Error('Invalid tuple')
    }
}