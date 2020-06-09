<template>
    <div class="portfolio-game-entry">
        <div class="project-img-holder">
            <img class="img-fluid project-page-img" v-bind:src="require(`../../assets/ProtectRoguelike/Level2.png`)">
        </div>

         <p class="project-item-description">I love turn-based games and I love roguelikes, more than a year ago I started my adventure into trying to make roguelikes and started developing some systems. Up to this day, it was three different roguelike projects, three different level generation systems and one turn-based system, which I really like the outcome and I'm really proud of the result!</p>

        <p class="project-item-description">At one point, I realizing that making roguelikes was too much for the short amount of time I wanted to put in the project to finish it, and then started to find ways to scale things down, that's when Defensees came to mind. A simple turn-based game where you had to defend a door. It was simple, fun, and had a lot of run where I could put roguelike elements in the future.</p>

        <h4>Turn-based System</h4>
        <p class="project-item-description">The concept of the system is really simple, and I talked a little more about this system on <a href="https://fourthdimension.studio/devlog/2019-11-27-Turn-Based-System-Aglarond/" target="_BLANK">this devlog post.</a> - But the general idea is that there is a turn-based manager that holds a reference to all actors, which are objects that takes turns, so the manager is always asking the actor taking the turn something on the lines of: "Hey, did you take your turn yet?" Which on code looks something like this</p>

        <pre class="prettyprint linenums lang-cs">
private void ProcessCurrentActorTurn() {
  if(m_AllActorsOnScene[m_CurrentActorTurn].TakeTurn()) {
      if(m_AllActorsOnScene.Count > 0) {
          m_CurrentActorTurn = ((m_CurrentActorTurn + 1) % m_AllActorsOnScene.Count);
      }

      OnTurnWasTaken?.Invoke();
  }
}
</pre>

    </div>
</template>

<script>
</script>

<style scoped>
.portfolio-game-entry {
    text-align: justify;
}

/*
 * Derived from einaros's Sons of Obsidian theme at
 * http://studiostyl.es/schemes/son-of-obsidian by
 * Alex Ford of CodeTunnel:
 * http://CodeTunnel.com/blog/post/71/google-code-prettify-obsidian-theme
 */

 .str
 {
     color: #EC7600;
 }
 .kwd
 {
     color: #93C763;
 }
 .com
 {
     color: #66747B;
 }
 .typ
 {
     color: #678CB1;
 }
 .lit
 {
     color: #FACD22;
 }
 .pun
 {
     color: #F1F2F3;
 }
 .pln
 {
     color: #F1F2F3;
 }
 .tag
 {
     color: #8AC763;
 }
 .atn
 {
     color: #E0E2E4;
 }
 .atv
 {
     color: #EC7600;
 }
 .dec
 {
     color: purple;
 }
 pre.prettyprint
 {
     border: 0px solid #888;
 }
 ol.linenums
 {
     margin-top: 0;
     margin-bottom: 0;
 }
 .prettyprint {
     background: #000;
 }
 li.L0, li.L1, li.L2, li.L3, li.L4, li.L5, li.L6, li.L7, li.L8, li.L9
 {
     color: #555;
     list-style-type: decimal;
 }
 li.L1, li.L3, li.L5, li.L7, li.L9 {
     background: #111;
 }
 @media print
 {
     .str
     {
         color: #060;
     }
     .kwd
     {
         color: #006;
         font-weight: bold;
     }
     .com
     {
         color: #600;
         font-style: italic;
     }
     .typ
     {
         color: #404;
         font-weight: bold;
     }
     .lit
     {
         color: #044;
     }
     .pun
     {
         color: #440;
     }
     .pln
     {
         color: #000;
     }
     .tag
     {
         color: #006;
         font-weight: bold;
     }
     .atn
     {
         color: #404;
     }
     .atv
     {
         color: #060;
     }
 }

 li.L0, li.L1, li.L2, li.L3,
li.L5, li.L6, li.L7, li.L8 {
  list-style-type: decimal !important;
}

li.L0, li.L1, li.L2, li.L3,
li.L5, li.L6, li.L7, li.L8, li.L9 {
   background: #000;
}
</style>