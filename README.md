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
let luke = Person "Luke" 26
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
def {<"'">, inner: </[^']*/>, <"'">} => "$inner"
```