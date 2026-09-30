import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="flex items-center justify-between bg-white px-20 py-6">
      <div className="flex items-center gap-[42px]">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-[#17191E]">
            <img src="/icons/movie.svg" alt="UMCine" className="h-6 w-6" />
          </span>
          <span className="text-xl font-black tracking-[-0.7px] text-[#17191E]">
            UMCine
          </span>
        </div>
        <nav>
          <ul className="flex items-center gap-[30px] text-sm font-bold">
            <li>
              <Link to="/" className="text-[#17191E] underline">
                영화
              </Link>
            </li>
            <li>
              <Link to="/search" className="text-[#606774] hover:text-[#17191E]">
                검색
              </Link>
            </li>
            <li className="text-[#606774]">내 정보</li>
          </ul>
        </nav>
      </div>
      <div className="flex items-center gap-2.5">
        <Link
          to="/search"
          aria-label="영화 검색"
          className="flex h-[42px] w-[42px] items-center justify-center rounded-lg border border-[#E3E6EB] bg-white"
        >
          <img src="/icons/search.svg" alt="" className="h-6 w-6 opacity-70" />
        </Link>
        <button className="h-[42px] rounded-lg border border-white bg-[#2563EB] px-4 text-sm font-extrabold text-white">
          로그인
        </button>
      </div>
    </header>
  );
}
