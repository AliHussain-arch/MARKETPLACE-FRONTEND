export default function PageNotFound() {
    return (
      <div className="page-not-found-container">
        <img className="sad-face-image" src="src/images/sad-face.png" alt="sad face" />
        <h1 className="error-code">404</h1>
        <h2 className="error-message">Page not found</h2>
        <p className="error-description">The page you are looking for doesn&apos;t exist or another error occurred.</p>
      </div>
    );
}
