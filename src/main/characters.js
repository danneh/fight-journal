const Characters = [
    {
        id: 'ryu',
        name: 'Ryu',
        slogan: 'Eternal Wanderer',
        power: 4,
        health: 3,
        mobility: 3,
        technique: 2,
        range: 4 
    },
    {
        id: 'chunLi',
        name: 'Chun-Li',
        slogan: 'Blue Jade',
        power: 2,
        health: 2,
        mobility: 4,
        technique: 4,
        range: 3 
    },
    {
        id: 'nash',
        name: 'Nash',
        slogan: 'Paradoxical Avenger',
        power: 2,
        health: 2,
        mobility: 4,
        technique: 4,
        range: 3 
    },
   {
        id: 'mBison',
        name: 'M. Bison',
        slogan: 'Emperor of Evil',
        power: 5,
        health: 3,
        mobility: 4,
        technique: 4,
        range: 3 
    },
    {
        id: 'cammy',
        name: 'Cammy',
        slogan: 'Techniques of Incomparable Precision',
        power: 3,
        health: 2,
        mobility: 5,
        technique: 2,
        range: 3 
    },
    {
        id: 'birdie',
        name: 'Birdie',
        slogan: 'Headbutt Happy Glutton',
        power: 4,
        health: 4,
        mobility: 1,
        technique: 3,
        range: 4 
    },
    {
        id: 'ken',
        name: 'Ken',
        slogan: 'The Fire-Breading Fist',
        power: 3,
        health: 3,
        mobility: 4,
        technique: 2,
        range: 3 
    },
    {
        id: 'necalli',
        name: 'Necalli',
        slogan: 'Soul Consuming Darkness',
        power: 5,
        health: 4,
        mobility: 4,
        technique: 2,
        range: 3 
    },
    {
        id: 'vega',
        name: 'Vega',
        slogan: 'The Sweet Whisperer of Death',
        power: 3,
        health: 2,
        mobility: 5,
        technique: 3,
        range: 3 
    },
    {
        id: 'rMika',
        name: 'R. Mika',
        slogan: '7 Colored Bomber',
        power: 3,
        health: 3,
        mobility: 2,
        technique: 4,
        range: 1 
    },
    {
        id: 'rashid',
        name: 'Rashid',
        slogan: 'A Friend Indeed',
        power: 2,
        health: 3,
        mobility: 4,
        technique: 3,
        range: 2
    },
    {
        id: 'karin',
        name: 'Karin',
        slogan: 'Perfect Victor',
        power: 3,
        health: 2,
        mobility: 4,
        technique: 5,
        range: 2
    },
    {
        id: 'zangief',
        name: 'Zangief',
        slogan: 'Iron Cyclone',
        power: 5,
        health: 5,
        mobility: 1,
        technique: 2,
        range: 3
    },
    {
        id: 'laura',
        name: 'Laura',
        slogan: 'Just Gotta Dance',
        power: 3,
        health: 3,
        mobility: 4,
        technique: 3,
        range: 1
    },
    {
        id: 'dhalsim',
        name: 'Dhalsim',
        slogan: 'Flame that Light the Way',
        power: 3,
        health: 2,
        mobility: 1,
        technique: 3,
        range: 5
    },
    {
        id: 'fang',
        name: 'F.A.N.G',
        slogan: 'Cunning Trickster',
        power: 2,
        health: 3,
        mobility: 3,
        technique: 3,
        range: 5
    },
    {
        id: 'alex',
        name: 'Alex',
        slogan: 'Awakened Talent',
        power: 3,
        health: 4,
        mobility: 2,
        technique: 3,
        range: 2
    },
    {
        id: 'guile',
        name: 'Guile',
        slogan: 'Air Slasher',
        power: 4,
        health: 3,
        mobility: 3,
        technique: 2,
        range: 4
    },
    {
        id: 'ibuki',
        name: 'Ibuki',
        slogan: 'Shinobi of the Summer Breeze',
        power: 2,
        health: 2,
        mobility: 4,
        technique: 3,
        range: 2
    },
    {
        id: 'balrog',
        name: 'Balrog',
        slogan: 'Destroyer of Rules',
        power: 4,
        health: 4,
        mobility: 3,
        technique: 3,
        range: 2
    },
    {
        id: 'juri',
        name: 'Juri',
        slogan: 'Purple Smoke of Deception',
        power: 3,
        health: 2,
        mobility: 5,
        technique: 2,
        range: 2
    },
    {
        id: 'urien',
        name: 'Urien',
        slogan: 'Dominating Light',
        power: 4,
        health: 4,
        mobility: 4,
        technique: 3,
        range: 3
    },
    {
        id: 'akuma',
        name: 'Akuma',
        slogan: 'Master of the Fists',
        power: 5,
        health: 3,
        mobility: 4,
        technique: 5,
        range: 3
    },
    {
        id: 'kolin',
        name: 'Kolin',
        slogan: 'Phantasm of Snow and Ice',
        power: 4,
        health: 2,
        mobility: 5,
        technique: 2,
        range: 3
    },
    {
        id: 'ed',
        name: 'Ed',
        slogan: 'Young Commander',
        power: 3,
        health: 3,
        mobility: 4,
        technique: 3,
        range: 3
    },
    {
        id: 'abigail',
        name: 'Abigail',
        slogan: 'Superhuman Hot-Rodder',
        power: 5,
        health: 5,
        mobility: 1,
        technique: 4,
        range: 5
    },
    {
        id: 'menat',
        name: 'Menat',
        slogan: 'Eyes of the Future',
        power: 3,
        health: 2,
        mobility: 2,
        technique: 3,
        range: 5
    },
    {
        id: 'zeku',
        name: 'Zeku',
        slogan: 'Ever-Changing Ninja',
        power: 4,
        health: 3,
        mobility: 4,
        technique: 5,
        range: 4
    },
    {
        id: 'sakura',
        name: 'Sakura',
        slogan: 'The Exuberant Youth',
        power: 3,
        health: 2,
        mobility: 3,
        technique: 4,
        range: 3
    },
    {
        id: 'blanka',
        name: 'Blanka',
        slogan: 'Warrior of the Amazon',
        power: 3,
        health: 3,
        mobility: 5,
        technique: 3,
        range: 3
    },
    {
        id: 'falke',
        name: 'Falke',
        slogan: 'The Guardian Hawk',
        power: 3,
        health: 2,
        mobility: 2,
        technique: 4,
        range: 4
    },
    {
        id: 'cody',
        name: 'Cody',
        slogan: 'Metro City\'s New Mayor',
        power: 3,
        health: 3,
        mobility: 3,
        technique: 5,
        range: 3
    },
    {
        id: 'g',
        name: 'G',
        slogan: 'Man of Mystery',
        power: 3,
        health: 3,
        mobility: 3,
        technique: 5,
        range: 4
    },
    {
        id: 'sagat',
        name: 'Sagat',
        slogan: 'The King',
        power: 4,
        health: 3,
        mobility: 2,
        technique: 4,
        range: 5
    },
    {
        id: 'kage',
        name: 'Kage',
        slogan: 'Embodiment of Satsui',
        power: 4,
        health: 2,
        mobility: 4,
        technique: 4,
        range: 3
    },
    {
        id: 'eHonda',
        name: 'E. Honda',
        slogan: 'Supreme Sumo',
        power: 4,
        health: 4,
        mobility: 3,
        technique: 2,
        range: 2
    },
    {
        id: 'lucia',
        name: 'Lucia',
        slogan: 'Metro City Cop',
        power: 3,
        health: 2,
        mobility: 4,
        technique: 3,
        range: 3
    },
    {
        id: 'poison',
        name: 'Poison',
        slogan: 'The Rose has Thornes',
        power: 3,
        health: 3,
        mobility: 2,
        technique: 2,
        range: 5
    },
    {
        id: 'gill',
        name: 'Gill',
        slogan: 'Emperor',
        power: 3,
        health: 3,
        mobility: 2,
        technique: 5,
        range: 4
    },
    {
        id: 'seth',
        name: 'seth',
        slogan: 'King of Chaos',
        power: 3,
        health: 3,
        mobility: 3,
        technique: 5,
        range: 4
    },
];
export default Characters;