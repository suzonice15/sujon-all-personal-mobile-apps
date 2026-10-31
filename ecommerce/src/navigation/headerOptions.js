import React from 'react';
import AppHeader from '../components/AppHeader';

export const getHeaderOptions = (colors, { showMenu, navigation } = {}) => ({
  header: (props) => (
    <AppHeader
      navigation={props.navigation}
      colors={colors}
      showMenu={showMenu}
    />
  ),
});
