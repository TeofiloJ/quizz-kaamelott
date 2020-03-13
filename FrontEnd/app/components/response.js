import Component from '@ember/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ResponseComponent extends Component {

    @tracked isValid

    didReceiveAttrs(){
        this._super(...arguments);
    }


}