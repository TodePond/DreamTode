```
//===========//
// Constants //
//===========//
let WORLD_WIDTH = 50
let WORLD_HEIGHT = 50

//============//
// Structures //
//============//
let Element = {
	name: String
	categories: String[] = ()
	colour: Colour = "grey"
	visible: Bool = true
	behave: Function = {atom, space} => ()
}

let Atom = {
	element: @Element = @Empty
}

let Space = {
	atom: Atom = new Atom()
	below: @Space
}

//=========//
// Globals //
//=========//
let spaces = new Space[WORLD_WIDTH][WORLD_HEIGHT]()

for {x, y} of spaces (
	if y+1 >= WORLD_HEIGHT, continue
	spaces[x][y].below = @spaces[x][y-1]
)

//==========//
// Elements //
//==========//
let Empty = new Element [
	name = "Empty"
	visible = false
]

let Sand = new Element [
	name = "Sand"
	categories = "Sandbox"
	colour = "#FC0"
	behave = (atom, space) => (
		if space.below.atom.element == Empty
	)
]
```