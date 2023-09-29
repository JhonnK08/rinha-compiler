export default function executePrint(...params) {
    const valueToScript = params.join(',');
    return ` console.log(${valueToScript})`
}