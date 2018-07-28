// @flow
import React from 'react';

// storybook
import { storiesOf } from '@storybook/react';

// components
import { InfiniteScroll } from '../source/components/InfiniteScroll';
import { Header } from '../source/components/Header';
import { LoadingSpinner } from '../source/components/LoadingSpinner';
import { Flex } from '../source/components/layout/Flex';

// skins
import { InfiniteScrollSkin } from '../source/skins/simple/InfiniteScrollSkin';
import { HeaderSkin } from '../source/skins/simple/HeaderSkin';
import { LoadingSpinnerSkin } from '../source/skins/simple/LoadingSpinnerSkin';

// styles && theme overrides
import styles from './InfiniteScroll.stories.scss';
import themeOverrides from './theme-overrides/customInfiniteScroll.scss';
import { decorateWithSimpleTheme } from './helpers/theming';

// helper classes
const { full, itemsRoot, spinner } = styles;

storiesOf('InfiniteScroll', module)

  .addDecorator(decorateWithSimpleTheme)

  // ====== InfiniteScroll Stories ======

  .add('simple', () => (
    <Flex center className={full}>
      <InfiniteScroll
        skin={InfiniteScrollSkin}
        themeOverrides={themeOverrides}
        fetchData={setState => {
          setState({ isLoading: true }, async () => {
            try {
              const res = await fetch('https://randomuser.me/api/?results=12');
              const { results: nextUsers } = await res.json();

              setState(({ data: prevUsers }) => ({
                error: false,
                isLoading: false,
                data: [...prevUsers, ...nextUsers]
              }));
            } catch (error) {
              setState({ error, isLoading: false });
            }
          });
        }}
        renderItems={({
          data,
          error,
          hasMoreData,
          isLoading,
          theme
        }) => (
          <div className={itemsRoot}>
            {data.map((user, index) => (
              <Flex.Item key={index} theme={theme}>
                <div style={{ marginBottom: '5px' }}>
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
                />
              </Flex.Item>
            ))}
            {!hasMoreData && <div>End of Users</div>}
            {isLoading && (
              <Flex.Item className={spinner}>
                <LoadingSpinner big skin={LoadingSpinnerSkin} />
              </Flex.Item>
            )}
            {error && <div>Error</div>}
          </div>
        )}
      />
    </Flex>
  ));
