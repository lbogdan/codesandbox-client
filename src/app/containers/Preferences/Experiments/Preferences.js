import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { preferencesSelector } from 'app/store/preferences/selectors';
import preferencesActionCreators from 'app/store/preferences/actions';

import {
  Container,
  PreferenceContainer,
  PaddedPreference,
  Description,
} from '../styles';

type Props = {
  preferencesActions: typeof preferencesActionCreators,
  preferences: Object,
};

const mapDispatchToProps = dispatch => ({
  preferencesActions: bindActionCreators(preferencesActionCreators, dispatch),
});
const mapStateToProps = state => ({
  preferences: preferencesSelector(state),
});
const Preferences = ({ preferences, preferencesActions }: Props) => {
  const bindValue = name => ({
    value: preferences[name],
    setValue: value =>
      preferencesActions.setPreference({
        [name]: value,
      }),
  });
  return (
    <Container>
      <PreferenceContainer>
        <PaddedPreference
          title="New dependency bundler"
          type="boolean"
          {...bindValue('newPackagerExperiment')}
        />
        <Description>
          Use the new, faster, client side dependency bundler. Reload the
          browser for changes to take effect.
        </Description>
      </PreferenceContainer>
      <PreferenceContainer>
        <PaddedPreference
          title="Sandbox console"
          type="boolean"
          {...bindValue('consoleExperiment')}
        />
        <Description>Brand new sandbox console</Description>
      </PreferenceContainer>
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);
