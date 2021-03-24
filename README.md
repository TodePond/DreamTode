This repo is very out-of-date. For the current spec, check out https://l2wilson94.gitbook.io/dreamtode 

# DreamTode
Some ideas to test out:
* Transpiles to WebAssembly.
* Parentheses ONLY used for grouping together stuff. NOT used for arguments.
* The parser can be modded.
* First-class parameters.
* You can write some horrific-looking code with DreamTode and that's ok.
* You can choose when a function gets done: run-time or compile-time.
* No classes or constructors or methods or inheritance. Only functions and data.
* Arrays and Objects are the same thing, but there are still two different literals to help you write them.
* No variables. Only constants. Arrays can mutate.
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

Arrays
```
let scores: UInt8[] = 5, 2, 7, 2
scores[0]

let luke: Any[] = [name = "Luke", age = 26]
luke.name
```

Functions
```
let add = [left, right] => left + right
add 3, 2
```

Conditions
```
let age = 27
if age >= 18, print "You are an adult!"
```

Loops
```
let names = "Luke" "Bob" "Tim"
for names, [name] => print "Hello $name!"
for 0 to names.length-1, [i] => print "Hello ${names(i)}!"
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
