spells = {
    WOOP: function() {
        player.move(randomPassableTile());
    },
    QUAKE: function() {
        for(let i = 0; i < numTiles; i++) {
            for(let j = 0; j < numTiles; j++) {
                let tile = getTile(i, j);
                if(tile.monster) {
                    let numWalls = 4 - tile.getAdjacentPassableNeighbors().length;
                    tile.monster.hit(numWalls * 2);
                }
            }
        }
        shakeAmount = 20;
    },

    MAELSTROM: function() {
        for(let i = 0; i < monsters.length; i++) {
            monsters[i].move(randomPassableTile());
            monsters[i].teleportCounter = 2;
        }
    },

    MULLIGAN: function() {
        startLevel(1, player.spells);
    },

    AURA: function() {
        player.tile.getAdjacentNeighbors().forEach(function(t) {
            t.setEffect(13);
            if(t.monster) {
                t.monster.heal(1);
            }
        });
        player.tile.setEffect(13);
        player.heal(1);
    },

    DASH: function() {
        let newTile = player.tile;
        while(true) {
            let testTile = newTile.getNeighbor(player.lastMove[0], player.lastMove[1]);
            if(testTile.passable && !testTile.monster) {
                newTile = testTile;
            } else {
                break;
            }
        }

        if(player.tile != newTile) {
            player.move(newTile);
            newTile.getAdjacentNeighbors().forEach(t => {
                if(t.monster) {
                    t.setEffect(14);
                    t.monster.stunned = true;
                    t.monster.hit(1);
                }
            });
        }
    },

    // replaces all walls (not including the outer wall) with floors. The player is healed for 2 health and an effect is drawn on the player tile.
    DIG: function() {
        for(let i=1; i<numTiles-1; i++) {
            for(let j=1; j<numTiles-1; j++) {
                let tile = getTile(i, j);
                if(!tile.passable) {
                    tile.replace(Floor);
                }
            }
        }
        player.tile.setEffect(13);
        player.heal(2);
    },

    // heals all monsters and generates a treasure on their tile.
    KINGMAKER: function() {
        for(let i = 0; i < monsters.length; i++) {
            monsters[i].heal(1);
            monster[i].title.treasure = true;
        }
    },

    // ALCHEMY turns all adjacent walls that are not part of the outer wall into floors with a teasure.
    ALCHEMY: function() {
        player.tile.getAdjacentNeighbors().foreach(function(t) {
            if(!t.passable && isBounds(t.x, t.y)) {
                t.replace(Floor).treasure = true;
            }
        });
    },

    // POWER makes the next player attack do 6 damage by using a new variable called bonusAttack .
    POWER: function() {
        player.bonusAttack = 5;
    },

    // duplicates spells. It iterates over the player spells in reverse and copies a spell from the previous element if the current element is empty.
    BUBBLE: function() {
        for(let i=player.spells.length-1; i>0; i--) {
            if(!player.spells[i]) {
                player.spells[i] = player.spells[i-1];
            }
        }
    },

    BRAVERY: function() {
        player.shield = 2;
        for(let i = 0; i < monsters.length; i++) {
            monsters[i].stunned = true;
        }
    },

    BOLT: function() {
        boltTravel(player.lastMove, 15 + Math.abs(player.lastMove[1]), 4);
    },

    CROSS: function() {
        let directions = [
            [0, -1],
            [0, 1],
            [-1, 0],
            [1, 0]
        ];

        for(let k = 0; k < directions.length; k++) {
            boltTravel(directions[k], 15 + Math.abs(directions[k][1]), 2);
        }
    },

    EX: function() {
        let directions = [
            [-1, -1],
            [-1, 1],
            [1, -1],
            [1, 1]
        ];
        for(let k = 0; k < directions.length; k++) {
            boltTravel(directions[k], 14, 3);
        }
    }

}

function boltTravel(direction, effect, damage) {
    let newTile = player.tile;
    while(true) {
        let testTile = newTile.getNeighbor(direction[0], direction[1]);
        if(testTile.passable) {
            newTile = testTile;
            if(newTile.monster) {
                newTile.monster.hit(damage);
            }
            newTile.setEffect(effect);
        } else {
            break;
        }
    }
}
