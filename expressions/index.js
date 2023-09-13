import verifyNodeHasChildren from "../utils/verifyNodeHasChildren";
import executeFunction from "./execute/function";
import executeIfStatement from "./execute/if";
import executeLet from "./execute/let";
import executePrint from "./execute/print";

export default function interpreterExpressionByKind(node, kind) {
    switch (kind) {
        // TODO
        // case 'File':
        // TODO
        // case 'Location':
        // TODO
        // case 'Parameter':
        // TODO
        // case 'Var':
        // TODO
        // case 'BinaryOp':
        // TODO
        // case 'Tuple':
        // TODO
        // case 'First':
        // TODO
        // case 'Second':
        // TODO
        // case 'Call':
        // TODO
        // case 'Binary':
        // TODO
        // case 'Bool':
        case 'Function': {
            const parameters = node.parameters.text;
            const scope = interpreterExpressionByKind(node.value, node.value.kind)
            return executeFunction(parameters, scope)
        }

        case 'Let': {
            const variableName = node.name.text;
            const variableValue = interpreterExpressionByKind(node.value, node.value.kind);
            return executeLet(variableName, variableValue);

        }
        case 'Str': {
            return node.value;
        }
        case 'Int': {
            return String(node.value);
        }
        case 'If': {
            const { then, otherwise } = node.condition;
            const conditionResponse = interpreterExpressionByKind(node.condition, node.condition.kind);
            const thenResponse = interpreterExpressionByKind(then, then.kind);

            let otherwiseResponse;
            if (otherwise) {
                otherwiseResponse = interpreterExpressionByKind(otherwise, otherwise.kind)
            }

            return executeIfStatement(conditionResponse, thenResponse, otherwiseResponse)
        }
        case 'Print': {
            if (verifyNodeHasChildren(node.value)) {
                const value = interpreterExpressionByKind(
                    node.value,
                    node.value.kind,
                );
                return executePrint(value);
            } else {
                return executePrint(node.value);
            }
        }
        default:
            throw new Error('Kind not recognized');
    }
}