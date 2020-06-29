
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

	//===========//
	// Constants //
	//===========//
	const HEADER = ASCII("\0asm")
	const VERSION = ASCII("\1\0\0\0")
	
	// https://webassembly.github.io/spec/core/binary/instructions.html
	const INSTRUCTION = {
		end: 0x0b,
		get_local: 0x20,
		f32_add: 0x92,
	}
	
	// https://webassembly.github.io/spec/core/binary/types.html#binary-functype
	const FUNCTION_TYPE = {
		SINGLE_RESULT: 0x60,
	}
	
	// https://webassembly.github.io/spec/core/binary/types.html#value-types
	const VALUE_TYPE = {
		I32: 0x7F,
		I64: 0x7E,
		F32: 0x7D,
		F64: 0x7C,
	}
	
	// https://webassembly.github.io/spec/core/binary/modules.html#sections
	const SECTION = {
		CUSTOM: 0,
		TYPE: 1,
		IMPORT: 2,
		FUNCTION: 3,
		TABLE: 4,
		MEMORY: 5,
		GLOBAL: 6,
		EXPORT: 7,
		START: 8,
		ELEMENT: 9,
		CODE: 10,
		DATA: 11,
	}
	
	//========//
	// Encode //
	//========//
	const flatten = (arr) => [].concat.apply([], arr);
	
	const ENCODE = {}
	ENCODE.unsignedLEB128 = (n) => {
		const buffer = []
		do {
			let byte = n & 0x7f
			n >>>= 7
			if (n !== 0) {
				byte |= 0x80
			}
			buffer.push(byte)
		} while (n !== 0)
		return buffer
	}
	
	ENCODE.array = (array) => ENCODE.vector(ENCODE.vector(array))
	
	ENCODE.vector = (array) => [
		...ENCODE.unsignedLEB128(array.length), //TODO: should this be an array? or spread like it currently is?
		...(array),
	]
	
	ENCODE.section = (type, vector) => [
		type,
		...ENCODE.vector(vector),
	]
	
	ENCODE.functionType = (type, paramTypes, resultTypes) => [
		type,
		...ENCODE.vector(paramTypes),
		...ENCODE.vector(resultTypes),
	]
	
	//======//
	// WASM //
	//======//
	const WASM = () => {
	
		const addFunctionType = ENCODE.functionType(
			FUNCTION_TYPE.SINGLE_RESULT,
			[VALUE_TYPE.F32, VALUE_TYPE.F32],
			[VALUE_TYPE.F32],
		)
		
		const typeSection = ENCODE.section(
			SECTION.TYPE,
			[addFunctionType],
		)
	
		return Uint8Array.from([
			...HEADER,
			...VERSION,
			//...typeSection,
		])
	}
	
	const wasm = WASM()
	WebAssembly.instantiate(wasm).then(instance => instance.d)
	
}

