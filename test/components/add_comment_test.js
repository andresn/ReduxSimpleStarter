import { renderComponent, expect } from '../test_helper';
import AddComments from '../../src/components/add_comment';

/*
    Resources:
        - https://github.com/chaijs/chai-jquery
*/

describe(
    'Test AddComment component',
    () => {
        let component;
        beforeEach(
            () => {
                component = renderComponent(AddComments);
            }
        );
        it(
            'has class add-comment',
            () => {
                expect(component).to.have.class('add-comment');
            }
        );
        it(
            'has a textarea',
            () => {
                expect(component.find('textarea')).to.exist;
            }
        );
        it(
            'has a submit button',
            () => {
                expect(component.find('button')).to.exist;
            }
        );

        describe(
            'Test entering some text',
            () => {
                beforeEach(
                    () => {
                        component.find('textarea').simulate('change', 'This test rocks!');
                    }
                );
                it(
                    'has entered text',
                    () => {
                        expect(component.find('textarea')).to.have.value('This test rocks!');
                    }
                );
                it(
                    'text is cleared out after click on submit',
                    () => {
                        component.find('button').simulate('submit');
                        expect(component.find('textarea')).to.have.value('');
                    }
                );
            }
        );
    }
);
