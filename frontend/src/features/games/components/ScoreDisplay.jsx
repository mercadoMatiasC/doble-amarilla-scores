import { useState, useEffect, useRef } from 'react';
import { SoccerBall } from '../../../components/svgs/SoccerBall';
import { PageAnimWrapper } from '../../../components/PageAnimWrapper';

export function ScoreDisplay({ score, isLive }) {
  const [showGoal, setShowGoal] = useState(false);
  const prevScoreRef = useRef(score);

  useEffect(() => {
    if (isLive && score > prevScoreRef.current) {
      setShowGoal(true);
      
      const timer = setTimeout(() => setShowGoal(false), 2500);
      return () => clearTimeout(timer);
    }

    // 3. Always update the Ref to the current score so the next change 
    // is measured correctly, but this doesn't trigger a re-render!
    prevScoreRef.current = score;
  }, [score, isLive]);

  return (
    <>
        <PageAnimWrapper key={showGoal}>
            {showGoal ? (
                <div className=''>
                    <div className="animate-spin">
                        <SoccerBall width={20} />
                    </div>
                </div>
            ):(
                <p className="text-xl">{score}</p>
            )}
        </PageAnimWrapper>
    </>
  );
}