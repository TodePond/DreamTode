
//
// Every result has three properties...
//
// 'success'
// true if the desired thing was found
//
// 'snippet'
// the desired thing
//
// 'code'
// the rest of the code (with the desired thing removed)
//

const EAT = {}

{
	
	//====================//
	// Control Structures //
	//====================//
	EAT.many = (func) => (source, args) => {
		
		// Buffers
		let success = undefined
		let code = source
		
		// Head
		let headResult = undefined
		headResult = {success, code} = func(code, args)
		if (!success) return {...headResult, code: source}
		
		// Tail
		let tailResult = undefined
		tailResult = {success, code} = EAT.many(func)(code, args)
		if (!success) return headResult
		tailResult.snippet = headResult.snippet + tailResult.snippet
		return tailResult
		
	}
	
	EAT.maybe = (func) => (source, args) => {
		
		let result = undefined
		let success = undefined
		let code = source
		
		result = {success, code} = func(code, args)
		if (!success) {
			result.success = true
			result.snippet = ""
		}
		
		return result
	}
	
	EAT.list = (...funcs) => (source, args) => {
		
		// Buffers
		let success = undefined
		let code = source
		
		// Head
		let headResult = undefined
		const headFunc = funcs[0]
		headResult = {success, code} = headFunc(code, args)
		if (!success) return {...headResult, code: source}
		
		// Tail
		let tailResult = undefined
		const tailFuncs = funcs.slice(1)
		if (tailFuncs.length == 0) return headResult
		tailResult = {success, code} = EAT.list(...tailFuncs)(code, args)
		tailResult.snippet = headResult.snippet + tailResult.snippet
		return tailResult
		
	}
	
	EAT.or = (...funcs) => EAT.orDynamic(funcs)
	EAT.orDynamic = (funcs) => (source, args = {without: []}) => {
		const {without} = args
		for (const func of funcs) {
			if (without.includes(func)) continue
			const result = func(source, args)
			if (result.success) return result
		}
		return EAT.fail(source)
	}
	
	EAT.orWithout = (orFunc, without) => (source, args) => {
		return orFunc(source, {...args, without: [...args.without, ...without]})
	}
	
	EAT.and = (...funcs) => (source, args) => {
		for (const func of funcs) {
			const result = func(source, args)
			if (!result.success) return EAT.fail(source)
		}
		return EAT.succeed(source)
	}
	
	EAT.not = (func) => (source, args) => {
		const result = func(source, args)
		if (result.success) return EAT.fail(source)
		else return {...result, success: true}
	}
	
	const referenceCache = {}
	EAT.reference = (funcName) => {
		if (referenceCache[funcName] != undefined) return referenceCache[funcName]
		const func = (source, args) => EAT[funcName](source, args)
		referenceCache[funcName] = func
		return func
	}
	EAT.ref = EAT.reference
	
	EAT.endOfFile = (source) => ({success: source.length == 0, snippet: "", code: source})
	EAT.eof = EAT.endOfFile
	
	EAT.succeed = (source) => ({success: true, snippet: undefined, code: source})
	EAT.fail = (source) => ({success: false, snippet: undefined, code: source})
	
	//====================//
	// In-Built Functions //
	//====================//	
	EAT.string = (string) => (source) => {
		const success = source.slice(0, string.length) == string
		const snippet = success? string : undefined
		const code = success? source.slice(string.length) : source
		return {success, snippet, code}
	}
	
	EAT.regexp = EAT.regExp = EAT.regex = EAT.regEx = (regex) => (source) => {
		const fullRegex = new RegExp("^" + regex.source + "$")
		
		let i = 0
		while (i <= source.length) {
			const snippet = source.slice(0, i)
			const success = fullRegex.test(snippet)
			if (success) {
				const code = source.slice(snippet.length)
				return {success, snippet, code}
			}
			i++
		}
		
		const success = false
		const snippet = undefined
		const code = source
		return {success, snippet, code}
		
	}
	
	EAT.space = EAT.string(" ")
	EAT.tab = EAT.string("	")
	EAT.newline = EAT.newLine = EAT.string("\n")
	
	EAT.gap = EAT.many (
		EAT.or (
			EAT.space,
			EAT.tab,
		)
	)
	
	EAT.whitespace = EAT.whiteSpace = EAT.many (
		EAT.or (
			EAT.space,
			EAT.tab,
			EAT.newline,
		)
	)
	
	EAT.emptyLine = EAT.list (
		EAT.maybe(EAT.gap),
		EAT.newline,
	)
	
	EAT.emptyLines = EAT.many(EAT.emptyLine)
	
	EAT.name = EAT.list (
		EAT.regexp(/[a-zA-Z_$]/),
		EAT.many(EAT.regex(/[a-zA-Z0-9_$]/))
	)
	
	EAT.margin = EAT.or (
		EAT.many(EAT.tab),
		EAT.many(EAT.space),
	)
	
	EAT.line = EAT.many(EAT.regex(/[^\n]/))
	
}