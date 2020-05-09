const DreamTode = ([source]) => EAT.list(
	EAT.Expression,
	EAT.endOfFile,
)(source)

//==========//
// Literals //
//==========//
EAT.UIntLiteral = EAT.list(
	EAT.regex(/[1-9]/),
	EAT.maybe(EAT.many(EAT.regex(/[0-9]/))),
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
const Numbers = [
	EAT.UFloatLiteral,
	EAT.UIntLiteral,
]

EAT.Number = EAT.orDynamic(Numbers)

EAT.String = EAT.or(
	EAT.StringLiteral,
)

//===========//
// Operators //
//===========//
EAT.InfixOperation = (leftType, symbol, rightType) => EAT.list(
	leftType,
	EAT.maybe(EAT.gap),
	EAT.string(symbol),
	EAT.maybe(EAT.gap),
	rightType,
)

EAT.AddOperation = EAT.InfixOperation(EAT.Number, "+", EAT.Number)
EAT.SubtractOperation = EAT.InfixOperation(EAT.Number, "-", EAT.Number)
EAT.MuliplyOperation = EAT.InfixOperation(EAT.Number, "*", EAT.Number)
EAT.DivideOperation = EAT.InfixOperation(EAT.Number, "/", EAT.Number)
EAT.PowerOperation = EAT.InfixOperation(EAT.Number, "^", EAT.Number)
EAT.ConcatOperation = EAT.InfixOperation(EAT.String, "++", EAT.String)

//=============//
// Expressions //
//=============//
EAT.Expression = EAT.or(
	EAT.SubtractOperation,
	EAT.MuliplyOperation,
	EAT.DivideOperation,
	EAT.PowerOperation,
	EAT.ConcatOperation,
	EAT.Number,
	EAT.String,
)

