import Bun from 'bun';
import interpreterExpressionByKind from './src/expressions';

function interpreterRinha(node) {
	if (node.expression) {
		return interpreterExpressionByKind(node.expression, node.expression.kind);
	} else {
		throw new Error('Missing expression');
	}
}

async function main() {
	const path = `./var/rinha/source.rinha.json`;
	const file = Bun.file(path);
	const contents = await file.json();

	const dataTranscript = interpreterRinha(contents);

	const output = Bun.file("script.js");
	await Bun.write(output, dataTranscript);
}

main()
