export default function executeIfStatement(condition, then, otherwise) {
    const otherwiseString = otherwise ? ` else {
        ${otherwise}
    }` : ';'

    return ` if (${condition}) {
        ${then}
    } ${otherwiseString}`
}