import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LevelMenuRoute extends Controller {
    selected=[];

    @tracked errorMessage="";

    @action 
    updateMultiple(id, is_selected){
        if (is_selected) {
            this.selected.push(id)
        } else {
            for (let index = 0; index < this.selected.length; index++) {
                if(this.selected[index] == id) {
                    this.selected.splice(index,1)
                }
            }
        }
        this.errorMessage="";
    }

    @action
    validateForm(){
        if (this.selected.length != 0) {
            this.transitionToRoute('quizz', { queryParams: { seasons: this.selected }})
            this.selected = [];
        }else{
            this.errorMessage = "At least one Seasons need to be selected !";
        }
    }

}
