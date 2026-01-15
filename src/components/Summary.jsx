import { useState, useEffect } from 'react';
import './Summary.css';

const Summary = ({ cats, onRestart }) => {
  const [showAnimation, setShowAnimation] = useState(false);

  // Ensure likedCats is derived from the latest state of cats
  const likedCats = cats.filter((cat) => cat.liked);
  const totalCats = cats.length;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const getLikePercentage = () => {
    return totalCats > 0 ? Math.round((likedCats.length / totalCats) * 100) : 0;
  };

  const getMessage = () => {
    const percentage = getLikePercentage();
    if (percentage === 0) return '😿 No cats caught your heart... yet!';
    if (percentage < 30) return "😼 You're quite selective with your feline friends!";
    if (percentage < 60) return '😸 You have a good eye for adorable cats!';
    if (percentage < 80) return "😻 You're definitely a cat lover!";
    if (percentage < 100) return '🐱 Almost every kitty stole your heart!';
    return '😍 You love ALL the cats! Ultimate cat person!';
  };

  return (
    <div className={`summary ${showAnimation ? 'show' : ''}`}>
      <div className="summary-header">
        <h1>Your Cat Preferences</h1>
        <div className="summary-stats">
          <div className="stat-circle">
            <div className="stat-number">{likedCats.length}</div>
            <div className="stat-label">Cats Liked</div>
          </div>
          <div className="stat-divider">of</div>
          <div className="stat-circle">
            <div className="stat-number">{totalCats}</div>
            <div className="stat-label">Total Cats</div>
          </div>
        </div>

        <div className="percentage">
          <span className="percentage-number">{getLikePercentage()}%</span>
          <span className="percentage-label">Match Rate</span>
        </div>

        <p className="message">{getMessage()}</p>
      </div>

      {likedCats.length > 0 && (
        <div className="liked-cats-section">
          <h2>💕 Your Favorite Kitties</h2>
          <div className="liked-cats-grid">
            {likedCats.map((cat, index) => (
              <div
                key={cat.id}
                className="liked-cat"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <img
                  src={cat.url}
                  alt={`Liked cat ${index + 1}`}
                  loading="lazy"
                />
                <div className="heart-overlay">❤️</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="summary-actions">
        <button className="restart-btn" onClick={onRestart}>
          <span>Find More Cats</span>
        </button>

        <button
          className="share-btn"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'Paws & Preferences',
                text: `I liked ${likedCats.length} out of ${totalCats} cats! ${getLikePercentage()}% match rate 🐱`,
                url: window.location.href,
              });
            } else {
              // Fallback for browsers without Web Share API
              const text = `I liked ${likedCats.length} out of ${totalCats} cats! ${getLikePercentage()}% match rate 🐱`;
              navigator.clipboard.writeText(`${text} ${window.location.href}`);
              alert('Results copied to clipboard!');
            }
          }}
        >
          <span>Share Results</span>
        </button>
      </div>

      <footer className="app-footer">
        <p>
          Made with ❤️ and lots of cat photos from{' '}
          <a
            href="https://cataas.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cataas
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Summary;