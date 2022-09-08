import { LightningElement } from 'lwc';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import react from '@salesforce/resourceUrl/reactdev';
import reactDOM from '@salesforce/resourceUrl/reactDOMdev';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

export default class ReactJScmp extends LightningElement {

    isReactInited = false;
    isReactDomInited = false;

    renderedCallback() {
        let r = this.template.querySelector('[data-id="root"]');
        if (this.isReactInited && this.isReactDomInited) {
            return;
        }

        this.isReactInited = true;
        this.isReactDomInited = true;

        Promise.all([
            loadScript(this, react),
            loadScript(this, reactDOM)
        ])
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Success',
                    variant: 'success'
                })
            );
        })
        .then(() => {
            const rootElement = ReactDOM.createRoot(this.template.querySelector('[data-id="root"]'));
            rootElement.render(React.createElement("h1", { style: { color: "green" } }, "Welcome to ReactJS"));
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error loading React Libs',
                    message: error.message,
                    variant: 'error'
                })
            );
        });

    }
}