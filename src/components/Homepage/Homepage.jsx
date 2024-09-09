import homepage_vid from '/homepage_vid.mp4';

export default function Homepage() {
  return (
    <div className="content">
      <section className="HomepageSection">
        <div className="Homepage">
          <h1>Antique Marketplace</h1>
          <p>A place to market your antiques, a market to place your antiques, antiques to market in place, in whichever combination you prefer!</p>
          <div className="home-vid-container">
            <video src={homepage_vid} muted={true} autoPlay={true} loop={true} />
          </div>
        </div>
      </section>
    </div>
  );
};