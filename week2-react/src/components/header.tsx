export default function Header() {
  return (
    <header className="site-header">
      <div className="logo">
        <img src="/icons/movie.svg" alt="UMCine" />
        <span>UMCine</span>
      </div>
      <nav className="main-nav">
        <ul>
          <li>영화</li>
          <li>검색</li>
          <li>새 영화</li>
        </ul>
      </nav>
      <div className="header-actions">
        <button className="icon-button" aria-label="검색">
          <img src="/icons/search.svg" alt="" />
        </button>
        <button className="login-button">로그인</button>
      </div>
    </header>
  );
}
