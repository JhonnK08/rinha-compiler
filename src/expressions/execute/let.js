export default function executeLet(name, value, nextArguments) {
    const variableValue = value ? `= ${value}` : '';
    return ` let ${name} ${variableValue};${nextArguments ?? ''}`
}