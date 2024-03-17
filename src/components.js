
/**
 * Convertit un angle en radian en degré
 * 
 * @param {number} angleInRad un angle exprimé en radian
 * @return {number} l'angle correspondant en degré
 */
function rad2Deg(angleInRad) {
  return (angleInRad * 180) / Math.PI
}

/**
 * Convertit un angle en degré en radian
 * 
 * @param {number} angleInDeg un angle exprimé en degré
 * @return {number} l'angle correspondant en degré
 */
function deg2Rad(angleInDeg) {
  return Math.PI * angleInDeg / 180
}


/**
 * Calcule la distance entre 2 sprites
 * 
 * @param {Object} obj1 sprite Kaboom
 * @param {Object} obj2 sprite Kaboom
 * @return {number} la distance entre les deux objets
 */
function distance(obj1, obj2) {
  const { x: x1, y: y1 } = obj1.pos
  const { x: x2, y: y2 } = obj2.pos
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
}

/**
 * Identifie l'angle entre deux objets
 * 
 * @param {Object} obj1 Objet de référence
 * @param {Object} obj2 Objet dont l'on cherche l'angle vis-à-vis de l'objet de référence
 * @return l'angle entre les deux objets en degrés
 */
function angleTowardsObjects(obj1, obj2) {
  angleTowardsPos(obj1.pos, obj2.pos)
}

function angleTowardsPos (pos1, pos2) {
  const angleInRad = Math.atan((pos1.y - pos2.y) / (pos1.x - pos2.x))
  const angle = rad2Deg(angleInRad)
  return pos1.x >= pos2.x ? angle - 180 : angle
}

/**
 * Identifier l'objet le plus proche
 * 
 * @param {Object} obj objet de référence
 * @param {Array<Object>} objs liste d'objets dont on veut identifier lequel est le plus proche de obj
 * @return {Object} l'objet de la liste le plus proche de l'objet en référence
 */
function nearestObjectFrom(obj, objs) {
  const distances = objs.map(object => distance(object, obj))

  let nextObject = null
  let minDistance = Infinity
  distances.forEach((distance, index) => {
    if (distance < minDistance) {
      minDistance = distance
      nextObject = objs[index]
    }
  })

  return nextObject
}

/**
 * Obtient le context général de kaboom
 * 
 * @param {Object} object Un objet Kaboom
 * @return {Object} le context Kaboom
 */
function getKaboomContext(object) {
  if (!object.parent) {
    return object
  }

  return object.parent
}

/**
 * Composant permettant de pointer vers un objet
 * 
 * @param {Object} game instance de Kaboom représentant le jeu
 * @param {String} objetToFollow Tag de l'objet à suivre
 * @returns 
 */
export function pointTowards(objectToFollow) {
  const k = getKaboomContext(this)
  // Tag des objets à suivre avec notre orientation
  const tag = objectToFollow

  return {
    id: 'point-towards',
    // Ajout du composant au sprite
    add() {
      // Rien à faire
    },
    // Mise à jour du dessin du sprite à l'écran
    update() {
      // On identifie tous les objets avec le tags
      const objectsToPoint = k.get(tag)
      // On identifie l'objet le plus proche
      const nextObject = nearestObjectFrom(this, objectsToPoint)

      if (nextObject) {
        this.angle = angleTowardsObjects(this, nextObject)
      }

    }
  }
}

export function pointToMouse ({ once = false } = {}) {
  const k = getKaboomContext(this)
  
  return {
    id: 'point-to-mouse',
    // Ajout du composant au sprite
    add() {
      if (once) {
        this.updateAngle()
      }
    },
    // Mise à jour du dessin du sprite à l'écran
    update() {
      if (!once) {
        this.updateAngle()
      }
    },
    updateAngle () {
      this.angle = angleTowardsPos(this.pos, k.mousePos())
    }
  }
}

/**
 * Indique que l'objet peut être déplacé avec les flèches du clavier
 */
export function moveable(options) {
  const k = getKaboomContext(this)
  const speed = options.speed || 1
  let events = []

  return {
    id: 'moveable',
    // Ajout du composant au sprite
    add() {
      events = [
        k.onKeyDown("left", () => {
          this.pos.x -= speed
        }),
        k.onKeyDown("right", () => {
          this.pos.x += speed
        }),
        k.onKeyDown("up", () => {
          this.pos.y -= speed
        }),
        k.onKeyDown("down", () => {
          this.pos.y += speed
        }),
      ]
    },
    // Mise à jour du dessin du sprite à l'écran
    update () {
      // Rien à faire

    },
    destroy () {
      events.forEach(event => event.cancel())
    },
  }
}