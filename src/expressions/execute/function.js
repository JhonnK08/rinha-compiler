export default function executeFunction(parameters, scope) {
    return ` (${parameters.length > 0 ? parameters.join(',') : ''}) => {
        ${scope}
    }
    `
}