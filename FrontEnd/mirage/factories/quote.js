import { Factory } from 'ember-cli-mirage';

export default Factory.extend({

    id(i){
        return `${i}`;
    },

    character: "Angharad",
    text:"Si Monsieur et Madame préfèrent s'envoyer des fions dans l'intimité, je peux aussi me retirer.",
    actor: "Vanessa Guedj",
    author: "Alexandre Astier",
    season(i){
        return `Livre ${i}`
    },
    episode(i){
        return `${i} : La chambre de la Reine`
    }


});

