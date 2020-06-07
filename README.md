# DreamTode
Some ideas to test out:
* Parentheses ONLY used for grouping together stuff. NOT used for arguments.
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
new Person "Luke" 26
```

Functions
```
let add = {left, right} => left + right
add 3 2
```

Structs
```
let Person = {name: String, age: UInt8}
let luke = new Person "Luke" 26
```

Loops
```
let names = "Luke" "Bob" "Tim"
for names {name} => print "Hi $name!"
for 0 to names.length {i} => print "Hello $(names[i])!"
```

Maps
```
let scores = 4, 6, 2, 5
let doubledScores = map scores {n} => n * 2
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
let age = &(luke.age)
luke.age = 27
print age //27
```

## Brackets
Parentheses are ALWAYS just grouping together stuff.
```
let score = (3 + 5) * 2
```

Square brackets are ALWAYS an object array literal.
```
let luke = [name = "Luke", age = 26]
```

Brace brackets are ALWAYS a pattern literal.
```
let args = {a: Number, b: Number}
```

You don't need any brackets for arrays.
```
let scores = 2, 6, 3, 4
```

## Arguments
You don't need to write commas or brackets when you call a function.
```
print add 3 2
```
However, you can still use brackets and stuff to help make your code clearer for the user and the parser.<br>
Parentheses show that tokens are grouped together.<br>
Commas show that tokens are an array (in this case, an array of args).<br>
I think I would write that expression like this:
```
print add(3, 2)
```
