const DreamTode = ([source]) => EAT.list(
	EAT.maybe(EAT.whitespace),
	EAT.Expression,
	EAT.maybe(EAT.whitespace),
	EAT.endOfFile,
)(source)

//==========//
// Literals //
//==========//
EAT.UIntLiteral = EAT.list(
	EAT.many(EAT.regex(/[0-9]/)),
)

EAT.UFloatLiteral = EAT.list(
	EAT.many(EAT.regex(/[0-9]/)),
	EAT.string("."),
	EAT.many(EAT.regex(/[0-9]/)),
)

EAT.StringLiteral = EAT.list(
	EAT.string('"'),
	EAT.maybe(EAT.many(EAT.regex(/[^"]/))), //" this comment fixes my broken syntax highlighter
	EAT.string('"'),
)

//=======//
// Types //
//=======//
EAT.Number = EAT.or(
	EAT.ref("AddOperation"),
	EAT.ref("SubtractOperation"),
	EAT.ref("MultiplyOperation"),
	EAT.ref("DivideOperation"),
	EAT.ref("PowerOperation"),
	EAT.UFloatLiteral,
	EAT.UIntLiteral,
)

EAT.String = EAT.or(
	EAT.ref("ConcatOperation"),
	EAT.StringLiteral,
)

//===========//
// Operators //
//===========//
EAT.InfixOperation = (name, leftType, symbol, rightType) => EAT.list(
	EAT.orWithout(EAT.Number, [EAT.ref(name)]),
	EAT.maybe(EAT.gap),
	EAT.string(symbol),
	EAT.maybe(EAT.gap),
	rightType,
)

EAT.AddOperation = EAT.InfixOperation("AddOperation", EAT.Number, "+", EAT.Number)
EAT.SubtractOperation = EAT.InfixOperation("SubtractOperation", EAT.Number, "-", EAT.Number)
EAT.MultiplyOperation = EAT.InfixOperation("MultiplyOperation", EAT.Number, "*", EAT.Number)
EAT.DivideOperation = EAT.InfixOperation("DivideOperation", EAT.Number, "/", EAT.Number)
EAT.PowerOperation = EAT.InfixOperation("PowerOperation", EAT.Number, "^", EAT.Number)
EAT.ConcatOperation = EAT.InfixOperation("ConcatOperation", EAT.String, "++", EAT.String)

//=============//
// Expressions //
//=============//
EAT.Expression = EAT.or(
	EAT.Number,
	EAT.String,
)

