# DreamTode
Some ideas to test out:
* Transpiles to WebAssembly.
* Parentheses ONLY used for grouping together stuff. NOT used for arguments.
* The parser can be modded with the `def` keyword.
* First-class parameters in the form of "patterns".
* You can write some horrific-looking code with DreamTode and that's ok.
* You can choose when a function gets done: run-time or compile-time.
* No classes or constructors or methods or inheritance. Only functions and constants.
* Arrays and Objects are the same thing, but there are still two different literals to help you write them.
* No variables. Only constants. Arrays can mutate.
* No end-of-line characters, eg: semicolons, commas.
* Everything is by value by default. Reference by using `&`. Is this really a good idea? It sounds appealing to have everything aggressively minimise as much as possible in some circumstances. Perhaps that's what this language would be for. Maybe it is worth separating this idea from the syntax ideas though - they kind of stretch the language in two opposite directions. The syntax stuff could be for a more scripting focused language. The low level stuff could be a different language - mainly just an interface for WebAssembly.

## Stuff to experiment with
Constants
```
let name = "Luke"
let age = 26
```

Explicit Types
```
let name: String = "Luke"
let age: UInt8 = 26
```

Structures
```
let scores: UInt8[] = 5, 2, 7, 2
scores[0]

let luke: Any[] = [name = "Luke", age = 26]
luke.name

let Person: Any{} = {name, age}
new Person "Luke", 26
```

Functions
```
let add = {left, right} => left + right
add 3, 2
```

Structs
```
let Person = {name: String, age: UInt8}
let luke = new Person "Luke", 26
```

Conditions
```
let age = 26
if age >= 18, print "You are an adult!"
```

Loops
```
let names = "Luke" "Bob" "Tim"
for {name} of names, print "Hello $name!"
for {i} in names, print "Hello $(names[i])!"
```
```
loop names, {name} => print "Hello $name!"
```

Maps
```
let scores = 4, 6, 2, 5
let doubledScores = map scores, {n} => n * 2
```

Operators
```
def {left, <"add">, right} => left + right
3 add 2
```

Literals
```
def {<"'">, inner: </[^']*/>, <"'">} => inner
print 'Hello world!'
```

Compile-Time
```
@print "I print at run-time"
#print "I print at compile-time"
print "I print at run-time (by default)"

print @(2 + 3) //run-time calculation
print #(2 + 3) //compile-time calculation
print (2 + 3) //compile-time calculation (by default)
```

References
```
let bob = [name = "Bob", age = 24]
let age = bob.age
bob.age = 25
print age //24

let luke = [name = "Luke", age = 26]
let age = &luke.age
luke.age = 27
print age //27
```

## Brackets
Parentheses are ALWAYS just grouping together stuff.
```
let score = (3 + 5) * 2
```

You don't need any brackets for arrays.
```
let scores = 2, 6, 3, 4
```

Square brackets are ALWAYS an array (with named properties).
```
let luke = [name = "Luke", age = 26]
```

Brace brackets are ALWAYS a pattern literal.
```
let args = {a: Number, b: Number}
```

## Arguments
You don't need to write brackets when you call a function.
```
print add 3, 2
```
However, you can still use brackets to help make your code clearer for the user and the parser.<br>
I think I would write that expression like this:
```
print add(3, 2)
```
