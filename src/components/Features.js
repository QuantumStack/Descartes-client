import React from 'react';
import FeatureItem from './FeatureItem';

const Features = () => (
  <div className="uk-section" id="about">
    <div className="uk-container">
      <div className="uk-child-width-1-2@s uk-child-width-1-4@m" data-uk-grid data-uk-scrollspy="target: .uk-icon; cls: uk-animation-slide-top-small; delay: 100">
        <FeatureItem icon="bolt" title="Activities">
          <span>Simple </span>
          <strong>check-in</strong>
          <span> for class activities such as labs. Flag repeated attempts and section mismatches.</span>
        </FeatureItem>
        <FeatureItem icon="users" title="Queue">
          <span>Office hours can get congested. Descartes organizes student questions for </span>
          <strong>collaborative</strong>
          <span> learning.</span>
        </FeatureItem>
        <FeatureItem icon="comment" title="Polls">
          <strong>Engage</strong>
          <span> with students and take attendance with polls and quizzes, with location verification.</span>
        </FeatureItem>
        <FeatureItem icon="happy" title="Centralized">
          <span>Descartes securely stores grades in </span>
          <strong>one place</strong>
          <span>, with tools for students to get back on track.</span>
        </FeatureItem>
      </div>
    </div>
  </div>
);

export default Features;
