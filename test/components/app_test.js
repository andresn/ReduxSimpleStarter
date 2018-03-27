import { renderComponent, expect } from '../test_helper';
import App from '../../src/components/app';

// TODO: snapshot testing!!!

// Use describe to group together similar tests
describe(
    'Test App',
    () => {
        let component;
        beforeEach(
            () => {
                component = renderComponent(App);
            }
        );
        it(
            'shows AddComment component',
            () => {
                expect(component.find('.add-comment')).to.exist;
            }
        );
        it(
            'shows ViewComments component',
            () => {
                expect(component.find('.view-comment')).to.exist;
            }
        );
    }
);
