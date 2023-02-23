new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        StartGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = []
        },
        Attack: function() {
            var damage = this.CalculateDamage(3, 10);
            this.monsterHealth = Math.max(this.monsterHealth - damage, 0);
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage + ' damage.'
            });
            
            if(this.CheckWinCondition()) return;
            this.MonsterDealDamage();
        },
        Heal: function() {
            this.playerHealth = Math.min(this.playerHealth + 10, 100);
            
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for ' + 10 + ' damage.'
            });

            this.MonsterDealDamage();
        },
        SpecialAttack: function() {
            var damage = this.CalculateDamage(10,20);
            this.monsterHealth = Math.max(this.monsterHealth - damage, 0);
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster with a Special Attack for ' + damage + ' damage.'
            });
            
            if(this.CheckWinCondition()) return;
            this.MonsterDealDamage();
        },
        GiveUp: function() {
            this.gameIsRunning = false;
        },
        MonsterDealDamage: function() {
            var damage = this.CalculateDamage(5, 12);
            this.playerHealth = Math.max(this.playerHealth - damage, 0);
            
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + damage + ' damage.'
            });

            this.CheckWinCondition();
        },
        CalculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        CheckWinCondition: function() {
            if(this.monsterHealth <= 0) {
                this.turns.unshift({
                    isPlayer: true,
                    text: 'Player defeated the Monster!'
                });
                
                if(confirm("You Won! Want to Play Again?")) {
                    this.StartGame();    
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if(this.playerHealth <= 0) {
                this.turns.unshift({
                    isPlayer: true,
                    text: 'Monster defeated the Player!'
                });

                if(confirm("You Lost! Want to Play Again?")) {
                    this.StartGame();    
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});