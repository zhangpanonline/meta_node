
'use client'

import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux'
import { RootState, AppDispatch } from './store'
import { setTheme } from './store/themeSlice'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import UserInfo from './components/UserInfo'

// const useAppSelector = useSelector.withTypes<RootState>()
// const useAppDispatch = useDispatch.withTypes<AppDispatch>()
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
const useAppDispatch: () => AppDispatch = useDispatch

const themeList = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "sutumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];

export default function NavBar() {
  const router = useRouter()
  return (
    <div className="navbar bg-base-200 border-b border-base-300" >
        <div className="navbar-start" onClick={router.back}>
          {"<"} 返回
        </div>
        <div className="navbar-center" ></div>
        <div className="navbar-end" >
            <Link href="/write" className="btn btn-primary btn-ghost">✍️ 新建文章</Link>
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn gap-1 normal-case btn-ghost">
                    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
                    主题
                    <i className="icon-[ic--outline-keyboard-arrow-down]" />
                </label>
                <div
                    tabIndex={0}
                    className="dropdown-content bg-base-200 text-base-content rounded-t-box rounded-b-box top-px max-h-96 h-[70vh] w-52 overflow-y-auto shadow-2xl mt-16"
                >
                    <div className="grid grid-cols-1 gap-3 p-3">
                        <List></List>
                    </div>
                </div>
            </div>
            <UserInfo></UserInfo>
        </div>
    </div>
  )
}

function List() {
    const { theme: currentTheme } = useAppSelector(state => state.theme)
    const dispatch = useAppDispatch()
  return (
    <>
      {themeList.map((theme) => (
        <div
          className={
            "outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2" +
            (currentTheme === theme ? " outline" : "")
          }
          onClick={() => dispatch(setTheme(theme))}
          key={theme}
        >
          <div className="">
            <div
              data-theme={theme}
              className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
            >
              <div className="grid grid-cols-5 grid-rows-3">
                <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                  <div className="flex-grow text-sm font-bold">{theme}</div>{" "}
                  <div className="flex flex-shrink-0 flex-wrap gap-1">
                    <div className="bg-primary w-2 rounded"></div>{" "}
                    <div className="bg-secondary w-2 rounded"></div>{" "}
                    <div className="bg-accent w-2 rounded"></div>{" "}
                    <div className="bg-neutral w-2 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}