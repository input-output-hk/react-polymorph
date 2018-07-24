// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';

// components
import { InfiniteScroll } from '../source/components/InfiniteScroll';
import { Flex } from '../source/components/layout/Flex';
import { Header } from '../source/components/Header';
import { HeaderSkin } from '../source/skins/simple/HeaderSkin';
import { Grid } from '../source/components/layout/Grid';
import { Gutter } from '../source/components/layout/Gutter';

// styles
import styles from './InfiniteScroll.stories.scss';

const { full, scrollItem } = styles;

storiesOf('InfiniteScroll', module)
  // ====== InfiniteScroll Stories ======
  .add('simple', () => (
    <Flex center className={full}>
      <InfiniteScroll
        fetchData={setState => {
          fetch('https://randomuser.me/api/?results=12')
          .then(res => res.json())
          .then(({ results: nextUsers }) => setState({ isLoading: true }, () =>
            setState(prevState => ({
              error: false,
              isLoading: false,
              data: [...prevState.data, ...nextUsers]
            }))
          ))
          .catch(error => setState({ error }));
        }}
        renderItems={({
          data,
          error,
          hasMoreData,
          isLoading
        }) => (
          <div>
            {data.map((user, index) => {
              return (
                <Flex.Item key={index} className={scrollItem}>
                  <div style={{ marginBottom: "5px" }}>
                    <Header bold h2 left skin={HeaderSkin}>
                      {user.name.first} {user.name.last}
                    </Header>
                    <Header h3 left skin={HeaderSkin}>
                      {user.email}
                    </Header>
                  </div>
                  <img
                    alt={user.name.first}
                    src={user.picture.medium}
                    style={{
                      borderRadius: '50%',
                      height: 72,
                      marginRight: 20,
                      width: 72,
                    }}
                  />
                </Flex.Item>
              );
            })}
            {!hasMoreData && <div>End of Users</div>}
            {isLoading && <div>Loading..</div>}
            {error && <div>Error</div>}
          </div>
        )}
      />
    </Flex>
  ));
