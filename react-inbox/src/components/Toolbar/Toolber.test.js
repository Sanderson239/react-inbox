import React from 'react';
import { shallow } from 'enzyme';
import { Toolbar, mapStateToProps, mapDispatchToProps } from './Toolbar';

describe('(Component) Toolbar', () => {
  // it('renders without exploding', () => {
  //   const toolbar = shallow(
  //     <Toolbar
  //       numberOfMessages={1}
  //       numberOfReadMessages={1}
  //       numberOfSelectedMessages={0}
  //       bulkSelectButton={'fa fa-square-o'}
  //       path={'/'}
  //     />,
  //   );
  //   console.log(toolbar);
  //   expect(toolbar).to.have.length(1);
  // });

  it('renders without exploding', () => {
    shallow(<Toolbar />);
  });
});
