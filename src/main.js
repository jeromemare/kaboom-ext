import kaboom from "kaboom"
import { pointTowards, moveable } from './components'

const k = kaboom()

k.loadSprite("bean", "sprites/bean.png")

const bean = k.add([
	k.pos(120, 80),
	k.sprite("bean"),
	k.anchor("center"),
	pointTowards('tree'),
	moveable({ speed: 2 }),
])

k.add([
	'tree',
	k.rect(48, 64),
	k.area(),
	k.outline(4),
	k.pos(350, 180),
	k.anchor("center"),
	k.color(255, 180, 255),
	// move(LEFT, 240),
])


k.add([
	'tree',
	k.rect(48, 64),
	k.area(),
	k.outline(4),
	k.pos(width() - 250, height() - 138),
	k.anchor("botleft"),
	k.color(255, 180, 255),
	// move(LEFT, 240),
])
