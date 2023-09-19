export default function generateBinaryOp(operator) {
    switch (operator) {
        case 'Add': return '+';
        case 'Sub': return '-';
        case 'Mul': return '*';
        case 'Div': return '/';
        case 'Rem': return '%';
        case 'Eq': return '==='; // Strict comparison?
        case 'Neq': return '!==';
        case 'Lt': return '<';
        case 'Gt': return '>';
        case 'Lte': return '<=';
        case 'Gte': return '>=';
        case 'And': return '&&';
        case 'Or': return '||';
        default: throw new Error('Operator not recognized');
    }
}