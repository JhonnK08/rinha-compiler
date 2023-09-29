export default function executeIfStatement(condition, then, otherwise) {
    const otherwiseString = otherwise ? ` else {
        return ${otherwise}
    }` : ';'

    return ` if (${condition}) {
        return ${then}
    } ${otherwiseString}`
}