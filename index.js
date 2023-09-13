import Bun from 'bun';
import interpreterExpressionByKind from './expressions';

function interpreterRinha(node) {
	if (node.expression) {
		return interpreterExpressionByKind(node.expression, node.expression.kind);
	} else {
		throw new Error('Missing expression');
	}
}

async function main() {
	const argsFileName = Bun.argv[3];
	if (!argsFileName) {
		throw new Error('Missing file parameter.\n\nExample: ``bun run start print.json``\n\n')
	}
	const path = `./files/${argsFileName}.json`;
	const file = Bun.file(path);
	const contents = await file.json();

	const dataTranscript = interpreterRinha(contents);

	const output = Bun.file("script.js");
	await Bun.write(output, dataTranscript);
}

main()
