//========================================================//
//    ____                         _____         _        //
//   |  _ \ _ __ ___  __ _ _ __ __|_   _|__   __| | ___   //
//   | | | | '__/ _ \/ _` | '_ ` _ \| |/ _ \ / _` |/ _ \  //
//   | |_| | | |  __/ (_| | | | | | | | (_) | (_| |  __/  //
//   |____/|_|  \___|\__,_|_| |_| |_|_|\___/ \__,_|\___|  //
//                                                        //
//========================================================//
const DreamTode = ([source]) => EAT.list(
	EAT.maybe(EAT.whitespace),
	EAT.Expression,
	EAT.maybe(EAT.whitespace),
	EAT.endOfFile,
)(source)

//==========//
// Literals //
//==========//
EAT.UIntLiteral = EAT.list (
	EAT.many(EAT.regex(/[0-9]/)),
)

EAT.UFloatLiteral = EAT.list (
	EAT.many(EAT.regex(/[0-9]/)),
	EAT.string("."),
	EAT.many(EAT.regex(/[0-9]/)),
)

EAT.StringLiteral = EAT.list (
	EAT.string('"'),
	EAT.maybe(EAT.many(EAT.regex(/[^"]/))), //" this comment fixes my broken syntax highlighter
	EAT.string('"'),
)

//=======//
// Types //
//=======//
EAT.Number = EAT.or (
	EAT.ref("AddOperation"),
	EAT.ref("SubtractOperation"),
	EAT.ref("MultiplyOperation"),
	EAT.ref("DivideOperation"),
	EAT.ref("PowerOperation"),
	EAT.UFloatLiteral,
	EAT.UIntLiteral,
)

EAT.String = EAT.or (
	EAT.ref("ConcatOperation"),
	EAT.StringLiteral,
)

//===========//
// Operators //
//===========//
EAT.InfixOperation = (leftType, symbol, rightType) => EAT.list (
	leftType,
	EAT.maybe(EAT.gap),
	EAT.string(symbol),
	EAT.maybe(EAT.gap),
	rightType,
)

EAT.AddOperation = EAT.InfixOperation(EAT.orWithout(EAT.Number, [EAT.ref("AddOperation")]), "+", EAT.Number)
EAT.SubtractOperation = EAT.InfixOperation(EAT.orWithout(EAT.Number, [EAT.ref("SubtractOperation")]), "-", EAT.Number)
EAT.MultiplyOperation = EAT.InfixOperation(EAT.orWithout(EAT.Number, [EAT.ref("MultiplyOperation")]), "*", EAT.Number)
EAT.DivideOperation = EAT.InfixOperation(EAT.orWithout(EAT.Number, [EAT.ref("DivideOperation")]), "/", EAT.Number)
EAT.PowerOperation = EAT.InfixOperation(EAT.orWithout(EAT.Number, [EAT.ref("PowerOperation")]), "^", EAT.Number)
EAT.ConcatOperation = EAT.InfixOperation(EAT.orWithout(EAT.String, [EAT.ref("ConcatOperation")]), "++", EAT.String)

//=============//
// Expressions //
//=============//
EAT.Expression = EAT.or (
	EAT.Number,
	EAT.String,
)
