// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';

// components
import { ScrollBar } from '../source/components/ScrollBar';

// helpers
import { decorateWithSimpleTheme } from './helpers/theming';

// styles
import styles from './ScrollBar.stories.scss';

storiesOf('ScrollBar', module)

  .addDecorator(decorateWithSimpleTheme)

  // ====== Stories ======

  .add('plain', () => (
    <ScrollBar style={{ height: '100px' }}>
      <div className={styles.padding}>
        <p>
          Cras elementum lacus eu dictum vestibulum. Donec eros dui, cursus ut finibus vel, interdum et sem. Sed sed diam dui. Suspendisse at eros non felis faucibus consectetur. Nullam non eleifend sapien. In porttitor est in arcu auctor interdum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque eu sem euismod, dignissim orci sit amet, facilisis leo. Nulla at tempus sapien. Nunc pharetra eros at ex aliquam rutrum. Nunc quis iaculis nulla. Ut semper nisi in felis aliquam, vitae tincidunt erat tristique. Sed lobortis vulputate enim nec feugiat. Suspendisse maximus purus vitae elementum ullamcorper. Praesent fermentum, odio interdum gravida tempus, orci diam volutpat nisl, in sodales erat felis eget lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean nec egestas lorem. In hac habitasse platea dictumst. Donec laoreet felis id enim tempus, id finibus mauris faucibus. Maecenas sed risus sed quam finibus sollicitudin. Donec dictum id elit in faucibus. Sed pretium cursus tempus. Duis pulvinar, felis sit amet aliquam placerat, dolor risus finibus erat, et convallis velit lacus eget lorem. Etiam bibendum ex ac finibus tincidunt. Fusce elementum semper nunc sodales egestas. Maecenas eu facilisis metus. Suspendisse at eleifend lorem, feugiat tempor ligula. Vivamus dictum metus tortor, et dictum nibh sodales eu. Nulla ut iaculis tellus, eu convallis nulla. Proin mollis dui nec quam accumsan, sed pharetra velit elementum. Suspendisse vitae purus sollicitudin, posuere justo in, mattis nisl. Cras elementum lacus eu dictum vestibulum. Donec eros dui, cursus ut finibus vel, interdum et sem. Sed sed diam dui. Suspendisse at eros non felis faucibus consectetur. Nullam non eleifend sapien
        </p>
      </div>
    </ScrollBar>
  ));
