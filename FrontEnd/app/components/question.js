import Component from '@ember/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class QuestionComponent extends Component {
  
  @tracked renderedPerso

  @tracked errorMessage = ""

  @tracked answerStyle = ""

  @tracked disable = false

  @tracked question

  persoInconnu = "Personnage Inconnu"

  didReceiveAttrs(){
    this._super(...arguments);
    console.log("didReceiveAttrs")

    this.question = this.data
    // console.log(this.question);
    
    let min = 0
    let max = this.perso.length-1
    let ret = []
    let randIndexUsed = []

    if (this.question.character == null || this.question.character == undefined || this.question.character == "") {
      ret.push(this.persoInconnu)
      this.question.character = this.persoInconnu
      // alert("perso inconnu")
    }else{
      ret.push(this.question.character)
    }

    randIndexUsed.push(this.perso.indexOf(this.question.character))
    for (let index = 0; index < 3; index++) {
      let randIndex = -1
      do{
        randIndex = Math.floor(Math.random() * (max - min + 1)) + min
      } while (randIndexUsed.includes(randIndex))
      

      randIndexUsed.push(randIndex)
      ret.push(this.perso[randIndex])
    }

    
    // console.log(ret)

    for(let i = ret.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * i)
      const temp = ret[i]
      ret[i] = ret[j]
      ret[j] = temp
    }
    // console.log(ret)
    this.renderedPerso = ret
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
      // this.disable = true

      let result
        if (this.question.character == params.toElement.innerText) {
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
        if (!this.checkIfQuizzFinished()) {
          this.updateMySelf()
        }
        
        
        

    }

    updateMySelf(){

      console.log("updateMySelf : " + this.updateQuestionComponent())
    }


}
