
{
	//=======//
	// ASCII //
	//=======//
	const ASCII = (arg) => {
		let source = arg.is(String)? arg : arg[0]
		const chars = source.split("")
		const codes = chars.map(char => char.charCodeAt())
		return codes
	}
	
	//=======//
	// Codes //
	//=======//
	const CODE = {}
	CODE.make = (name, value) => ({name, value})
	CODE.generate = (codes) => codes.map(code => code.value !== undefined? code.value : code).flat()

	//===========//
	// Constants //
	//===========//
	const HEADER = CODE.make("Header", ASCII("\0asm"))
	const VERSION = CODE.make("Version", ASCII("\1\0\0\0"))
	
	// https://webassembly.github.io/spec/core/binary/instructions.html
	const INSTRUCTION = {
		END: CODE.make("Instruction.end", 0x0b),
		GET_LOCAL: CODE.make("Instruction.get_local", 0x20),
		F32_ADD: CODE.make("Instruction.f32_add", 0x92),
	}
	
	// https://webassembly.github.io/spec/core/binary/types.html#binary-functype
	const FUNCTION = {
		SINGLE_RESULT: CODE.make("Function.SingleResult", 0x60),
	}
	
	// https://webassembly.github.io/spec/core/binary/types.html#value-types
	const VALUE = {
		I32: CODE.make("Value.i32", 0x7F),
		I64: CODE.make("Value.i64", 0x7E),
		F32: CODE.make("Value.f32", 0x7D),
		F64: CODE.make("Value.f64", 0x7C),
	}
	
	// https://webassembly.github.io/spec/core/binary/modules.html#sections
	const SECTION = {
		CUSTOM: CODE.make("Section.Custom", 0),
		TYPE: CODE.make("Section.Type", 1),
		IMPORT: CODE.make("Section.Import", 2),
		FUNCTION: CODE.make("Section.Function", 3),
		TABLE: CODE.make("Section.Table", 4),
		MEMORY: CODE.make("Section.Memory", 5),
		GLOBAL: CODE.make("Section.Global", 6),
		EXPORT: CODE.make("Section.Export", 7),
		START: CODE.make("Section.Start", 8),
		ELEMENT: CODE.make("Section.Element", 9),
		CODE: CODE.make("Section.Code", 10),
		DATA: CODE.make("Section.Data", 11),
	}
	
	// http://webassembly.github.io/spec/core/binary/modules.html#export-section
	const EXPORT = {
		FUNCTION: CODE.make("Export.Function", 0x00),
		TABLE: CODE.make("Export.Table", 0x01),
		MEMORY: CODE.make("Export.Memory", 0x02),
		GLOBAL: CODE.make("Export.Global", 0x03),
	}
	
	//==================//
	// Encode - General //
	//==================//
	const ENCODE = {}
		
	ENCODE.unsignedLEB128 = (n) => {
		const buffer = []
		do {
			let byte = n & 0x7f
			n >>>= 7
			if (n !== 0) byte |= 0x80
			buffer.push(byte)
		} while (n !== 0)
		return buffer
	}
	
	ENCODE.vector = (array) => [
		...ENCODE.unsignedLEB128(array.length),//.map(n => CODE.make("Vector", n)),
		...array.flat(),
	]
	
	ENCODE.string = (string) => ENCODE.vector(
		string.split("").map( c => CODE.make(`'${c}'`, c.charCodeAt()) )
	)
	
	ENCODE.section = (type, items) => [
		type,
		...ENCODE.vector(ENCODE.vector(items)),
	]
	
	//========================//
	// Encode - Section Items //
	//========================//
	ENCODE.typeItem = (type, paramTypes, resultTypes) => [
		type,
		...ENCODE.vector(paramTypes),
		...ENCODE.vector(resultTypes),
	]
	
	ENCODE.exportItem = (name, type, id) => [
		...ENCODE.string(name),
		type,
		CODE.make("ID", id)
	]
	
	ENCODE.functionItem = (id) => [
		CODE.make("ID", id)
	]
	
	ENCODE.codeItem = (locals, instructions) => ENCODE.vector([
		...ENCODE.vector(locals).map(n => CODE.make("Local", n)),
		...instructions,
		INSTRUCTION.END,
	])
	
	//======//
	// WASM //
	//======//
	const WASM = () => {
		
		const typeSection = ENCODE.section(
			SECTION.TYPE,
			[ENCODE.typeItem(FUNCTION.SINGLE_RESULT, [VALUE.F32, VALUE.F32], [VALUE.F32])],
		)
		
		const funcSection = ENCODE.section(
			SECTION.FUNCTION,
			[ENCODE.functionItem(0x00)]
		)
		
		const exportSection = ENCODE.section(
			SECTION.EXPORT,
			[ENCODE.exportItem("add", EXPORT.FUNCTION, 0x00)],
		)
		
		const codeSection = ENCODE.section(
			SECTION.CODE,
			[ENCODE.codeItem([], [
				INSTRUCTION.GET_LOCAL,
				...ENCODE.unsignedLEB128(0),
				INSTRUCTION.GET_LOCAL,
				...ENCODE.unsignedLEB128(1),
				INSTRUCTION.F32_ADD,
			])]
		)
		
		const codes = [
			HEADER,
			VERSION,
			...typeSection,
			...funcSection,
			...exportSection,
			...codeSection
		]
		
		const numbers = CODE.generate(codes)
		return Uint8Array.from(numbers)
	}
	
	const wasm = WASM()
	WebAssembly.instantiate(wasm).then(instance => window.WASM = instance.instance.exports)
	
}

