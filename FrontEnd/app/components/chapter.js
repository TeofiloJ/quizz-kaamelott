import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ChapterComponent extends Component {
    @tracked isSelected = false;

    @action
    onClickEvent() {
        if (this.isSelected) {
            this.isSelected = false;
        }else{
            this.isSelected = true;
        }
        // debugger;
        this.args.updateMultiple(this.args.id, this.isSelected)
    }
}