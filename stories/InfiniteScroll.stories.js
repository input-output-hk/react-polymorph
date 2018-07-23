// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';

// components
import { InfiniteScroll } from '../source/components/InfiniteScroll';
import { Flex } from '../source/components/layout/Flex';
import { Grid } from '../source/components/layout/Grid';
import { Gutter } from '../source/components/layout/Gutter';

// styles
import styles from './InfiniteScroll.stories.scss';

const { full, scrollItem } = styles;

storiesOf('InfiniteScroll', module)
  // ====== InfiniteScroll Stories ======

  .add('simple', () => (
    <div className={full}>
      <InfiniteScroll
        fetchData={setState => {
          fetch('https://randomuser.me/api/?results=10')
          .then(res => res.json())
          .then(({ results: data }) => setState({ data }))
          .catch(error => console.log(error))
        }}
        renderItems={({
          data,
          error,
          isLoading,
          hasMoreData
        }) => data.map((user, index) => (
          <Flex.Item key={index} className={scrollItem}>
            {user.email}
          </Flex.Item>
        ))}
      />
    </div>
  ));
