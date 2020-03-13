import Component from '@ember/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class QuestionComponent extends Component {
  
  @tracked renderedPerso

  @tracked errorMessage = ""

  @tracked answerStyle = ""

  @tracked disable = false

  persoInconnu = "Personnage Inconnu"

  didReceiveAttrs(){
    this._super(...arguments);
    let min = 0
    let max = this.perso.length-1
    let ret = []
    let randIndexUsed = []

    if (this.data.character == null || this.data.character == undefined || this.data.character == "") {
      ret.push(this.persoInconnu)
      this.data.character = this.persoInconnu
      // alert("perso inconnu")
    }else{
      ret.push(this.data.character)
    }

    randIndexUsed.push(this.perso.indexOf(this.data.character))
    for (let index = 0; index < 3; index++) {
      let randIndex = -1
      do{
        randIndex = Math.floor(Math.random() * (max - min + 1)) + min
      } while (randIndexUsed.includes(randIndex))
      

      randIndexUsed.push(randIndex)
      ret.push(this.perso[randIndex])
    }

    
    console.log(ret)

    for(let i = ret.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * i)
      const temp = ret[i]
      ret[i] = ret[j]
      ret[j] = temp
    }
    console.log(ret)
    this.renderedPerso = ret
    // return ret
  }
  
  @tracked perso = [
    "Angharad",
    "Anna",
    "Appius Manilius",
    "Arthur",
    "Attila",
    "Belt",
    "Père Blaise",
    "Bohort",
    "Breccan",
    "Le Roi Burgonde",
    "Caius Camillus",
    "Calogrenant",
    "Capito",
    "César",
    "Cryda de Tintagel",
    "Dagonet",
    "La Dame du Lac",
    "Demetra",
    "Drusilla",
    "Le Duc d'Aquitaine",
    "Edern",
    "Elias de Kelliwic'h",
    "Galessin",
    "Gauvain",
    "Goustan",
    "Grüdü",
    "Guenièvre",
    "Guethenoc",
    "Hervé de Rinel",
    "L'interprète burgonde",
    "Le Seigneur Jacca",
    "Les Jumelles du pêcheur",
    "Le Jurisconsulte",
    "Kadoc",
    "Karadoc",
    "Lancelot",
    "Léodagan",
    "Loth",
    "Le Maître d'Armes",
    "Méléagant",
    "Manius Macrinus Firmus",
    "Merlin",
    "Mevanwi",
    "Perceval",
    "Roparzh",
    "Lucius Sillius Sallustius",
    "Séfriane d'Aquitaine",
    "Séli",
    "Spurius Cordius Frontinius",
    "Le Tavernier",
    "Urgan",
    "Vérinus",
    "Venec",
    "Ygerne",
    "Yvain",
    this.persoInconnu
    ]

    @action
    validatePerso(params){
      //disable all button
      this.disable = true

      let result
        if (this.data.character == params.toElement.innerText) {
          result = 1
          this.errorMessage = "Vraie"
          this.answerStyle = "color: green;"
        }else{
          result = 0
          this.errorMessage = "Faux"
          this.answerStyle = ""
        }

        //call parent to give him result
        this.updateScore(result)
        
        this.checkIfQuizzFinished()
    }


}
