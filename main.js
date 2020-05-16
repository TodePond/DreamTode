//========================================================//
//    ____                         _____         _        //
//   |  _ \ _ __ ___  __ _ _ __ __|_   _|__   __| | ___   //
//   | | | | '__/ _ \/ _` | '_ ` _ \| |/ _ \ / _` |/ _ \  //
//   | |_| | | |  __/ (_| | | | | | | | (_) | (_| |  __/  //
//   |____/|_|  \___|\__,_|_| |_| |_|_|\___/ \__,_|\___|  //
//                                                        //
//========================================================//
const DreamTode = ([source]) => EAT.list (
	EAT.maybe(EAT.whitespace),
	EAT.maybe(EAT.Expression),
	EAT.maybe(EAT.whitespace),
	EAT.endOfFile,
)(source)

//=============//
// Expressions //
//=============//
EAT.Expression = EAT.or (
	EAT.ref("Array"),
	EAT.ref("Number"),
	EAT.ref("String"),
	EAT.ref("Void"),
)

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

//==========//
// Grouping //
//==========//
EAT.Group = (type) => EAT.list (
	EAT.string("("),
	EAT.maybe(EAT.whitespace),
	type,
	EAT.maybe(EAT.whitespace),
	EAT.string(")"),
)

//=======//
// Types //
//=======//
EAT.Array = EAT.or (
	EAT.ref("MultiLineOperation"),
	EAT.ref("ArrayOperation"),
	EAT.Group(EAT.ref("Array")),
)

EAT.Number = EAT.or (
	EAT.ref("AddOperation"),
	EAT.ref("SubtractOperation"),
	EAT.ref("MultiplyOperation"),
	EAT.ref("DivideOperation"),
	EAT.ref("PowerOperation"),
	EAT.UFloatLiteral,
	EAT.UIntLiteral,
	EAT.Group(EAT.ref("Number")),
)

EAT.String = EAT.or (
	EAT.ref("ConcatOperation"),
	EAT.StringLiteral,
	EAT.Group(EAT.ref("String")),
)

EAT.Void = EAT.or (
	EAT.ref("PrintFunction"),
	EAT.Group(EAT.ref("Void")),
)

//===========//
// Operators //
//===========//
EAT.Operation = (leftType, symbol, rightType, without = []) => EAT.list (
	EAT.without(leftType, without),
	EAT.maybe(EAT.gap),
	EAT.string(symbol),
	EAT.maybe(EAT.gap),
	rightType,
)

// Array
EAT.MultiLineOperation = EAT.Operation(EAT.Expression, "\n", EAT.Expression, [EAT.ref("MultiLineOperation")])
EAT.ArrayOperation = EAT.Operation(EAT.Expression, ",", EAT.Expression, [EAT.ref("ArrayOperation")])

// Number
EAT.AddOperation = EAT.Operation(EAT.Number, "+", EAT.Number, [EAT.ref("AddOperation")])
EAT.SubtractOperation = EAT.Operation(EAT.Number, "-", EAT.Number, [EAT.ref("SubtractOperation")])
EAT.MultiplyOperation = EAT.Operation(EAT.Number, "*", EAT.Number, [EAT.ref("MultiplyOperation")])
EAT.DivideOperation = EAT.Operation(EAT.Number, "/", EAT.Number, [EAT.ref("DivideOperation")])
EAT.PowerOperation = EAT.Operation(EAT.Number, "^", EAT.Number, [EAT.ref("PowerOperation")])

// String
EAT.ConcatOperation = EAT.Operation(EAT.String, "++", EAT.String, [EAT.ref("ConcatOperation")])

//===========//
// Functions //
//===========//
EAT.Function = (name, arg) => EAT.list (
	EAT.string(name),
	EAT.maybe(EAT.gap),
	arg,
)

EAT.PrintFunction = EAT.Function("print", EAT.Expression)
