var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 300
            },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var stars;
var bombs;
var platforms;
var cursors;
var third;
var second;
var first;
var expert;
var master;
var gems= 0;
var trophies = 0;
var level = 1;
var gameOver = false;
var scoreText;
var game;

$(document).ready(function() {
    game = new Phaser.Game(config);
});
  


function preload() {

    this.load.image('natureworld','bg.png');
    this.load.image('ground', 'platform.png');
    this.load.image('floor', 'groundlayer.png');
    this.load.image('star', 'gemBlue.png');
    this.load.image('bomb', 'spinner_spin.png');
    this.load.image('bronze', 'bronze.png');
    this.load.image('rookiebadge', 'rookiebadge.png');
    this.load.image('silver', 'silver.png')
    this.load.image('traineebadge', 'traineebadge.png');
    this.load.image('gold', 'gold.png');
    this.load.image('veteranbadge', 'veteranbadge.png');
    this.load.image('platinum', 'platinum.png');
    this.load.image('expertbadge', 'expertbadge.png');
    this.load.image('diamond', 'diamond.png');
    this.load.image('masterbadge', 'masterbadge.png');
    this.load.spritesheet('dude', 'assets/dude.png', {
        frameWidth: 32,
        frameHeight: 48
    });
}

function create() {
    

    //  A simple background for our game
    this.add.image(400, 300, 'natureworld');
    keyBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    //  The platforms group contains the ground and the 2 ledges we can jump on

    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 568, 'floor').setScale(2).refreshBody();

    //  Now let's create some ledges
    platforms.create(400, 300, 'ground');
    platforms.create(750, 440, 'ground');
    platforms.create(50, 440, 'ground');

    // The player and its settings
    player = this.physics.add.sprite(100, 450, 'dude');

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    
  
    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', {
            start: 0,
            end: 3
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: this.anims.generateFrameNumbers('dude', {
            start: 4,
            end: 4
        }),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', {
            start: 5,
            end: 8
        }),
        frameRate: 10,
        repeat: -1
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    stars = this.physics.add.group({
        key: 'star',
        repeat: 9,
        setXY: {
            x: 10,
            y: 0,
            stepX: 80
        }
    });

    stars.children.iterate(function (child) {

        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    bombs = this.physics.add.group();
    

    //  The score
    scoreText = this.add.text(16, 16, 'gems: 0', {
        fontSize: '40px',
        fill: '#000000'
    });

trophyText = this.add.text(16,50, 'Begin by collecting 300 gems', {
    fontSize: '32px',
    fill: '#000000'
});

levelText = this.add.text(600,16, 'Level: 1', {
    fontSize: '32px',
    fill: '#FFFFFF'
});
    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);
  

    //  Checks to see if the player overlaps with any of the stars if he does call the collectStar function
    this.physics.add.overlap(player, stars, collectStar, null, this);

    this.physics.add.collider(player, bombs, hitBomb, null, this);

}

function update() {
    if (gameOver) {
        return;
    }

    if (cursors.left.isDown) {
        player.setVelocityX(-200);

        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(200);

        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);

        player.anims.play('turn', true);
    }

    if (keyBar.isDown && player.body.touching.down) {
        player.setVelocityY(-310);
    }
}

function collectStar(player, star) {
    star.disableBody(true, true);

    //  Add and update the score
    gems += 10;
    scoreText.setText('Gems: ' + gems);

    if (gems=='300') {
        third = this.physics.add.image(250, 200, 'bronze');
        third.setBounce(0.8);
        third.setCollideWorldBounds(true);;
        this.physics.add.collider(third, platforms);
        this.physics.add.collider(player, third, collectBronze, null, this);
        trophyText.setText('collect your trophy!');
    }
    if (gems=='400') {
        second = this.physics.add.image(280, 200, 'silver');
        second.setBounce(0.8);
        second.setCollideWorldBounds(true);;
        this.physics.add.collider(second, platforms);
        this.physics.add.collider(player, second, collectSilver, null, this);

    }

    if (gems=='550') {
        first = this.physics.add.image(300, 200, 'gold');
        first.setBounce(0.8);
        first.setCollideWorldBounds(true);;
        this.physics.add.collider(first, platforms);
        this.physics.add.collider(player, first, collectGold, null, this);

    }

    if (gems=='650') {
        expert = this.physics.add.image(310, 200, 'platinum');
        expert.setBounce(0.4);
        expert.setCollideWorldBounds(true);;
        this.physics.add.collider(expert, platforms);
        this.physics.add.collider(player, expert, collectPlatinum, null, this);
        
    }

    if (gems=='800') {
        master = this.physics.add.image(420, 200, 'diamond');
        master.setBounce(0.4);
        master.setCollideWorldBounds(true);;
        this.physics.add.collider(master, platforms);
        this.physics.add.collider(player, master, collectDiamond, null, this);
        

    }



    if (stars.countActive(true) === 0) {
    level += 1
    levelText.setText ('Level: ' + level)
    
        //  A new batch of stars to collect
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-250, 250), 20);
        bomb.allowGravity = false;

    }
}

function hitBomb(player, bomb) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
}

function collectBronze(player, third) {
    
    trophyText.setText('Bronze/ Class: Rookie');
    fill: '#CD7F32'
    third.disableBody(true, true);
    this.add.image(120, 440, 'rookiebadge');

    
}

function collectSilver(player, second) {
   
    trophyText.setText('Silver/ Class: Trainee');
    second.disableBody(true, true);
    this.add.image(680, 440, 'traineebadge');
}

function collectGold(player, first) {
   
    trophyText.setText('Gold/ Class: Veteran');
    first.disableBody(true, true);
    this.add.image(400, 300, 'veteranbadge');
}

function collectPlatinum(player, expert) {
   
    trophyText.setText('Platinum/ Class: Expert!');
    expert.disableBody(true, true);
    this.add.image(400, 560, 'expertbadge');
}

function collectDiamond(player, master) {
   
    trophyText.setText('Class: Master of Gems!');
    master.disableBody(true, true);
    this.add.image(400, 150, 'masterbadge');
}



