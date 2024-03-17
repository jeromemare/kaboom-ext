import kaboom from "kaboom"
import { pointTowards, moveable, pointToMouse } from './components'

const k = kaboom()

k.loadSprite("bean", "sprites/arrow.png")

const arrow1 = k.add([
	k.pos(120, 80),
	k.sprite("bean"),
	k.anchor("center"),
	k.scale(0.05),
	pointTowards('tree'),
	moveable({ speed: 2 }),
])

const arrow2 = k.add([
	k.pos(420, 80),
	k.sprite("bean"),
	k.anchor("center"),
	k.scale(0.05),
	pointToMouse(),
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

k.onMousePress(() => {
	const pos = k.mousePos()

	k.add([
		k.pos(pos.x- 100, pos.y - 100),
		k.sprite("bean"),
		k.anchor("center"),
		k.scale(0.05),
		pointToMouse({ once: true }),
	])
})
