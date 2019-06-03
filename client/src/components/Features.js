import React from 'react';

function Features() {
  return (
    <div className="uk-section" id="about">
      <div className="uk-container">
        <div className="uk-child-width-1-4@m" data-uk-grid data-uk-scrollspy="target: .uk-icon; cls: uk-animation-slide-top-small; delay: 100">
          <div>
            <span className="uk-icon uk-text-link" data-uk-icon="icon: bolt; ratio: 2" />
            <h4 className="uk-margin-small">Activities</h4>
            <p className="uk-margin-remove-top">
              <span>Simple </span>
              <strong>check-in</strong>
              <span> for class activities such as labs. Flag repeated attempts and section mismatches.</span>
            </p>
          </div>
          <div>
            <span className="uk-icon uk-text-link" data-uk-icon="icon: users; ratio: 2" />
            <h4 className="uk-margin-small">Queue</h4>
            <p className="uk-margin-remove-top">
              <span>Office hours can get congested. Descartes organizes student questions for </span>
              <strong>collaborative</strong>
              <span> learning.</span>
            </p>
          </div>
          <div>
            <span className="uk-icon uk-text-link" data-uk-icon="icon: comment; ratio: 2" />
            <h4 className="uk-margin-small">Polls</h4>
            <p className="uk-margin-remove-top">
              <strong>Engage</strong>
              <span> with students and take attendance with polls and quizzes, with location verification.</span>
            </p>
          </div>
          <div>
            <span className="uk-icon uk-text-link" data-uk-icon="icon: happy; ratio: 2" />
            <h4 className="uk-margin-small">Centralized</h4>
            <p className="uk-margin-remove-top">
              <span>Descartes securely stores grades in </span>
              <strong>one place</strong>
              <span>, with tools for students to get back on track.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
