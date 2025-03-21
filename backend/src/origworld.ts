import {RatioType} from './graphql';

export const origworld = {
    name: 'A Nice World 2',
    logo: 'icones/surgeon_navbar.png',
    money: 0,
    score: 0,
    totalangels: 0,
    activeangels: 0,
    angelbonus: 2,
    lastupdate: 0,
    products: [
        {
            id: 1,
            name: 'Kidneys',
            logo: 'icones/kidney/kidneys.gif',
            cout: 4,
            croissance: 1.07,
            revenu: 1,
            vitesse: 600,
            quantite: 1,
            timeleft: 0,
            managerUnlocked: false,
            paliers: [
                {
                    name: 'Black Market Surge',
                    logo: 'icones/kidney/kidney_unlock.png',
                    seuil: 25,
                    idcible: 1,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false
                },
                {
                    name: 'Double Filtration Power',
                    logo: 'icones/kidney/kidney_unlock.png',
                    seuil: 50,
                    idcible: 1,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false
                },
                {
                    name: "Kidney Kings",
                    logo: 'icones/kidney/kidney_unlock.png',
                    seuil: 100,
                    idcible: 1,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false
                },
                {
                    name: "Renal Runners",
                    logo: 'icones/kidney/kidney_unlock.png',
                    seuil: 200,
                    idcible: 1,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false
                },
                {
                    name: 'Golden Kidney Standard',
                    logo: 'icones/kidney/kidney_unlock.png',
                    seuil: 300,
                    idcible: 1,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false
                },
                {
                    name: 'Pee-Profit Pipeline',
                    logo: 'icones/kidney/kidney_unlock.png',
                    seuil: 400,
                    idcible: 1,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false
                },
            ]
        },
        {
            id: 2,
            name: 'Livers',
            logo: 'icones/liver/liver.gif',
            cout: 60,
            croissance: 1.15,
            revenu: 60,
            vitesse: 3000,
            quantite: 0,
            timeleft: 0,
            managerUnlocked: false,
            paliers: [
                {
                    name: 'Premium Detox Plan',
                    logo: 'icones/liver/liver_unlock.png',
                    seuil: 25,
                    idcible: 2,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false
                },
                {
                    name: 'Hepatic Hustle',
                    logo: 'icones/liver/liver_unlock.png',
                    seuil: 50,
                    idcible: 2,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false
                },
                {
                    name: "Booze Recycler",
                    logo: 'icones/liver/liver_unlock.png',
                    seuil: 100,
                    idcible: 2,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false
                },
                {
                    name: "Infinite Regeneration",
                    logo: 'icones/liver/liver_unlock.png',
                    seuil: 200,
                    idcible: 2,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false
                },
                {
                    name: 'Liver Liquidity',
                    logo: 'icones/liver/liver_unlock.png',
                    seuil: 300,
                    idcible: 2,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false
                },
                {
                    name: 'Fatty Liver Fortune',
                    logo: 'icones/liver/liver_unlock.png',
                    seuil: 400,
                    idcible: 2,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false
                },
            ]
        },
        {
            id: 3,
            name: 'Lungs',
            logo: 'icones/lung/lung.gif',
            cout: 720,
            croissance: 1.14,
            revenu: 540,
            vitesse: 6000,
            quantite: 0,
            timeleft: 0,
            managerUnlocked: false,
            paliers: [
                {
                    name: 'Lung Expansion Project',
                    logo: 'icones/lung/lung_unlock.png',
                    seuil: 25,
                    idcible: 3,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false
                },
                {
                    name: 'Carbon Cash-Out',
                    logo: 'icones/lung/lung_unlock.png',
                    seuil: 50,
                    idcible: 3,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false
                },
                {
                    name: "Double Oxygen Yield",
                    logo: 'icones/lung/lung_unlock.png',
                    seuil: 100,
                    idcible: 3,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false
                },
                {
                    name: "Smoke-Proof Supply Chain",
                    logo: 'icones/lung/lung_unlock.png',
                    seuil: 200,
                    idcible: 3,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false
                },
                {
                    name: 'Breath of Profits',
                    logo: 'icones/lung/lung_unlock.png',
                    seuil: 300,
                    idcible: 3,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false
                },
                {
                    name: 'Windpipe Winners',
                    logo: 'icones/lung/lung_unlock.png',
                    seuil: 400,
                    idcible: 3,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false
                },
            ]
        },
        {
            id: 4,
            name: 'Hearts',
            logo: 'icones/heart/heart.gif',
            cout: 8640,
            croissance: 1.13,
            revenu: 4320,
            vitesse: 12000,
            quantite: 0,
            timeleft: 0,
            managerUnlocked: false,
            paliers: [
                {
                    name: 'Cardio Capital',
                    logo: 'icones/heart/heart_unlock.png',
                    seuil: 25,
                    idcible: 4,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false
                },
                {
                    name: 'Beating the Competition',
                    logo: 'icones/heart/heart_unlock.png',
                    seuil: 50,
                    idcible: 4,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false
                },
                {
                    name: "Pumping Profits",
                    logo: 'icones/heart/heart_unlock.png',
                    seuil: 100,
                    idcible: 4,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false
                },
                {
                    name: "Heart Throb Hustle",
                    logo: 'icones/heart/heart_unlock.png',
                    seuil: 200,
                    idcible: 4,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false
                },
                {
                    name: 'Artery Empire',
                    logo: 'icones/heart/heart_unlock.png',
                    seuil: 300,
                    idcible: 4,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false
                },
                {
                    name: 'Valves of Gold',
                    logo: 'icones/heart/heart_unlock.png',
                    seuil: 400,
                    idcible: 2,
                    ratio: 4,
                    typeratio: RatioType.vitesse,
                    unlocked: false
                },
            ]
        },
        {
            id: 5,
            name: 'Eye balls',
            logo: 'icones/eyeball/eyeball.gif',
            cout: 103680,
            croissance: 1.12,
            revenu: 51840,
            vitesse: 24000,
            quantite: 0,
            timeleft: 0,
            managerUnlocked: false,
            paliers: [
                {
                    name: 'Visionary Ventures',
                    logo: 'icones/eyeball/eyeball_unlock.png',
                    seuil: 25,
                    idcible: 5,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false
                },
                {
                    name: 'Eyeball Market Expansion',
                    logo: 'icones/eyeball/eyeball_unlock.png',
                    seuil: 50,
                    idcible: 5,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false
                },
                {
                    name: "Retina Riches",
                    logo: 'icones/eyeball/eyeball_unlock.png',
                    seuil: 100,
                    idcible: 5,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false
                },
                {
                    name: "The All-Seeing Business",
                    logo: 'icones/eyeball/eyeball_unlock.png',
                    seuil: 200,
                    idcible: 5,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false
                },
                {
                    name: 'Optic Boom',
                    logo: 'icones/eyeball/eyeball_unlock.png',
                    seuil: 300,
                    idcible: 5,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false
                },
                {
                    name: 'Pupil Profiteers',
                    logo: 'icones/eyeball/eyeball_unlock.png',
                    seuil: 400,
                    idcible: 5,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false
                }

            ]
        },
        {
            id: 6,
            name: 'Brains',
            logo: 'icones/brain/brain.gif',
            cout: 1244160,
            croissance: 1.11,
            revenu: 622080,
            vitesse: 96000,
            quantite: 0,
            timeleft: 0,
            managerUnlocked: false,
            paliers: [
                {
                    name: 'Neural Network',
                    logo: 'icones/brain/brain_unlock.png',
                    seuil: 25,
                    idcible: 6,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false
                },
                {
                    name: 'Genius Harvest',
                    logo: 'icones/brain/brain_unlock.png',
                    seuil: 50,
                    idcible: 6,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false
                },
                {
                    name: "IQ Investment",
                    logo: 'icones/brain/brain_unlock.png',
                    seuil: 100,
                    idcible: 6,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false
                },
                {
                    name: "Think Tank Tycoons",
                    logo: 'icones/brain/brain_unlock.png',
                    seuil: 200,
                    idcible: 6,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false
                },
                {
                    name: 'Mind Over Money',
                    logo: 'icones/brain/brain_unlock.png',
                    seuil: 300,
                    idcible: 6,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false
                },
                {
                    name: 'Gray Matter Goldmine',
                    logo: 'icones/brain/brain_unlock.png',
                    seuil: 400,
                    idcible: 6,
                    ratio: 2,
                    typeratio: RatioType.vitesse,
                    unlocked: false
                }

            ]
        },
    ],
    allunlocks: [
        {
            name: 'Organs Work Better Together',
            logo: 'icones/all_unlock.png',
            seuil: 30,
            idcible: 0,
            ratio: 3,
            typeratio: RatioType.gain,
            unlocked: false
        },
        {
            name: 'The Human Body is a Goldmine',
            logo: 'icones/all_unlock.png',
            seuil: 90,
            idcible: 0,
            ratio: 3,
            typeratio: RatioType.gain,
            unlocked: false
        },
        {
            name: 'Harvesting Synergy',
            logo: 'icones/all_unlock.png',
            seuil: 270,
            idcible: 0,
            ratio: 3,
            typeratio: RatioType.gain,
            unlocked: false
        },
    ],
    upgrades: [
        {
            name: 'Black-Market Dialysis',
            logo: 'icones/all_unlock.png',
            seuil: 250000,
            idcible: 1,
            ratio: 3,
            typeratio: RatioType.gain,
            unlocked: false
        },
        {
            name: 'The Hangover Cure Empire',
            logo: 'icones/all_unlock.png',
            seuil: 500000,
            idcible: 2,
            ratio: 3,
            typeratio: RatioType.gain,
            unlocked: false
        },
        {
            name: 'Extra Breath, Extra Cash',
            logo: 'icones/all_unlock.png',
            seuil: 1000000,
            idcible: 3,
            ratio: 3,
            typeratio: RatioType.gain,
            unlocked: false
        },
        {
            name: 'More Beats Per Minute',
            logo: 'icones/all_unlock.png',
            seuil: 5000000,
            idcible: 4,
            ratio: 3,
            typeratio: RatioType.gain,
            unlocked: false
        },
        {
            name: 'Retina Resale Boom',
            logo: 'icones/all_unlock.png',
            seuil: 10000000,
            idcible: 5,
            ratio: 3,
            typeratio: RatioType.gain,
            unlocked: false
        },
        {
            name: 'Neuron Negotiations',
            logo: 'icones/all_unlock.png',
            seuil: 25000000,
            idcible: 6,
            ratio: 3,
            typeratio: RatioType.gain,
            unlocked: false
        },
        {
            name: 'The Ultimate Chop Shop',
            logo: 'icones/all_unlock.png',
            seuil: 500000000,
            idcible: 0,
            ratio: 3,
            typeratio: RatioType.gain,
            unlocked: false
        },
        {
            name: 'Two is Good, Three is Better',
            logo: 'icones/all_unlock.png',
            seuil: 10000000000,
            idcible: 1,
            ratio: 3,
            typeratio: RatioType.gain,
            unlocked: false
        },
        {
            name: 'Regrow & Resell',
            logo: 'icones/all_unlock.png',
            seuil: 50000000000,
            idcible: 2,
            ratio: 3,
            typeratio: RatioType.gain,
            unlocked: false
        },
        {
            name: 'Asthma-Proof Airways',
            logo: 'icones/all_unlock.png',
            seuil: 250000000000,
            idcible: 3,
            ratio: 3,
            typeratio: RatioType.gain,
            unlocked: false
        },
        {
            name: 'Multi-Hearted Mogul',
            logo: 'icones/all_unlock.png',
            seuil: 1000000000000,
            idcible: 4,
            ratio: 3,
            typeratio: RatioType.gain,
            unlocked: false
        },
        {
            name: 'The Collector’s Edition',
            logo: 'icones/all_unlock.png',
            seuil: 20000000000000,
            idcible: 5,
            ratio: 3,
            typeratio: RatioType.gain,
            unlocked: false
        },
        {
            name: 'Einstein Extraction',
            logo: 'icones/all_unlock.png',
            seuil: 50000000000000,
            idcible: 6,
            ratio: 3,
            typeratio: RatioType.gain,
            unlocked: false
        },
        {
            name: 'Doctor’s Special Combo',
            logo: 'icones/all_unlock.png',
            seuil: 100000000000000,
            idcible: 0,
            ratio: 3,
            typeratio: RatioType.gain,
            unlocked: false
        },
    ],
    angelupgrades: [
        {
            name: 'Divine Donations',
            logo: 'icones/angel.png',
            seuil: 10000,
            idcible: 0,
            ratio: 3,
            typeratio: RatioType.gain,
            unlocked: false
        },
        {
            name: 'The Holy Extraction',
            logo: 'icones/angel.png',
            seuil: 100000,
            idcible: -1,
            ratio: 2,
            typeratio: RatioType.ange,
            unlocked: false
        },
        {
            name: 'Saintly Supply Chain',
            logo: 'icones/angel.png',
            seuil: 100000000,
            idcible: -1,
            ratio: 2,
            typeratio: RatioType.ange,
            unlocked: false
        },
        {
            name: 'Seraphic Scalpel',
            logo: 'icones/angel.png',
            seuil: 1000000000,
            idcible: 0,
            ratio: 5,
            typeratio: RatioType.ange,
            unlocked: false
        },
    ],
    managers: [
        {
            name: 'Dr. Slice McGreedy',
            logo: 'icones/managers/manager_1.png',
            seuil: 1000,
            idcible: 1,
            ratio: 0,
            typeratio: RatioType.gain,
            unlocked: false
        },
        {
            name: 'Dr. Bypass Betty',
            logo: 'icones/managers/manager_2.png',
            seuil: 15000,
            idcible: 2,
            ratio: 0,
            typeratio: RatioType.gain,
            unlocked: false
        },
        {
            name: 'Dr. FrankenFunds',
            logo: 'icones/managers/manager_3.png',
            seuil: 100000,
            idcible: 3,
            ratio: 0,
            typeratio: RatioType.gain,
            unlocked: false
        },
        {
            name: 'Dr. Igor Patchwork',
            logo: 'icones/managers/manager_4.png',
            seuil: 500000,
            idcible: 4,
            ratio: 0,
            typeratio: RatioType.gain,
            unlocked: false
        },
        {
            name: 'Chainsaw Charlie',
            logo: 'icones/managers/manager_5.png',
            seuil: 1200000,
            idcible: 5,
            ratio: 0,
            typeratio: RatioType.gain,
            unlocked: false
        },
        {
            name: 'The Midnight Butcher',
            logo: 'icones/managers/manager_6.png',
            seuil: 10000000,
            idcible: 6,
            ratio: 0,
            typeratio: RatioType.gain,
            unlocked: false
        },
    ]
};
