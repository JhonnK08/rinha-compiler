export default function executeCall(callee, callArguments) {
    return `${callee}(${callArguments.join(', ')})`
}