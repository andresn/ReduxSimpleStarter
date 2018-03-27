import { renderComponent, expect } from '../test_helper';
import ViewComments from '../../src/components/view_comments';

describe(
    'Test ViewComments component',
    () => {
        let component;

        beforeEach(
            () => {
                const props = {
                    comments: [
                        'New Comment',
                        'Other Comment'
                    ]
                };
                component = renderComponent(ViewComments, null, props);
            }
        );
        it('shows an LI for each comment',
            () => {
                expect(component.find('li').length).to.equal(2);
            }
        );
        it('shows each comment that is provided',
            () => {
                expect(component).to.contain('New Comment');
                expect(component).to.contain('Other Comment');
            }
        );
    }
);
