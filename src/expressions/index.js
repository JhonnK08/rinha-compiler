import generateBinaryOp from "../utils/generateBinaryOp";
import verifyNodeHasChildren from "../utils/verifyNodeHasChildren";
import executeBinary from "./execute/binary";
import executeCall from "./execute/call";
import executeFunction from "./execute/function";
import executeIfStatement from "./execute/if";
import executeLet from "./execute/let";
import executePrint from "./execute/print";
import executeTuple, { getArrayFromTupleString } from "./execute/tuple";
import executeVar from "./execute/var";

export default function interpreterExpressionByKind(node, kind) {
    switch (kind) {
        // TODO
        // case 'File':
        // TODO
        // case 'Location':
        // TODO
        // case 'Parameter':
        case 'First': {
            const value = interpreterExpressionByKind(value, value.kind);
            const tuple = getArrayFromTupleString(value);
            return tuple[0];
        }
        case 'Second': {
            const value = interpreterExpressionByKind(value, value.kind);
            const tuple = getArrayFromTupleString(value);
            return tuple[1];
        }
        case 'Tuple': {
            const firstElement = interpreterExpressionByKind(node.first, node.first.kind);
            const secondElement = interpreterExpressionByKind(node.second, node.second.kind);
            return executeTuple(firstElement, secondElement);
        }
        case 'Bool': {
            return node.value;
        }
        case 'Call': {
            const callName = node.callee.text;
            const callArguments = node.arguments.map((argument) => interpreterExpressionByKind(argument, argument.kind));
            return executeCall(callName, callArguments);
        }
        case 'Var': {
            const variableName = node.text;
            const variableValue = node.value ? interpreterExpressionByKind(node.value, node.value.kind) : undefined;
            return executeVar(variableName, variableValue);
        }
        case 'Binary': {
            const firstTerm = interpreterExpressionByKind(node.lhs, node.lhs.kind);
            const secondTerm = interpreterExpressionByKind(node.rhs, node.rhs.kind);
            const operator = generateBinaryOp(node.op);
            return executeBinary(firstTerm, operator, secondTerm);
        }
        case 'Function': {
            const parameters = node.parameters.map((parameter) => parameter.text);
            const scope = interpreterExpressionByKind(node.value, node.value.kind);
            return executeFunction(parameters, scope);
        }
        case 'Let': {
            const variableName = node.name.text;
            const variableValue = node.value ? interpreterExpressionByKind(node.value, node.value.kind) : undefined;

            let nextArguments;

            if (node.next) {
                nextArguments = interpreterExpressionByKind(node.next, node.next.kind);
            }
            return executeLet(variableName, variableValue, nextArguments);

        }
        case 'Str': {
            return node.value;
        }
        case 'Int': {
            return String(node.value);
        }
        case 'If': {
            const { condition, then, otherwise } = node;
            const conditionResponse = interpreterExpressionByKind(condition, condition.kind);
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