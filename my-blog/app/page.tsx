"use client";

import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { inc, dec } from "./counterSlice";
import { RootState, AppDispatch } from "@/app/store";

import { getArticleListApi } from '@/app/api/index'

// 传统写法：适用范围广，更推荐
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const useAppDispatch: () => AppDispatch = useDispatch;

// 现代写法：更简洁
// const useAppSelector = useSelector.withTypes<RootState>()
// const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export default function Home() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  return (
    <div>
      <button className="btn btn-primary" onClick={() => dispatch(dec())}>
        -
      </button>
      <span>count：{count}</span>
      <button className="btn btn-secondary" onClick={() => dispatch(inc())}>
        +
      </button>
      <button className="btn btn-primary" onClick={getArticleListApi} >请求列表</button>
    </div>
  );
}
