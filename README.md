# DreamTode
Some ideas to test out:
* Brackets ONLY used for grouping together stuff. NOT used for arguments.
* Arguments don't need commas or anything - to allow for heavy metaprogramming.
* The parser can be changed with the `def` keyword.
* First-class parameters in the form of "patterns".
* You can write some horrific-looking code with DreamTode and that's ok.
* You can choose when a function gets done: run-time or compile-time.
* NO constructors and methods. Just use functions.
* Arrays and Objects are the same thing, but there are still two different literals to help you write them.
* Optional typing is 100% for optimization reasons. NOT for readability/safety.
* Named constants can NEVER be reassigned. Arrays can mutate.
* No end-of-line characters, eg: semicolons, commas.

## Brackets
Brackets are ALWAYS just grouping together stuff.
```
(3 + 5) * 2
```

Square brackets are ALWAYS an object array literal.
```
[name = "Luke", age = 26]
```

Brace brackets are ALWAYS a pattern literal.
```
{a: Number, b: Number}
```

## Stuff
Constant
```
let name = "Luke"
let age = 26
```

Explicit Type
```
let name: String = "Luke"
let age: UInt8 = 26
```

Structure
```
let scores: UInt8[] = 5, 2, 7, 2
let luke: Any[] = [name = "Luke", age = 26]
let args: Any{} = {name, age}
```

Function
```
let add = {left, right} => left + right
add 3 2
```

Struct
```
let Person = {name: String, age: UInt8}
let luke = new Person "Luke" 26
```

Loop
```
let names = "Luke" "Bob" "Tim"
for names {name} => print "Hi $name!"
for 0 to names.length {i} => print "Hello $(names[i])!"
```

Map
```
let scores = 4, 6, 2, 5
let doubledScores = map scores {n} => n * 2
```

Operator
```
def {left, <"add">, right} => left + right
3 add 2
```

Literal
```
def {<"'">, inner: </[^']*/>, <"'">} => inner
print 'Hello world!'
```