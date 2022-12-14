import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { rankingStorage, getRanking } from '../helpers/rankingStorage';
import triviaImg from '../imagens/trivia.png';
import Header from '../components/Header';
import './style/Feedback.css';

class Feedback extends Component {
  componentDidMount() {
    this.onSaveRanking();
  }

  onSaveRanking = () => {
    const { player } = this.props;
    const ranking = getRanking();
    const user = {
      id: ranking.length,
      name: player.name,
      score: player.score,
      image: player.gravatarImage,
    };
    rankingStorage(user);
  }

  render() {
    const { player, history } = this.props;
    const NUMBER_ASSERTIONS = 3;
    return (
      <>
        <div className="trivia-container">
          <img className="trivia-img" src={ triviaImg } alt="trivia" />
        </div>
        <Header />
        <main>
          <section className="feedback-container" data-testid="feedback-text">
            <h2> Feedback </h2>
            {
              player.assertions < NUMBER_ASSERTIONS ? 'Could be better...' : 'Well Done!'
            }
            <div>
              Your final score:
              <span data-testid="feedback-total-score">{player.score}</span>
            </div>
            <div>
              Number of correct questions:
              <span data-testid="feedback-total-question">{player.assertions}</span>
            </div>
          </section>
          <div className="button_feedback">
            <button
              type="button"
              data-testid="btn-play-again"
              onClick={ () => history.push('/') }
            >
              Play again
            </button>
            <button
              type="button"
              data-testid="btn-ranking"
              onClick={ () => history.push('/ranking') }
            >
              Ranking
            </button>
          </div>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

Feedback.propTypes = {
  history: PropTypes.objectOf(PropTypes.shape),
  player: PropTypes.objectOf(PropTypes.shape),
}.isRequired;

export default connect(mapStateToProps)(Feedback);
