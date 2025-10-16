G.AddData({
	name:'Coal, "pepper", bee mod and agricultura',
	author:'Bruno Mussoi Mendonça, Orteil, Shadowclaimer and Luckius_',
	desc:'Adds coal as a crafting option for firepits and a way to purify water using coal+sand, A simple example mod that adds hot peppers and hot sauce, a basic mod that adds Honeycomb and Bees and a mod that adds agriculture and a lot of other things related to food.',
	engineVersion:1,
	manifest:0,
	requires:['Default dataset*'],
    sheets:{
        'spicySheet':'img/spicyModIconSheet.png',
        'honeySheet':'http://i.imgur.com/bhNRZSv.png',
        'agricultura':'https://mrlucky974.github.io/NeverEnding%20Legacy%20Mods/AgriculturaMod/iconSheet.png'
    },

	/*sheets:{
		'coal_images':'coal_images.png'
	},*/

	func:function() {

        /*G.contextNames['farming']='Farming'; //New production context (seperates the units from the others)*/

        //Categorias
        
        G.resCategories['agriculture'] = {
            name: 'Agriculture',
            base: [],
            side: []
        };

        G.resCategories['ingredients'] = {
            name: 'Ingredients',
            base: [],
            side: []
        };

        //Recursos

        new G.Res({
		    name:'honeycomb',
		    desc:'[honeycomb]s are extremely sweet treats, but well guarded by wild [bees].',
		    icon:[1,0,'honeySheet'],
		    turnToByContext:{'eat':{'health':0.01,'happiness':-0.03},'decay':{'spoiled food':0.5}},//this basically translates to : "when eaten, generate some health and happiness; when rotting, turn into either nothing or some spoiled food"
		    partOf:'food',
		    category:'food',
	    });

        new G.Res({
		    name:'bees',
		    desc:'[bees] are stinging insects, bee-ware!',
		    icon:[1,0,'honeySheet'],
		    partOf:'misc materials',
		    category:'misc',
	    });

	    new G.Res({
		    name:'honey',
		    desc:'Little bees will produce the sweetest honey when well taken care of.',
		    icon:[1,0,'honeySheet'],
		    turnToByContext:{'eat':{'health':0.03,'happiness':0.1},'decay':{'honey':0.95,'spoiled food':0.05}},//that last part makes hot sauce effectively have a 95% chance of simply not rotting (in effect, it decays into itself)
		    partOf:'food',
		    category:'food',
	    });

        new G.Res({
            name:'vegetable',
            desc:'[vegetable, Vegetables] are grown by planting [root]s found in nature.',
            icon:[0,1,'agricultura'],
            turnToByContext:{'eat':{'health':0.02,'happiness':0.02}, 'decay':{'spoiled food':1}}, //When decaying, always transform to spoiled food
            partOf:'food',
            category:'food',
        });

        new G.Res({
            name:'cereal',
            desc:'[cereal, Cereals] are grown by planting [seed]s found in grass.',
            icon:[],
            turnToByContext:{'eat':{'health':0.005,'happiness':-0.03}, 'decay':{'cereal':0.7, 'spoiled food':0.3}},
            partOf:'food',
            category:'food',
        });

         new G.Res({
            name:'flour',
            desc:'[flour] is produced from the conversion of [cereal]s in the [mill].',
            icon:[1,0,'agricultura'],
            turnToByContext:{'eat':{'health':0.0025,'happiness':-0.05}, 'decay':{'flour':0.9, 'spoiled food':0.1}},
            partOf:'food',
            category:'ingredients',
        });

        new G.Res({
            name:'dough',
            desc:'[dough] is made by an [artisan] from [flour] and [water].//Used to make [bread] on the [furnace].',
            icon:[2,0,'agricultura'],
            turnToByContext:{'eat':{'health':0.05,'happiness':-0.007}, 'decay':{'dough':0.1, 'spoiled food':0.9}},
            partOf:'food',
            category:'ingredients',
        });

        new G.Res({
            name:'compost',
            desc:'[compost] is used to grow farmlands faster.',
            icon:[2,1,'agricultura'],
            turnToByContext:{/*'eat':{'health':0.0025,'happiness':-0.05},*/ 'decay':{/*'flour':0.9, 'spoiled food':0.1*/}},
            //partOf:'food',
            category:'agriculture',
        });

        new G.Res({
            name:'manure',
            desc:'[manure] is the byproduct of animal/human food consumption.',
            icon:[1,1,'agricultura'],
            turnToByContext:{/*'eat':{'health':0.0025,'happiness':-0.05},*/ 'decay':{'compost':0.7}},
            //partOf:'food',
            category:'agriculture',
        });

            new G.Res({
		    name:'hot pepper',
		    desc:'[hot pepper]s are loaded with capsaicin and, depending on who you ask, may produce a pleasant burn when eaten.',
		    icon:[0,0,'spicySheet'],
		    turnToByContext:{'eat':{'health':0.01,'happiness':0.03},'decay':{'spoiled food':0.5}},//this basically translates to : "when eaten, generate some health and happiness; when rotting, turn into either nothing or some spoiled food"
		    partOf:'food',
		    category:'food',
	    });

	        new G.Res({
		    name:'hot sauce',
		    desc:'Made from [herb]s and the [hot pepper,Spiciest peppers], this [hot sauce] stays fresh for a while and will leave anyone panting and asking for more.',
		    icon:[1,0,'spicySheet'],
		    turnToByContext:{'eat':{'health':0.03,'happiness':0.1},'decay':{'hot sauce':0.95,'spoiled food':0.05}},//that last part makes hot sauce effectively have a 95% chance of simply not rotting (in effect, it decays into itself)
		    partOf:'food',
		    category:'Ingredients',
	    });

         //Seeds are used in farmlands to produce various fruits and cereals
        new G.Res({
            name:'seed',
            desc:'[seed]s grow fruits and cereals.',
            icon:[0,0,'agricultura'],
            turnToByContext:{'eating':{'health':0.005,'happiness':-0.03}, decay:{'seed':1}}, //Seeds can't spoil
            partOf:'food',
            category:'agriculture',
        });

        //Roots are used in farmlands to produce vegetables
        new G.Res({
            name:'root',
            desc:'[root]s are found in the wild, you can grow a lot of different vegetables.',
            icon:[3,1,'agricultura'],
            turnToByContext:{'eating':{'health':0.005,'happiness':-0.005}, 'decay':{'root':0.4, 'spoiled food':0.6}},
            partOf:'food',
            category:'agriculture',
        });


        //Tecnologia

        new G.Tech({
		name:'beekeeping',
		desc:'@[gatherer]s can find bees@[beekepers]s can now produce [honeycomb] from [bees]//With a lot of work,we can make honeycomb for honey.',
		icon:[0,1,'honeySheet'],
		cost:{'insight':10},
		req:{'cooking':true},
	    });

        new G.Tech({
		name:'hot sauce preparing',
		desc:'@[artisan]s can now produce [hot sauce] from [hot pepper]s and [herb]s//This special recipe allows a skilled craftsman to fully express the complex aromas present in hot peppers.',
		icon:[0,1,'spicySheet'],
		cost:{'insight':10},
		req:{'cooking':true},
	    });

        new G.Tech({
            name:'wheel',
            desc:'@the power of the wheel unlocks a whole new dimension.',
            icon:[],
            cost:{'insight':20},
            req:{'tool-making':true},
            effects:[],
        });

        new G.Tech({
            name:'milling',
            desc:'@unlocks the [mill].',
            icon:[],
            cost:{'insight':20},
            req:{'wheel':true, 'building':true},
            effects:[],
        });

        new G.Tech({
            name:'agriculture',
            desc:'@unlocks [farmland]s.',
            icon:[1,2,'agricultura'],
            cost:{'insight':15},
            req:{'sedentism':true},
            effects:[],
        });

        new G.Tech({
            name:'composting',
            desc:'@get rit of the [spoiled food] and turn it in [bugs].',
            icon:[],
            cost:{'insight':20},
            req:{'agriculture':true},
            effects:[],
        });

        //Profesiones

        new G.Unit({
            name: 'beekeeper',
            desc: '@It is the men responsible for making [honeycomb]s for [honey] and multiplaying [bees].',
            icon: [0,2,'beekeper'],
            cost:{},
            use:{'land': 1, 'worker' : 1},
		    upkeep:{},
            gizmos: true,
            modes: {
                'off': G.MODE_OFF,
                'bees':{name:'Produce bees', icon:[], desc:'Create [bees] from more [bees].', use:{}},
                'honey':{name:'Produce honey', icon:[], desc:'Create [honey] from [honeycomb]s.', use:{}},
                'honeycomb':{name:'Produce honeycomb', icon:[], desc:'Take [honeycomb] from the [bees].', use:{}},
            },
            effects: [
                {type:'convert', from:{'bees':8}, into:{'bees':16}, every:10, mode:'bees'},
                {type:'convert', from:{'honeycomb':1}, into:{'honey':3}, every:5, mode:'honey'},
                {type:'convert', from:{'bees':10}, into:{'honeycomb':5}, every:20, mode:'honeycomb'},
            ],
            req: {'beekeeping': true},
            category: 'production'
        });

        /*
        new G.Unit({
		name:'gatherer',
		startWith:5,
		desc:'@forages for basic [food], [water] and [archaic building materials,Various interesting things]<>A vital part of an early tribe, [gatherer]s venture in the wilderness to gather food, wood, and other things of note.',
		icon:[0,2],
		cost:{},
		use:{'worker':1},
		//upkeep:{'food':0.2},
		//alternateUpkeep:{'food':'spoiled food'},
		effects:[
			{type:'gather',context:'gather',amount:2,max:4},//,multMax:{'leather pouches':1.1}//TODO
			//{type:'gather',context:'gather',what:{'water':1,'muddy water':1},amount:1,max:3,req:{'gathering focus':'water'}},
			{type:'gather',context:'gather',what:{'water':1,'muddy water':1},amount:1,max:3},
			{type:'gather',context:'gather',what:{'herb':0.5,'fruit':0.5},amount:1,max:1,req:{'plant lore':true}},
			{type:'addFree',what:{'worker':0.1},req:{'scavenging':true}},
			{type:'mult',value:1.2,req:{'harvest rituals':'on'}}
		],
		req:{'tribalism':true},
		category:'production',
		priority:10,
	});
    */

        new G.Unit({
            name: 'composting',
            desc: '@For turning [spoiled food] into [bugs].',
            icon: [],
            cost:{'basic building materials':150},
            use:{'land': 1},
		    upkeep:{},
            gizmos: true,
            modes: {
                'off': G.MODE_OFF,
                'bugs':{name:'Produce bugs', icon:[], desc:'use [spoiled food] to multiplie [bugs].', use:{}},
            },
            effects: [
                {type:'convert', from:{'spoiled food':20}, into:{'bugs':5}, every:30, mode:'bugs'},
            ],
            req: {'composting': true},
            category: 'production'
        });

         new G.Unit({
            name: 'mill',
            desc: '@A truly wonderful building used to produce [flour] from [cereal]s like wheat.',
            icon: [0,2,'agricultura'],
            cost:{'basic building materials':150, 'stone tools':10},
            use:{'land': 1},
		    upkeep:{},
            gizmos: true,
            modes: {
                'off': G.MODE_OFF,
                'flour':{name:'Produce flour', icon:[], desc:'Create [flour] from [cereal]s.', use:{}},
            },
            effects: [
                {type:'convert', from:{'cereal':10}, into:{'flour':5}, every:5, mode:'flour'},
            ],
            req: {'milling': true},
            category: 'production'
        });

        new G.Unit({
            name: 'farmland',
            desc: '@A [farmland] is build to plant various crops to produce a substainable stock of food, mainly [vegetable]s and [cereal]s.',
            icon: [3,0,'agricultura'],
            cost:{'archaic building materials':100, 'stone tools':1},
            use:{'worker':1, 'land': 1},
		    upkeep:{'water':0.35},
            gizmos: true,
            modes: {
                'off': G.MODE_OFF,
                'any':{name:'Any', icon: [3,0,'agricultura'], desc:'Farm using any random [seed] or [root] you have. You may not get optimal results.', use:{'knapped tools':1}},
                'vegetables':{name:'Farm vegetables', icon:[0,1,'agricultura'], desc:'Produce [vegetable]s using [root]s.', use:{'knapped tools':1}},
                'cereals':{name:'Farm cereals', icon:[14,4], desc:'Produce [cereal]s using [seed]s.', use:{'knapped tools':1}},
            },
            effects: [
                {type:'gather', what:{'herb':5}, chance:1/3, mode:'off'},
                
                //"Any" mode ressources
                {type:'gather', what:{'vegetable':3.5, 'cereal':3.5}, mode:'any'},
                {type:'gather', what:{'seed':1.75}, chance:1/2, mode:'any'},
                {type:'gather', what:{'root':1.75}, chance:1/2, mode:'any'},
                
                //"Cereals" mode ressources
                {type:'gather', what:{'cereal':15}, mode:'cereals'},
                {type:'gather', what:{'seed':2.5}, chance:1/2, mode:'cereals'},
                
                //"Vegetables" mode ressources
                {type:'gather', what:{'vegetable':15}, mode:'vegetables'},
                {type:'gather', what:{'root':2.5}, chance:1/2, mode:'vegetables'},
                
                {type:'mult', value:1.7, req:{'harvest rituals':'on'}},
                {type:'mult', value:1.7, req:{'compost':G.getRes('compost').amount >= 10}}
            ],
            req: {'agriculture': true},
            category: 'production',
        });

        /*
        new G.Unit({
		name:'gatherer',
		startWith:5,
		desc:'@forages for basic [food], [water] and [archaic building materials,Various interesting things]<>A vital part of an early tribe, [gatherer]s venture in the wilderness to gather food, wood, and other things of note.',
		icon:[0,2],
		cost:{},
		use:{'worker':1},
		//upkeep:{'food':0.2},
		//alternateUpkeep:{'food':'spoiled food'},
		effects:[
			{type:'gather',context:'gather',amount:2,max:4},//,multMax:{'leather pouches':1.1}//TODO
			//{type:'gather',context:'gather',what:{'water':1,'muddy water':1},amount:1,max:3,req:{'gathering focus':'water'}},
			{type:'gather',context:'gather',what:{'water':1,'muddy water':1},amount:1,max:3},
			{type:'gather',context:'gather',what:{'herb':0.5,'fruit':0.5},amount:1,max:1,req:{'plant lore':true}},
			{type:'addFree',what:{'worker':0.1},req:{'scavenging':true}},
			{type:'mult',value:1.2,req:{'harvest rituals':'on'}}
		],
		req:{'tribalism':true},
		category:'production',
		priority:10,
        */

        //"Directorios"

        G.getDict('grass').res['gather']['seed']=1.25; //Chance to gather seeds on grass
        G.getDict('grass').res['gather']['root']=1.5; //Chance to gather roots on grass
        G.getDict('grass').res['gather']['hot pepper']=3;
        G.getDict('grass').res['gather']['bees']=0.01;

        G.getDict('artisan').modes['hot sauce']={
            name:'Make hot sauce',
            desc:'Turn 3 [hot pepper]s and 3 [herb]s into 1 [hot sauce].',
            req:{'hot sauce preparing':true},
            use:{'knapped tools':1
            }};
        G.getDict('gatherer').effects.push({
            type:'gather',
            context:'gather',
            what:{'bees':0.05},
            amount:1,
            max:1,
            req:{'beekeeping':true}});

        G.getDict('grass').res['gather']['honeycomb']=0.1;
        G.getDict('artisan').modes['honeycomb']={
            name:'Make honeycomb',
            desc:'Use wild bees to gather honeycomb.',
            req:{'beekeeping':true},
            use:{'knapped tools':1
            }};
	    G.getDict('artisan').effects.push({
            type:'convert',
            from:{'bees':1},
            into:{'honeycomb':3},
            every:5,
            mode:'honeycomb'});

	    G.getDict('artisan').modes['hot sauce']={
            name:'Make hot sauce',
            desc:'Turn 3 [hot pepper]s and 3 [herb]s into 1 [hot sauce].',
            req:{'hot sauce preparing':true},
            use:{'knapped tools':1
            }};
	    G.getDict('artisan').effects.push({
            type:'convert',
            from:{'hot pepper':3,'herb':3},
            into:{'hot sauce':1},
            every:3,
            mode:'hot sauce'
        });

		G.getDict('firekeeper').modes['coal fire']={
			name:'Start fires from coal',
			icon:[12,8,13,7],
			desc:'Craft [fire pit]s from 5 [stick]s and 5 [coal]s.'
		};
		G.getDict('firekeeper').effects.push({
			type:'convert',
			from:{
				'stick':5,
				'coal':5
			},
			into:{
				'fire pit':1
			},
			every:5,
			mode:'coal fire'
		});

		G.getDict('firekeeper').modes['cremation']={
			name:'Cremation',
			icon:[8,3,13,7],
			desc:'Burn [corpse]s using [fire pit]s.',
		};
		G.getDict('firekeeper').effects.push({
			type:'convert',
			from:{
				'corpse':1,
				'fire pit': 1
			},
			into:{
				'bone':1
			},
			every:5,
			mode:'cremation'
		});

		G.getDict('artisan').modes['water filter']={
			name:'Filter water',
			icon:[7,6],
			desc:'Turn [muddy water] into [water] using [sand] and [coal] as filters.'
		};
		G.getDict('artisan').effects.push({
			type:'convert',
			from:{
				'muddy water':100,
				'sand':0.1,
				'coal':1
			},
			into:{
				'water':50
			},
			every:5,
			mode:'water filter'
		});

        G.getDict('artisan').modes['dough']= {
            name:'Make dough', 
            desc:'Turn 3 [flour] and 2 [water]s into 4 [dough].', 
            icon:[2,0,'agricultura'],
            req:{}, 
            use:{'knapped tools':1}
        };
        G.getDict('artisan').effects.push({
            type:'convert',
            from:{'flour':3, 'water':2}, 
            into:{'dough':4}, 
            every:3, 
            mode:'dough'
        });

        G.getDict('furnace').modes['bread']= {
            name:'Cook bread', 
            desc:'Turn 1 [dough] into a loaf of [bread].', 
            req:{}, 
            use:{'worker':1}
        };
        G.getDict('furnace').effects.push({
            type:'convert',
            from:{'dough':1}, 
            into:{'bread':1}, 
            every:3, 
            mode:'bread'
        });

        //Rasgos

	    new G.Trait({
		name:'hot sauce madness',
		desc:'@your people appreciate [hot sauce] twice as much and will be twice as happy from consuming it.',
		icon:[1,1,'spicySheet'],
		chance:20,
		req:{'hot sauce preparing':true},
		effects:[
			{type:'function',func:function(){G.getDict('hot sauce').turnToByContext['eat']['happiness']=0.2;}},//this is a custom function executed when we gain the trait
		],
	    });
        
        //GOODS (Recursos que encuentras por el mapa, creo)
        
        new G.Goods({
            name:'wild vegetables',
            desc:'[wild vegetables, Wild vegetables] are a good source of [root]s and of course, [vegetable]s;',
            icon:[],
            res:{
                'gather':{'root':5, 'vegetable':3},
            },
            affectedBy:['deforestation'],
            mult:10,
        });

        new G.Goods({
            name:'bees',
            desc:'[bees] are a good source of [honey] and [honeycomb];',
            icon:[],
            res:{
                'gather':{'bees':1, 'honey':3, 'honeycomb':2},
            },
            affectedBy:['deforestation'],
            mult:1,
        });

	}
});

