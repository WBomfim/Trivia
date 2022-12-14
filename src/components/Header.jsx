import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { saveImage } from '../redux/actions';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      gravatar: '',
    };
  }

  componentDidMount = () => {
    const { player, dispatch } = this.props;
    const { gravatarEmail } = player;
    const cryptoEmail = md5(gravatarEmail).toString();
    dispatch(saveImage(`https://www.gravatar.com/avatar/${cryptoEmail}`));
    this.setState({
      gravatar: cryptoEmail,
    });
  }

  render() {
    const { gravatar } = this.state;
    const { player } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${gravatar}` }
          alt="Avatar do Gravatar"
        />
        <p data-testid="header-player-name">{ player.name }</p>
        <div>
          <span>
            Score:
            {' '}
          </span>
          <span data-testid="header-score">{ player.score }</span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

Header.propTypes = {
  player: PropTypes.objectOf(PropTypes.shape),
}.isRequired;

export default connect(mapStateToProps)(Header);
