# DreamTode
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
let scores: UInt[] = 5, 2, 7, 2
let luke: Any[] = [name = "Luke", age = 26]
let args: Any{} = {name: String, age: UInt8}
```

Function
```
let add = {left, right} => left + right

add 3 2
```

Class
```
let makePerson = {name: String, age: UInt8} => [name, age]
let luke = makePerson "Luke" 26
```

Loop
```
let names = "Luke" "Bob" "Tim"
for names {name} => print "Hi $name!"

for 0 to names.length {i} => print "Hello $(names[i])!"
```