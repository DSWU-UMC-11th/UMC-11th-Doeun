export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#E3E6EB] px-8 py-4 text-center text-xs text-[#606774]">
      <span className="inline-flex items-center gap-1.5">
        <img src="/images/logos/tmdb-logo.svg" alt="TMDB" className="h-3" />
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </span>
    </footer>
  );
}
