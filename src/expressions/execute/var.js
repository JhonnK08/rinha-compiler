export default function executeVar(name, value) {
    const variableValue = value ? `= ${value};` : '';
    return ` ${name} ${variableValue}`
}